## SEO TODO (outside-repo + follow-ups)

This repo was updated to improve technical SEO **without any visual changes** (canonicals/OG, per-route metadata, robots/sitemap, JSON-LD, alt text, redirects).

### Google Search Console (do this now)
- Add a property for **`https://www.joinascentmath.com`** (Domain property via DNS TXT is preferred).
- Submit **`/sitemap.xml`**.
- Use **URL Inspection → Request indexing** on:
  - `/`
  - `/mathematics`
  - `/mathematics/grade-6`
  - `/mathematics/grade-7`
  - `/mathematics/grade-8`

### Bing Webmaster Tools
- Add the site (can import from Search Console).
- Submit **`/sitemap.xml`**.

### Old domain (`adamsalphabet.com`) cleanup (highest-leverage fix if you still control it)
The old domain previously caused canonical/OG confusion in production and may still have backlinks.

- Configure **permanent 301 redirects** from every `adamsalphabet.com/*` URL to the equivalent `https://www.joinascentmath.com/*`.
- Remove any crawler blocks on the old domain so Google/Bing can **crawl the redirects**.
- If the old domain is being retired with **no redirects**, note that you’re intentionally discarding any accumulated link equity.

### Search Console verification value (where to place it)
When you have the verification token:
- Add it to root metadata in `src/lib/metadata.ts` under `ROOT_METADATA`:
  - `verification: { google: "<token>" }`

Do **not** ship a fake placeholder token.

### Backlinks (the highest ROI off-site task)
Prioritize links from:
- School district / school counseling resource pages
- Teacher “resources” pages
- PTA / PTO sites
- Public library resource lists
- Local tutoring directories
- Founder profile pages (school/college organizations, clubs, internships, etc.)

### Things to sanity-check in production
- Confirm the host enforces **HTTP → HTTPS** (the app adds **non-www → www** at the Next.js layer).
- In production, inspect the `<head>` on:
  - `/`
  - `/mathematics`
  - `/mathematics/grade-6`
  - one unit page (e.g. `/mathematics/grade-6/unit-1`)
  - one topic page
  - Verify: unique title/description, self-canonical, correct `og:url`, correct `og:image`/`twitter:image`, and valid JSON-LD.

