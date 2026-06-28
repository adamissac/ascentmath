# Ascent Math — Full Site Audit (June 2026)

## Executive summary

The codebase is **lean and well-typed** (strict TypeScript, no `any`, minimal dependencies). The mid-pivot content strategy is **mostly coherent**: paid tutoring + free Grades 6–8 study paths are stated consistently. Study-path pages are **fully static SSG** with a solid lesson shell. Gaps were mainly **SEO depth** (JSON-LD only on home), **missing security headers**, **broken Adam headshot asset**, **orphaned components**, and **production ops** (no error tracking/analytics). This audit pass fixed security headers, anchor naming, JSON-LD on curriculum pages, topic tutoring CTAs, phone visibility, pricing data cleanup, auth `noindex`, and several copy issues.

---

## Phase 1 — Architecture

### Routes (`src/app/`)

| Route | Type |
|-------|------|
| `/` | Static |
| `/book`, `/tutoring`, `/mathematics` | Redirect → homepage anchors |
| `/mathematics/curriculum-frameworks`, `/find-your-start` | Static |
| `/mathematics/[grade]`, `/[unit]`, `/[topic]` | SSG (`generateStaticParams`) |
| `/signup`, `/forgot-password`, `/dashboard` | Static client (auth) |
| `/api/contact` | Dynamic API |
| `/sitemap.xml`, `/robots.txt` | Metadata routes |

Homepage sections (not separate routes): `#credentials`, `#what-we-teach`, `#book-session`, `#study-paths`.

### Layout

`layout.tsx` → `AuthProvider` → `HashScrollHandler` → `Navbar` → `#main` → `ConditionalFooter`. Fonts: Inter (body), Lexend (display) via `next/font`, `display: swap`.

### Design tokens

Tailwind v4 via `@theme` in `globals.css`. `#FBFAF7` = `--color-bg` / `--color-surface-2` (semantic, not hard-coded in components). Brand, accent, ink scales defined once.

### Data layer

Source of truth: `src/data/units.ts` + `grade7.ts` / `grade8.ts`, enriched by `enrichCurriculum.ts` (exercises, quiz extras, lesson depth). Site copy: `site-copy.ts`, `pricing.ts`, `credentials.ts`, `site-team.ts`.

### Dependencies

Runtime: next, react, firebase, resend, zod — all used. No duplicate animation/icon libs. `firebase-tools` dev-only (heavy CLI).

### Env vars

Public: `NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_AUTH_COMING_SOON`. Server-only: `RESEND_API_KEY`, `BOOKING_*`. No secrets in client bundle.

### Decisions I'm questioning

- **Orphan components**: `StudyPathFaqSection`, `PageAnchorNav`, `HomeStudyPathsBackdrop`, `DarkAccordionSection` — unused; delete or wire up.
- **Breadcrumb "Mathematics"** → `/#study-paths` not a real index page (intentional but adds friction).
- **Firebase auth** on a tutoring marketing site — scope unclear while `AUTH_COMING_SOON` defaults true.
- **In-memory rate limit** on contact API — fine for single instance, not multi-region.

---

## Phase 2 — Content accuracy (fixes applied ✓ where noted)

| Page | Location | Issue | Fix |
|------|----------|-------|-----|
| Homepage | `#what-i-teach` | Anchor didn't match "What we teach" | Renamed to `#what-we-teach` + legacy hash redirect in `HashScrollHandler` ✓ |
| Hero | `HeroSection.tsx` | Hardcoded first-session copy | Uses `FIRST_SESSION_FREE` ✓ |
| Book section | `HomeBookingSection.tsx` | Phone not visible | Added `404-901-4619` tel link ✓ |
| Footer | `Footer.tsx` | Missing "Open to learners everywhere" | Added ✓ |
| Topic pages | `[topic]/page.tsx` | No tutoring CTA | Added `StudyPathCta` ✓ |
| API | `contact/route.ts` | "tell me" vs "tell us" | Fixed ✓ |
| Pricing | `pricing.ts` | Internal `$30–50/hr` in data | Removed `hourlyRate` fields ✓ |
| Credentials | `public/` | `adampic.jpg` missing | Initials fallback on image error ✓ — **still need photo file** |
| Alan email | `.env` | Live receipt | **Verify manually** alanmozhoor@gmail.com receives Resend forwards |

Stale phrases (`free middle school only`, `TBD Credential`, etc.) **not found** in `src/`.

---

## Phase 3 — Code quality (prioritized)

### High
- Security headers — **fixed** in `next.config.ts` ✓
- API rate limit — move to Upstash/KV for production (open)

### Medium
- `ContactForm.tsx` (571 lines) — split into subcomponents
- `WorksheetCard.tsx` — raw `<img>`; drive.google.com now in `remotePatterns` — migrate to `next/image`
- Orphan components — remove dead code

### Low
- `FloatingMathCanvas` — rAF skipped under reduced motion ✓
- No segment `loading.tsx` / `error.tsx` for mathematics

**Clean:** no `any`, `@ts-ignore`, `console.log`, `debugger`, or TODOs in src.

---

## Phase 4 — Performance

| Route | First Load JS | Notes |
|-------|---------------|-------|
| `/` | 129 kB | Hero canvas + reveal animations |
| `/mathematics/find-your-start` | **173 kB** | Heaviest — wizard state machine |
| Topic pages | 121 kB | Within budget |
| `/dashboard` | 228 kB | Firebase auth chunk |

- Study paths: **fully static SSG** ✓
- Videos: `VideoEmbed` uses click-to-load thumbnail pattern ✓
- OG image: `newLogo.png` is **256×256**, not 1200×630 — social previews suboptimal
- `adampic.jpg` / `alanpic.jpg`: commit `alanpic.jpg`; add optimized Adam photo

**Predicted Lighthouse (homepage):** Perf 75–85, A11y 90+, BP 90+, SEO 90+ (OG image size hurts social, not Lighthouse SEO score).

---

## Phase 5 — Accessibility

**Working:** skip link (`layout.tsx`), form labels (`ContactForm`), reduced motion (CSS + JS), semantic headings on lessons, focus rings on buttons.

**Gaps:**
- Decorative math canvas — ensure `aria-hidden` on wrap (verify `HeroCanvas`)
- Progress "X of Y topics" — add `aria-live="polite"` on sidebar progress
- OG/contrast on cream: primary CTA uses `--color-ink-cool` on white/cream — **passes**; tier band uses white on blue — **passes**

---

## Phase 6 — SEO

**Working:** per-page `generateMetadata`, canonical via `buildPageMetadata`, dynamic sitemap, robots.txt, homepage JSON-LD.

**Fixed this pass:** BreadcrumbList + Course JSON-LD on grade/unit/topic pages ✓

**Still needed:**
- Dedicated `og-image.jpg` at 1200×630
- FAQPage schema if FAQ sections ship
- Apex → www redirect at **hosting/DNS** layer (code uses `https://www.adamsalphabet.com`)

---

## Phase 7 — Mobile

Navbar has mobile menu at `< lg`. Credentials stack on mobile. Tier cards: 1-col mobile, 2-col tablet, 4-col desktop. Lesson sidebar collapses on mobile.

**Watch:** decorative symbols use `overflow-hidden` on hero — test 375px for horizontal scroll.

---

## Phase 8 — Brand

`#FBFAF7` used via `--color-bg` consistently. Typography: Lexend display + Inter body — distinctive enough, not generic Fraunces/terracotta. Math symbol canvas still visually busy — consider reducing opacity on inner pages.

**"Find your start"** alternatives: "Pick your unit", "Where should I begin?", "Match me to a lesson".

---

## Phase 9 — UX flows

| Flow | Clicks | Friction |
|------|--------|----------|
| Parent → book | Home → scroll/book CTA → form | Low; first session free visible in hero ✓ |
| Student → study path | Home → study paths → grade → unit → topic | Clear; breadcrumbs OK |
| Find your start | 3 steps → unit deep link | Works; 173kb bundle |

Form: posts to `/api/contact`, Resend email, honeypot + rate limit. Success/error states in `ContactForm`. 404 page exists (`not-found.tsx`).

---

## Phase 10 — Production readiness

| Check | Status |
|-------|--------|
| `npm run build` | ✓ Pass |
| `npm run lint` | ✓ Pass |
| `strict` TypeScript | ✓ |
| `.env` in git | ✓ Not committed |
| Security headers | ✓ Added |
| Error tracking | ✗ Recommend Sentry |
| Analytics | ✗ Recommend Plausible/Vercel Analytics |
| Favicon set | Partial — verify apple-touch-icon |
| CSP | Not yet — add tuned policy after headers |

---

## Top 10 issues (ranked)

1. **Missing `adampic.jpg`** — add optimized asset (fallback initials in place)
2. **OG image wrong dimensions** — create 1200×630 social card
3. **No production error tracking** — add Sentry
4. **No analytics** — add Plausible or Vercel Analytics
5. **Contact API rate limit in-memory** — use KV at scale
6. **`find-your-start` bundle 173kb** — code-split wizard
7. **Orphan components** — delete or integrate (~6 files)
8. **Apex/www redirect** — configure at Cloudflare/Firebase hosting
9. **CSP header** — add after auditing third-party scripts
10. **Verify Alan's email receives bookings** — operational, not code

## Quick wins (<15 min, done this pass)

- Security headers, what-we-teach anchor, topic StudyPathCta, book-section phone, footer tagline, JSON-LD on curriculum pages, remove internal hourly rates, auth noindex, delete tmp-home.html

## What's working well

- Strict TS, lean deps, static study paths, lazy video embeds, skip link + form labels, centralized `site-team.ts` / `pricing.ts` copy, lesson shell + interactive exercises, dual-offer positioning copy
