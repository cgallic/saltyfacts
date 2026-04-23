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

## Placeholders to fill (search + replace in `index.html`)

| Placeholder | Replace with |
|---|---|
| `REPLACE_OGADS_SHARK_GAME_URL` | Your OGAds offer tracking URL for an ocean/shark mobile game |
| `REPLACE_AMAZON_OCTOPUS_BOOK_URL` | Amazon Associates link for "Other Minds" by Peter Godfrey-Smith (wrap via Geniuslink for geo-routing) |
| `REPLACE_TEMU_REFERRAL_URL` | Your Temu referral URL |
| `REPLACE_AMAZON_AQUARIUM_KIT_URL` | Amazon Associates link for a nano-reef aquarium kit (via Geniuslink) |
| `REPLACE_GUMROAD_WALLPAPERS_URL` | Gumroad product URL for your ocean wallpaper pack (create later) |
| `REPLACE_PADI_TRAVEL_URL` | PADI Travel affiliate URL |
| `REPLACE_ME` (x2) | Formspree form ID for email capture — OR swap form action to ConvertKit/Beehiiv embed URL |
| `ezoic-placeholder-1` | Ezoic/AdSense ad code after approval |

## Affiliate accounts to create

1. **Amazon Associates** — apply at https://affiliate-program.amazon.com. Use Geniuslink (https://geniuslink.com) to auto-route Indian/SEA/US traffic to the right Amazon store.
2. **Temu** — affiliate program at https://www.temu.com/affiliate
3. **PADI Travel** — https://pros-blog.padi.com/going-global-padi-travel-affiliate-program/
4. **OGAds** — https://ogads.com (sign up, pick ocean/shark game offer, grab tracking URL)
5. **Ezoic** — apply after you have 1K+ sessions/month OR use AdSense immediately if already approved
6. **Formspree** (or ConvertKit/Beehiiv) — for email capture. Free tier works for first 50 subs/mo

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
