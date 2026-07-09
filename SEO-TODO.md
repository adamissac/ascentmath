# SEO owner TODOs (outside the repo)

Items that cannot be finished from code alone. The codebase now uses
`https://www.joinascentmath.com` for `metadataBase`, canonicals, OG/Twitter
images, robots.txt, and sitemap.xml.

## 1. Google Search Console / Bing

1. Add a **domain property** for `joinascentmath.com` (DNS TXT preferred).
2. Verify ownership.
3. Submit `https://www.joinascentmath.com/sitemap.xml`.
4. URL Inspection → Request Indexing on `/`, `/mathematics/grade-6`,
   `/mathematics/grade-7`, and `/mathematics/grade-8`.
5. Repeat for Bing Webmaster Tools (can import from GSC).
6. When you have a GSC HTML-tag token, paste it into
   `src/lib/metadata.ts` under the commented
   `verification: { google: "..." }` placeholder.

## 2. Old domain: adamsalphabet.com

Production scrapes still showed old-domain canonicals until this deploy.
Code now:

- Serves joinascentmath.com canonicals / OG / sitemap
- Adds host redirects from `(www.)adamsalphabet.com` → `www.joinascentmath.com`
  **if** that host is attached to this Vercel project

If `adamsalphabet.com` lives in a **separate** Vercel project or DNS only:

1. Attach it to this project, **or**
2. Add Cloudflare / DNS bulk 301s: every old URL → the same path on
   `https://www.joinascentmath.com/...`
3. Remove any robots block on the old host so Google can see the 301s.
4. In GSC, use Change of Address from the old property to the new one.

Do **not** leave the old domain serving duplicate content or blocking crawlers.

## 3. Apex → www

`next.config.ts` redirects `joinascentmath.com` → `www.joinascentmath.com`.
Also confirm the same redirect in Vercel domain settings / DNS.

## 4. Resend / email from-address

After verifying `joinascentmath.com` in Resend, set
`BOOKING_FROM_EMAIL` to something like
`"Ascent Math <booking@joinascentmath.com>"` in Vercel env vars.

## 5. Google Drive worksheets

Confirm every Drive file ID used by study-path worksheets is
**Anyone with the link → Viewer**. (IDs live in curriculum data under
`src/data/`.)

## 6. Assets

Confirm `public/og-image.png` and favicons show the current Ascent Math mark
(navy A + gold arrow), not the old Adam's Alphabet book logo. Redraw if needed.

## 7. Backlinks (off-site)

Highest leverage: school district resource pages, teacher pages, PTA sites,
library lists, tutoring directories, and founders' school/college profiles
linking to `https://www.joinascentmath.com`.
