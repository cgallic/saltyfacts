const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../kc-pixels.js'), 'utf8');
function setup(options = {}) {
  const calls = { meta: [], google: [], tiktok: [] }, listeners = {};
  const document = { createElement: () => ({}), head: { appendChild() {} }, addEventListener: (name, fn) => { listeners[name] = fn; } };
  const window = { fbq: (...args) => calls.meta.push(args), gtag: (...args) => calls.google.push(args), localStorage: { getItem: () => options.consent || null } };
  const context = { window, document, localStorage: window.localStorage, navigator: { userAgent: 'Mozilla/5.0', ...options.navigator }, Intl: { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: options.timeZone || 'America/New_York' }) }) } };
  vm.runInNewContext(source, context);
  if (window.ttq) window.ttq.track = (...args) => calls.tiktok.push(args);
  const conversions = () => ({ meta: calls.meta.filter(x => x[0] === 'track' && x[1] === 'Lead').length, google: calls.google.filter(x => x[0] === 'event' && x[1] === 'generate_lead').length, tiktok: calls.tiktok.filter(x => x[0] === 'SubmitForm').length });
  return { listeners, conversions };
}
test('submit attempts do not count as acknowledged leads', () => {
  const s = setup();
  assert.equal(s.listeners.submit, undefined);
  assert.deepEqual(s.conversions(), { meta: 0, google: 0, tiktok: 0 });
});
test('an acknowledged application form records each vendor conversion once', () => {
  const s = setup();
  s.listeners['kc:lead-received']({ detail: { form_id: 'newsletter' } });
  assert.deepEqual(s.conversions(), { meta: 1, google: 1, tiktok: 1 });
});
test('malformed acknowledgement does not count', () => {
  const s = setup();
  for (const event of [{}, { detail: {} }, { detail: { form_id: '' } }]) s.listeners['kc:lead-received'](event);
  assert.deepEqual(s.conversions(), { meta: 0, google: 0, tiktok: 0 });
});
for (const [label, options] of [['GPC', { navigator: { globalPrivacyControl: true } }], ['automation', { navigator: { webdriver: true } }], ['essential cookies', { consent: 'essential' }], ['opt-in region', { timeZone: 'Europe/London' }]]) {
 test('preserves privacy exclusion: ' + label, () => { assert.equal(setup(options).listeners['kc:lead-received'], undefined); });
}
