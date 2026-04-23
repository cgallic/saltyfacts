export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'POST only' });

  const { email } = req.body || {};
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email required' });
  }

  const key = process.env.LOOPS_API_KEY;
  if (!key) return res.status(500).json({ success: false, message: 'Server config error' });

  try {
    const resp = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        source: 'saltyfacts.com',
      }),
    });

    const data = await resp.json();
    return res.status(200).json({ success: data.success !== false });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
}
