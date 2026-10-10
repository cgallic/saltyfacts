# Salty Facts

One-page affiliate lander for Scuba Stories shorts traffic. Single `index.html`, Tailwind via CDN, Vercel-ready.

## Deploy to Vercel

```bash
cd clients/SaltyFacts
npx vercel          # first time (links to your vercel account)
npx vercel --prod   # deploy
```

Or via Vercel dashboard:
1. New Project → Import Git Repository OR drag-drop folder
2. Framework preset: **Other** (static HTML)
3. Output dir: `.` (root)
4. Deploy
5. Add custom domain `saltyfacts.com` in Settings → Domains

## Placeholders

The old affiliate placeholder tokens and dead affiliate links were removed from the site. The affiliate program is not approved, so there are no affiliate links to fill in. The only remaining placeholder is the `ezoic-placeholder-1` ad slot in `index.html`.

## Content pages

- `/why-is-the-ocean-salty`
- `/deepest-point-in-the-ocean`
- `/ocean-bioluminescence`

Every figure on these pages links to its source (NOAA, USGS, or peer-reviewed research). Add each new page to `sitemap.xml`.

## Analytics

PostHog is wired in. Events tracked:
- `landed` — with `traffic_source` query param (e.g. `?utm_source=tiktok`)
- `pick_click` — with `label` (which affiliate card) and `href`
- `email_submit` — with `location` (top / bottom)
- `hero_cta`, `hero_facts` — hero button clicks

## Traffic attribution

Tag your shorts bio links by platform so you can see which converts:
- TikTok bio: `https://saltyfacts.com/?utm_source=tiktok`
- YouTube bio: `https://saltyfacts.com/?utm_source=youtube`
- IG bio: `https://saltyfacts.com/?utm_source=ig`

PostHog will register `traffic_source` and attribute downstream clicks + email signups.

## Next steps after deploy

1. Add `comment SALTY` CTA line to `auto-shorts.py` copy prompt (drives comments + bio clicks)
2. Update Stan.store / Linktree bio on all 3 platforms with the new URL
3. Sign up for affiliate accounts in priority order: Temu (fastest), Amazon Associates (most trusted), OGAds (for game offer), PADI (travel)
4. First week: watch PostHog. Track CTR by platform + which cards get clicked
5. Week 2: rotate underperforming cards, add/cut based on data

## Related links

- [MeetKai](https://meetkai.xyz) — the operator layer behind Kai CMO workflows.
- [KaiCalls](https://kaicalls.com) — AI voice agents for small-business phone answering and lead capture.
- [Connor Gallic](https://connorgallic.com) — founder building Kai, KaiCalls, and AI automation systems.


---

*Built and maintained by [Connor Gallic](https://pr.linkedin.com/in/cgallic) — connect on LinkedIn.*
