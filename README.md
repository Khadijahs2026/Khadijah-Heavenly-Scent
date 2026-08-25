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
- **The wordmark** — set in Playfair Display italic, a close free stand-in for
  the flyer's lettering, not an exact match. To use the real logo, drop an SVG
  or transparent PNG into `public/` and swap the `<h1>` in
  [`app/page.tsx`](app/page.tsx) for an `<Image>`.
- **Copy** — headline and body text live in `app/page.tsx`; the brand name,
  tagline, email and meta description live in `lib/site.ts`.

## Notes

- The flyer's QR code, "CONTACT US" block, and phone number are deliberately
  absent. `info@khadijahs.com` appears once, in the footer, as a mailto link.
- The background is drawn in CSS and SVG — no image files, so the page loads
  with only the two web fonts as external requests.
- Signup abuse is limited two ways: a hidden honeypot field, and a per-IP cap of
  5 attempts per 10 minutes in [`lib/rate-limit.ts`](lib/rate-limit.ts). That
  counter lives in memory, so it's per serverless instance rather than global —
  fine at this scale. If it ever needs to be exact, swap it for Vercel KV.
- Signups are emailed, not stored. If the client later wants a real subscriber
  list they can export from, that's a database or a move to Mailchimp/ConvertKit.

## Deploying

Push to GitHub, import the repo in Vercel, add the environment variables, and
point `khadijahs.com` at the project under **Settings → Domains**.
