# Khadijah's Heavenly Scents — landing page

A single-page "coming soon" site with a mailing-list signup. Every signup is
emailed to `info@khadijahs.com` via [Resend](https://resend.com).

Built with Next.js 15 (App Router), TypeScript and Tailwind CSS v4. Deploys to
Vercel on `khadijahs.com`.

## Running locally

```bash
npm install
```

Copy the example env file and fill in a Resend key:

```bash
cp .env.example .env.local
```

Then:

```bash
npm run dev
```

Without `RESEND_API_KEY`, the form still validates and responds — but the
notification email won't send, and the API route logs a loud error saying so.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Authenticates with Resend. |
| `SIGNUP_FROM` | no | Sender address. Defaults to `signups@khadijahs.com`. **Its domain must be verified in Resend.** |
| `SIGNUP_TO` | no | Where signups are delivered. Defaults to `info@khadijahs.com`. |

Add all three in Vercel under **Settings → Environment Variables**, for
Production and Preview.

## Resend setup

This is the one hard dependency — the form cannot deliver anything until it's done.

1. Create an account at [resend.com](https://resend.com).
2. **Domains → Add Domain →** `khadijahs.com`. Resend gives you DNS records
   (DKIM, and an SPF/MX pair). Add them wherever `khadijahs.com` DNS lives.
3. Wait for the domain to show **Verified**.
4. **API Keys → Create API Key** with *Sending access*. Copy it once — it isn't
   shown again.
5. Paste it into Vercel as `RESEND_API_KEY` and redeploy.

Until step 3 completes, Resend rejects sends from `@khadijahs.com`. The visitor
sees a polite "please try again" message, and the reason appears in Vercel's
function logs prefixed with `[subscribe]`.

## Things the client will want changed

- **Social links** — [`lib/site.ts`](lib/site.ts) exports a `socials` array.
  The Instagram entry currently points at a placeholder URL. Replace the `href`,
  and add Facebook or TikTok entries if wanted (icons for both already exist in
  [`components/SocialLinks.tsx`](components/SocialLinks.tsx)). An empty array
  renders no social row at all.
- **Copy** — headline and body text live in `app/page.tsx`; the brand name,
  tagline, email and meta description live in `lib/site.ts`.

## The poster

The client's artwork carries the wordmark, the gold arc and the meadow, so none
of that is redrawn in code. The master lives at
`design/poster-original.png` (5408×3072, 9.8 MB) — keep it, everything in
`public/` is derived from it.

To regenerate the derivatives after an artwork change, from the repo root:

```bash
for W in 640 1024 1536 2048 2732; do sips -Z $W design/poster-original.png --out /tmp/h-$W.png >/dev/null && cwebp -q 82 -m 6 -quiet /tmp/h-$W.png -o public/hero-$W.webp && avifenc -q 62 -s 6 /tmp/h-$W.png public/hero-$W.avif >/dev/null; done && sips -s format jpeg -s formatOptions 78 /tmp/h-1536.png --out public/hero-1536.jpg >/dev/null
```

That needs `cwebp` and `avifenc` (`brew install webp libavif`). The result is
178 KB at full desktop width and 24 KB on a phone, against 9.8 MB for the
original.

### How it is fitted

The poster is roughly 16:9 and phones are not, so
[`components/HeroPoster.tsx`](components/HeroPoster.tsx) steps the frame through
aspect ratios — 5:4 on phones, 3:2 from 640px, 16:9 from 1024px — rather than
cropping the poster to the viewport. Narrow screens lose sky at the left and
right; wide screens lose some foreground. Every ratio in the ladder is chosen so
the wordmark, which spans about 44% of the poster's width, never reaches the
crop edge.

**If you change a ratio or `object-position`, re-check that.** On a wide, short
window the frame is capped at `72vh` and the crop comes off the top and bottom,
which is the case that can clip the lettering.

## Notes

- The flyer's QR code, "CONTACT US" block, and phone number are deliberately
  absent. `info@khadijahs.com` appears once, in the footer, as a mailto link.
- Every asset is served from the site's own origin — the poster is static files
  in `public/`, and the two web fonts are self-hosted by `next/font`. The page
  makes no third-party requests at all.
- The poster is plain `<picture>` with a srcset, not `next/image`, so Vercel's
  image optimizer is never invoked. One image on one page doesn't need it, and
  this way the files are CDN-cached immutably with no per-request cost.
- Signup abuse is limited two ways: a hidden honeypot field, and a per-IP cap of
  5 attempts per 10 minutes in [`lib/rate-limit.ts`](lib/rate-limit.ts). That
  counter lives in memory, so it's per serverless instance rather than global —
  fine at this scale. If it ever needs to be exact, swap it for Vercel KV.
- Signups are emailed, not stored. If the client later wants a real subscriber
  list they can export from, that's a database or a move to Mailchimp/ConvertKit.

## Deploying

Push to GitHub, import the repo in Vercel, add the environment variables, and
point `khadijahs.com` at the project under **Settings → Domains**.
