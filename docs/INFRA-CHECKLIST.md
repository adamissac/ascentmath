# Pre-Launch Infrastructure Checklist — Ascent Math

Complete these steps in your hosting and DNS consoles before going live. Code changes alone cannot enable WAF, email DNS, or CDN settings.

## Cloudflare (if proxied in front of Vercel)

- [ ] Enable **Bot Fight Mode**
- [ ] Enable **WAF** (Web Application Firewall)
- [ ] Enable **DDoS protection** (default on proxied zones)
- [ ] Enable **Browser Integrity Check**
- [ ] Set **SSL/TLS** to Full (strict)
- [ ] Enable **Always Use HTTPS**
- [ ] Redirect apex → www (or pick one canonical host and redirect the other)
- [ ] Enable **DNSSEC** if your registrar supports it
- [ ] Create **Turnstile** widget; add keys to Vercel env:
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - `TURNSTILE_SECRET_KEY`

## Vercel

- [ ] Set environment variables (Production + Preview as needed):
  - `RESEND_API_KEY`, `BOOKING_RECIPIENT_EMAIL`, `BOOKING_FROM_EMAIL`
  - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
  - All `NEXT_PUBLIC_FIREBASE_*` vars
  - `NEXT_PUBLIC_AUTH_COMING_SOON=false` when auth is ready
- [ ] Enable **Vercel Firewall** / rate limiting as secondary layer
- [ ] Configure **deployment protection** for preview URLs
- [ ] Set up **monitoring + uptime alerts**
- [ ] Verify custom domain: `www.adamsalphabet.com` (or your production domain)

## Upstash Redis

- [ ] Create free Redis database at https://console.upstash.com/
- [ ] Copy REST URL and token to Vercel env vars
- [ ] Confirm rate limits work in production logs after deploy

## Email deliverability (Resend)

- [ ] Verify sending domain in Resend
- [ ] Add DNS records for **SPF**, **DKIM**, and **DMARC**
- [ ] Set `BOOKING_FROM_EMAIL="Ascent Math <booking@yourdomain.com>"`
- [ ] Send test booking via `npm run book:test`

## Firebase console

- [ ] Add authorized domains: production host, Vercel preview URLs
- [ ] Deploy Firestore rules: `npm run firebase:deploy:rules`
- [ ] Update project display name to Ascent Math (optional)
- [ ] Enable Google sign-in with correct OAuth consent screen

## Post-deploy security scans

Run and record results:

- [ ] [Mozilla Observatory](https://observatory.mozilla.org/)
- [ ] [securityheaders.com](https://securityheaders.com/)
- [ ] [SSL Labs](https://www.ssllabs.com/ssltest/)
- [ ] Lighthouse (performance + accessibility)
- [ ] `npm audit` (see CI or local)

## Canonical URL policy

Code uses `https://www.adamsalphabet.com` in [`src/lib/site-url.ts`](../src/lib/site-url.ts). Ensure hosting redirects:

```
http://adamsalphabet.com     → https://www.adamsalphabet.com
http://www.adamsalphabet.com → https://www.adamsalphabet.com
https://adamsalphabet.com    → https://www.adamsalphabet.com
```

## Monitoring checklist

- [ ] Error alerts (Vercel or external)
- [ ] Uptime monitoring (e.g. Better Uptime, UptimeRobot)
- [ ] Review structured logs for 429 rate-limit hits and spam attempts
- [ ] Confirm no PII in logs (names, emails, messages)
