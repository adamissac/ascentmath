# Full-Site Audit & Bug-Fix Report

**Branch:** `cursor/full-site-audit-59bb` (based on `main`)
**Scope:** Full senior-dev QA pass per the audit prompt, covering route enumeration, per-page checks, critical flows, the Phase 4 "known issues" list, and a codebase-wide pass.

## Read this first: most of the Phase 4 "confirmed live" bugs do not exist in this codebase

The audit prompt's Phase 4 opens by saying three bugs (dual branding, leaking decorative math symbols, duplicated sidebar) were "verified live just now" and shouldn't be re-investigated, just fixed. Debug-mode ground rules here call for runtime evidence over assumptions, so every one of the ten Phase 4 items was reproduced (or not) against the current `main` branch before touching anything, using a combination of source review and a scripted headless-Chrome session (Chrome DevTools Protocol) that loaded live pages and inspected the real DOM/console.

**Result: bugs #1, #2, #3, #5, #7, #8, and #10 could not be reproduced anywhere in this repository.** Concretely:

- **#1 (dual brand identity):** `SITE_BRAND_NAME = "Ascent Math"` is a single constant imported by `lib/metadata.ts`, `Navbar.tsx`, `CredentialsSection.tsx`, and everywhere else brand copy appears. Live-checked `document.title`, `og:site_name`, and the rendered `<footer>` on the homepage, a grade hub, a unit page, and a topic page - all four say "Ascent Math," nothing says "Adam's Alphabet" anywhere in the UI (the string only appears once, in `lib/site-url.ts`, as the production *domain* `adamsalphabet.com`, which is a separate, legitimate thing from the on-page brand name).
- **#2 (decorative math symbols leaking into text):** The decorative glyph system (`MathBackdrop.tsx` / `FloatingMathCanvas.tsx` / `BackdropGlyphLayer.tsx`) already renders every symbol to a `<canvas>`, not DOM text, and `BackdropGlyphLayer.tsx` has an explicit code comment: *"Renders decorative math glyphs on canvas so symbols never appear as DOM text (avoids scraper leaks and screen-reader noise)."* I additionally scripted a scan of `document.body.innerText` across all 82 non-redirect pages for the exact symbol character set the audit describes (`απΣ∞∂θ√²≠∫÷≤½βΔλφ³≈∑°`). It found small numbers of matches on 36 pages - every single one, on inspection, was legitimate lesson content (e.g. `"3/4 ÷ 2/3"`, `"4² = 16"`, `"(8 − 3)² ÷ 5"` on the fractions/exponents topic pages), not a leaked decorative string. Unit and topic pages don't even import the decorative-glyph components at all.
- **#3 (duplicate sidebar):** `LessonShell.tsx` renders exactly one `<aside class="lesson-sidebar">`. Live-checked `document.querySelectorAll('.lesson-sidebar').length` across all 20 unit pages and all 55 topic pages via script - every page returned `1`.
- **#5 (og:description/canonical/og:image missing one level deep):** `buildPageMetadata()` in `lib/metadata.ts` is the single function every route (home, grade, unit, topic, find-your-start, curriculum-frameworks) calls for its metadata, and it always sets `canonical`, `og:url`, `og:image` (with alt/width/height), and `og:description` from that page's own `description` argument - never a sitewide fallback. Live-checked all 82 pages: 0 missing canonical, 0 missing `og:description`, 0 missing `og:url`, 0 missing `og:image`.
- **#7 (`#what-i-teach` vs `#what-we-teach` mismatch):** `WHAT_I_TEACH_HREF` exists in `site-paths.ts` but is literally defined as `= WHAT_WE_TEACH_HREF` (same string) and is marked `@deprecated`; nothing in the codebase actually imports it, and there is no hardcoded `"#what-i-teach"` string anywhere. Every live nav/footer/CTA link already points at `#what-we-teach`, and `HashScrollHandler.tsx` even has a defensive remap for the old hash on top of that.
- **#8 ("Free!" badge appearing twice):** Real duplication in the flattened HTML, but not a rendering bug - `HeroSection.tsx` has one `Free!` badge inside the CTA link with `sm:hidden` (mobile only) and a second `Free!` annotation right after it with `hidden sm:inline-flex` (desktop only). They're mutually exclusive by breakpoint; only one is ever visible at a given viewport width. This is exactly the "looks duplicated once flattened to text" case the audit prompt itself flagged as the alternative explanation.
- **#10 (unit duration mismatch, hub card vs unit page):** Both the grade-hub card (`[grade]/page.tsx`) and the unit page (`[grade]/[unit]/page.tsx`) read the exact same `unit.estimatedMinutes` field - there's only one source, not two independently-computed numbers that could drift. I additionally wrote a script that sums every unit's topic-level `estimatedMinutes` and compares it against the unit-level field across all 20 units: **0 mismatches.** (The specific numbers the audit cites - 189 vs 128, from topics summing to 32+32+33+31 - don't match this repo's actual Grade 6 Unit 1 data at all, which is 4 topics summing to 189 minutes, both on the hub card and the unit page.)

**#4 and #9** were spot-checked as instructed and are correct/intentional as described (grade dropdown has all 8 options; pricing is 4 tiers with SAT/ACT folded into the high-school tier and no listed rates - matches the "confirm before touching" framing, logged under Needs Adam's call, not changed).

**#6 was real** and is fixed below. Two issues I found independently during Phase 2 (below) that weren't in the Phase 4 list were also fixed.

**Most likely explanation:** the live scrape this prompt was written from reflects either an older deployed version of the site (a deploy that predates several fixes already merged into this repo's `main`) or a stale CDN/browser cache at scrape time - not the current source tree. This is worth checking on the production side independently of this audit.

---

## What was fixed

### Bug #6 - Breadcrumb "Mathematics" linked to a homepage anchor, not a real page (HIGH, confirmed and fixed)

**Where:** Breadcrumbs on `/mathematics/[grade]`, `/mathematics/[grade]/[unit]`, `/mathematics/[grade]/[unit]/[topic]`, `/mathematics/find-your-start`, `/mathematics/curriculum-frameworks`.

**What I found:** `/mathematics` was a stub that just called `redirect("/#study-paths")` - there was no real index page. Every breadcrumb's "Mathematics" crumb linked to that homepage anchor, which is a reasonable target for a top-level CTA but not for a breadcrumb trail, especially three levels deep on a topic page.

**Fix:** Built a real `/mathematics` index page (lists all 3 grade hubs, reusing the existing `StudyPathListCard` component - same pattern the grade-hub page already uses for its own unit list), added a `MATHEMATICS_HREF` constant, and repointed every breadcrumb's "Mathematics" crumb at it. `STUDY_PATHS_HREF` (`/#study-paths`) is untouched everywhere else (nav, hero CTAs, footer, "browse study paths" buttons) - those are legitimate homepage-anchor CTAs and were left alone.

**Verified live:** breadcrumb `href` now resolves to `/mathematics` on grade, unit, and topic pages (previously `/#study-paths`), and the new index page correctly lists all 3 grades with working links to each.

### Missing `<h1>` on the new `/mathematics` page (found during my own Phase 2 pass, fixed)

The first draft of the new index page used the shared `SectionHeader` component, which renders an `<h2>` - so the page had zero `<h1>` elements, caught by the same automated per-page audit script described in Phase 2. Replaced with a real `<h1>`, matching the pattern already used on `find-your-start` and `curriculum-frameworks`.

### Sitemap was missing the new `/mathematics` page

`sitemap.ts` is dynamically generated from `GRADES` (so grade/unit/topic entries can never drift out of sync with the real routes), but its small hardcoded `staticRoutes` list didn't include the new `/mathematics` index. Added it. Sitemap now has 84 URLs total (6 static + 3 grades + 20 units + 55 topics), verified by direct count.

### Broken external link - Grade 6 Unit 1's GADOE framework PDF (MEDIUM, found during Phase 3, fixed the discoverable half)

`data/units.ts`'s `frameworkUrl` for Grade 6 Unit 1 (`https://drive.google.com/file/d/1GH3oj67h-27Nrr0h-XdQNavn-MpJnTHJ/view`) returns Google Drive's own **"Page Not Found"** title - a genuinely broken/deleted file, not a bot-block false positive (verified by checking the actual page title, not just the HTTP status). All 6 other Grade 6 units' framework links resolve correctly and follow a consistent naming pattern (`6th-Math-Unit-2.pdf` through `6th-Math-Unit-7.pdf`), strongly suggesting Unit 1's file (`6th-Math-Unit-1.pdf`, presumably) was never uploaded or the ID was copied wrong.

**I could not fix this myself** - it requires a valid Google Drive share link, which needs access to Adam's Drive. Logged under Needs Adam's call.

### Dead code - 6 orphaned components removed (Phase 5)

`DarkAccordionSection.tsx`, `HeroStatBadge.tsx`, `HomeStudyPathsBackdrop.tsx`, `PageAnchorNav.tsx`, `StudyPathFaqSection.tsx`, `VisualPanel.tsx` were never imported anywhere (confirmed via full-text search across every `.ts`/`.tsx` file, and confirmed the build still succeeds with all 95 pages after removal). Removed - 396 lines of pure dead weight from an earlier iteration.

---

## Phase 1: Full route table (96 rows - every route, every one of the 55 topic pages individually)

Enumerated straight from source (`GRADES` in `data/units.ts`, `generateStaticParams()`, and every `page.tsx` under `src/app/`), cross-checked against `sitemap.xml` and `robots.txt`, then every single URL was hit with a real HTTP request against the running dev server (not assumed). All 96 rows below reflect the current `main` + this branch's fixes.

**3 grades, 20 units, 55 topics** - matches the homepage's own stated stats exactly.

| URL | Template family | Status | Notes |
|---|---|---|---|
| `/` | home | PASS | Hero, credentials, tiers, booking, study paths - all render, Ascent Math branding throughout. |
| `/mathematics` | math-index (new) | PASS | New index page built during this audit (was previously a redirect stub) - lists all 3 grades. |
| `/mathematics/find-your-start` | find-your-start | PASS* | 3-step wizard renders and all destination routes are valid; step-by-step click interaction could not be exercised via automation in this sandbox (see Phase 3) - NEEDS ADAM TO VISUALLY CONFIRM the click-through. |
| `/mathematics/curriculum-frameworks` | curriculum-frameworks | PASS | Renders; lists GADOE framework links per grade. One underlying link is broken - see fixes above. |
| `/privacy` | static | PASS | |
| `/terms` | static | PASS | |
| `/signup` | auth | PASS | Renders (Firebase-gated features degrade gracefully without env config). |
| `/forgot-password` | auth | PASS | |
| `/dashboard` | auth | PASS | Renders sign-in gate. |
| `/book` | redirect → `/#book-session` | PASS | 307 redirect confirmed live. |
| `/about` | redirect → `/` | PASS | 308 redirect confirmed live - not an orphaned 404. |
| `/login` | redirect → `/signup` | PASS | 307 redirect confirmed live. |
| `/tutoring` | redirect → `/#what-we-teach` | PASS | 307 redirect confirmed live. Defined both in `next.config.ts` `redirects()` *and* as its own `page.tsx` calling `redirect()` - redundant but harmless (both agree on the same destination); worth consolidating to one mechanism someday. |
| `/pricing` | redirect → `/#what-we-teach` | PASS | 308 redirect confirmed live. |
| `/parents` | redirect → `/#study-paths` | PASS | 308 redirect confirmed live. |
| `/sitemap.xml` | seo | PASS | Dynamically generated - 84 URLs, verified complete. |
| `/robots.txt` | seo | PASS | Disallows only `/dashboard`, `/signup`, `/forgot-password`, `/api/`, `/admin`, `/private` - everything indexable is allowed. |
| *(invalid URL, 404 test)* | 404 | PASS | Custom `not-found.tsx` renders with working "Take me home" / "Browse study paths" links, not a generic default 404. |
| `/mathematics/grade-6` | grade-hub | PASS | Grade 6 - 7 units listed. |
| `/mathematics/grade-6/unit-1` | unit | PASS | Unit 1: Number System & Operations (4 topics, ~189 min - matches sum of topic minutes). |
| `/mathematics/grade-6/unit-1/factors-multiples-gcf-lcm` | topic | PASS | "Factors, Multiples, GCF & LCM" - video verified via YouTube oEmbed, quiz/exercises present. |
| `/mathematics/grade-6/unit-1/adding-subtracting-fractions` | topic | PASS | "Adding & Subtracting Fractions" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-1/multiplying-dividing-fractions` | topic | PASS | "Multiplying & Dividing Fractions" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-1/decimal-operations` | topic | PASS | "Decimal Operations" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-2` | unit | PASS | Unit 2: Ratios & Proportional Relationships (3 topics, ~137 min - matches). |
| `/mathematics/grade-6/unit-2/ratios` | topic | PASS | "What Is a Ratio?" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-2/unit-rates` | topic | PASS | "Unit Rates" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-2/proportional-relationships` | topic | PASS | "Proportional Relationships" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-3` | unit | PASS | Unit 3: Expressions & Equations (3 topics, ~137 min - matches). |
| `/mathematics/grade-6/unit-3/exponents-order-of-operations` | topic | PASS | "Exponents & Order of Operations" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-3/writing-expressions` | topic | PASS | "Writing Algebraic Expressions" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-3/distributive-like-terms` | topic | PASS | "Distributive Property & Like Terms" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-4` | unit | PASS | Unit 4: Equations & Inequalities (3 topics, ~134 min - matches). |
| `/mathematics/grade-6/unit-4/one-step-equations` | topic | PASS | "One-Step Equations" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-4/inequalities` | topic | PASS | "Inequalities & Number Lines" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-4/independent-dependent-variables` | topic | PASS | "Independent & Dependent Variables" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-5` | unit | PASS | Unit 5: Geometry - Area & Volume (3 topics, ~138 min - matches). |
| `/mathematics/grade-6/unit-5/area-of-shapes` | topic | PASS | "Area of Triangles & Quadrilaterals" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-5/composite-figures` | topic | PASS | "Composite Figures" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-5/surface-area-volume` | topic | PASS | "Surface Area & Volume" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-6` | unit | PASS | Unit 6: Statistics & Data Analysis (3 topics, ~135 min - matches). |
| `/mathematics/grade-6/unit-6/statistical-questions-center` | topic | PASS | "Statistical Questions & Center" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-6/spread-range-iqr` | topic | PASS | "Spread: Range & IQR" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-6/choosing-a-display` | topic | PASS | "Choosing the Right Display" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-7` | unit | PASS | Unit 7: Geometry in Action - Surface Area & Volume (3 topics, ~135 min - matches). |
| `/mathematics/grade-6/unit-7/area-polygons` | topic | PASS | "Area Review & Polygons" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-7/nets-surface-area` | topic | PASS | "Nets & Surface Area" - video verified, quiz/exercises present. |
| `/mathematics/grade-6/unit-7/volume-fractions` | topic | PASS | "Volume with Fractions" - video verified, quiz/exercises present. |
| `/mathematics/grade-7` | grade-hub | PASS | Grade 7 - 6 units listed. |
| `/mathematics/grade-7/rational-numbers` | unit | PASS | Unit 1: Operations with Rational Numbers (3 topics, ~170 min - matches). |
| `/mathematics/grade-7/rational-numbers/adding-subtracting-integers` | topic | PASS | "Adding & Subtracting Integers" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/rational-numbers/multiplying-dividing-integers` | topic | PASS | "Multiplying & Dividing Integers" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/rational-numbers/operations-rational-numbers` | topic | PASS | "Operations with Rational Numbers" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/proportional-relationships` | unit | PASS | Unit 2: Ratios & Proportional Relationships (3 topics, ~172 min - matches). |
| `/mathematics/grade-7/proportional-relationships/unit-rates-with-fractions` | topic | PASS | "Unit Rates with Fractions" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/proportional-relationships/constant-of-proportionality` | topic | PASS | "Proportional Relationships & k" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/proportional-relationships/percent-problems` | topic | PASS | "Percent Problems" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/expressions-equations` | unit | PASS | Unit 3: Expressions & Equations (3 topics, ~169 min - matches). |
| `/mathematics/grade-7/expressions-equations/linear-expressions` | topic | PASS | "Expanding & Factoring Expressions" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/expressions-equations/two-step-equations` | topic | PASS | "Two-Step Equations" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/expressions-equations/two-step-inequalities` | topic | PASS | "Two-Step Inequalities" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/geometry` | unit | PASS | Unit 4: Geometry (4 topics, ~216 min - matches). |
| `/mathematics/grade-7/geometry/scale-drawings` | topic | PASS | "Scale Drawings" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/geometry/angle-relationships` | topic | PASS | "Angle Relationships" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/geometry/circumference-area-circles` | topic | PASS | "Circumference & Area of Circles" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/geometry/area-volume-surface-area` | topic | PASS | "Volume & Surface Area" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/statistics` | unit | PASS | Unit 5: Statistics & Inferences (2 topics, ~110 min - matches). |
| `/mathematics/grade-7/statistics/random-sampling` | topic | PASS | "Random Sampling" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/statistics/comparing-populations` | topic | PASS | "Comparing Two Populations" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/probability` | unit | PASS | Unit 6: Probability (2 topics, ~112 min - matches). |
| `/mathematics/grade-7/probability/simple-probability` | topic | PASS | "Simple Probability" - video verified, quiz/exercises present. |
| `/mathematics/grade-7/probability/compound-probability` | topic | PASS | "Compound Probability" - video verified, quiz/exercises present. |
| `/mathematics/grade-8` | grade-hub | PASS | Grade 8 - 7 units listed. |
| `/mathematics/grade-8/exponents-real-numbers` | unit | PASS | Unit 1: Real Numbers & Exponents (3 topics, ~169 min - matches). |
| `/mathematics/grade-8/exponents-real-numbers/properties-of-exponents` | topic | PASS | "Properties of Exponents" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/exponents-real-numbers/scientific-notation` | topic | PASS | "Scientific Notation" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/exponents-real-numbers/roots-and-irrational-numbers` | topic | PASS | "Roots & Irrational Numbers" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/linear-equations` | unit | PASS | Unit 2: Linear Equations (2 topics, ~112 min - matches). |
| `/mathematics/grade-8/linear-equations/multi-step-equations` | topic | PASS | "Multi-Step Equations" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/linear-equations/variables-on-both-sides` | topic | PASS | "Variables on Both Sides" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/functions` | unit | PASS | Unit 3: Functions (2 topics, ~110 min - matches). |
| `/mathematics/grade-8/functions/intro-to-functions` | topic | PASS | "Introduction to Functions" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/functions/linear-and-nonlinear-functions` | topic | PASS | "Linear & Nonlinear Functions" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/linear-functions` | unit | PASS | Unit 4: Linear Functions (2 topics, ~117 min - matches). |
| `/mathematics/grade-8/linear-functions/slope` | topic | PASS | "Slope" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/linear-functions/slope-intercept-form` | topic | PASS | "Slope-Intercept Form" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/systems-of-equations` | unit | PASS | Unit 5: Systems of Equations (2 topics, ~114 min - matches). |
| `/mathematics/grade-8/systems-of-equations/systems-by-graphing` | topic | PASS | "Systems by Graphing" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/systems-of-equations/systems-algebraically` | topic | PASS | "Solving Systems Algebraically" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/transformations-similarity` | unit | PASS | Unit 6: Transformations & Similarity (3 topics, ~166 min - matches). |
| `/mathematics/grade-8/transformations-similarity/transformations` | topic | PASS | "Transformations" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/transformations-similarity/dilations-similarity` | topic | PASS | "Dilations & Similarity" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/transformations-similarity/angles-parallel-lines` | topic | PASS | "Angles & Parallel Lines" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/pythagorean-volume` | unit | PASS | Unit 7: Pythagorean Theorem & Volume (2 topics, ~112 min - matches). |
| `/mathematics/grade-8/pythagorean-volume/pythagorean-theorem` | topic | PASS | "The Pythagorean Theorem" - video verified, quiz/exercises present. |
| `/mathematics/grade-8/pythagorean-volume/volume-cylinders-cones-spheres` | topic | PASS | "Volume of Cylinders, Cones & Spheres" - video verified, quiz/exercises present. |

**Static assets:** `favicon.ico`, `og-image.png`, `newLogo.png`, `adampic.jpg`, `alanpic.jpg` all confirmed HTTP 200 with correct content types.

---

## Phase 2: Per-page checklist - automated across all 82 content pages

Rather than manually clicking through 82 pages one at a time, I scripted a single headless-Chrome session (Chrome DevTools Protocol) that navigated to every home/grade/unit/topic/find-your-start/curriculum-frameworks page, and for each one captured: console errors/warnings, failed network requests, `<h1>` count, canonical/`og:*` tag presence, image `alt` attribute status, and the same raw-symbol-leak scan described above. Results:

- **Console errors:** every one of the 82 pages produces exactly **one, identical, harmless** console message - a dev-mode-only `EvalError` thrown by Next.js's own Fast Refresh (`react-refresh-utils`) runtime attempting a feature-detection `eval()`, which this site's strict CSP (`script-src` without `'unsafe-eval'`) correctly blocks. This code path does not exist in production builds (Fast Refresh is dev-only and stripped from `next build`), so it cannot occur for real visitors. Zero other distinct error messages were found across all 82 pages.
- **Failed network requests (404s on images/fonts/scripts):** 0 across all 82 pages.
- **Exactly one `<h1>` per page:** 81/82 passed; the 1 failure (`/mathematics`, my own new page) is fixed above.
- **`canonical` / `og:description` / `og:url` / `og:image` present and page-specific:** 82/82.
- **Image `alt` attributes:** 0 images anywhere are missing the `alt` attribute outright. Every image that has `alt=""` (logo, YouTube thumbnails, worksheet thumbnails) does so deliberately, because the adjacent visible text (video title, worksheet title, brand name) already describes it - a standard, valid accessibility pattern (WCAG technique H67), not an omission. This is a defensible choice as-is; a small enhancement would be writing real descriptive `alt` text for video/worksheet thumbnails instead of relying on adjacent text, but it's not a defect.
- **Raw symbol leakage:** 0 confirmed instances (see the bug #2 write-up above - every flagged match was legitimate lesson content).
- **Duplicate sidebar:** 0 pages with more than one `.lesson-sidebar`.

**Responsive layout at 375/768/1440px, keyboard tab order, and color contrast on secondary surfaces** could not be checked with the tools available in this sandbox (no visual regression / screenshot-diff tooling, and no axe-core available to install without a live network-restricted npm registry check) - flagging these explicitly as **NEEDS ADAM TO VISUALLY CONFIRM**, per the audit prompt's own fallback instruction for exactly this situation. Given the CSS approach used throughout (Tailwind utility classes with explicit `sm:`/`md:`/`lg:` breakpoints, consistent design-token colors), I have no specific reason to suspect a problem, but this genuinely needs human eyes or real device testing (the prompt is right that Safari/iOS specifically matters here and I don't have a way to drive Safari from this Linux sandbox).

---

## Phase 3: Flows

### Find-your-start wizard

Code review confirms the wizard (`TopicStartFinder.tsx`) is a straightforward 3-step `useState` flow with no URL/query-param persistence (a page refresh mid-flow resets to step 1 - confirmed live). Its only output is a computed `<Link href={...}>` built from the selected grade/unit's slugs plus the unit's first topic slug - and Phase 1 above confirms **every single one of those destination routes returns 200** for every grade/unit combination in the data, so there's no way for the wizard to produce a dead link regardless of which options a user picks.

**What I could not verify via automation:** the actual click-through interaction (selecting a grade radio, clicking Next, selecting a unit, clicking Next). I invested significant effort trying to drive this via a scripted headless-Chrome session (CDP mouse events, native input-value setters, real character-by-character key events, React-fiber prop introspection, focus emulation) and could not get simulated clicks to reliably trigger this app's React onChange/state updates in this specific sandboxed, unfocused headless environment - while separately confirming that plain `element.click()` on a simple `<button onClick>` (no controlled-input state involved) *did* work reliably earlier in this project's session. I'm calling this a limitation of this test harness, not a confirmed app defect, because the code itself is a completely standard, correct React pattern. **NEEDS ADAM TO VISUALLY CONFIRM** by clicking through all three grade branches once in a real browser - low risk given the code review above, but genuinely unverified by me.

### Booking form (`#book-session`)

- **Where it goes:** `ContactForm.tsx` POSTs to `/api/contact` (`src/app/api/contact/route.ts`), which validates with the shared Zod schema (`lib/contact-schema.ts`), rate-limits (burst/contact/tutoring-specific limiters via `@upstash/ratelimit`), checks a honeypot field and a minimum 3-second fill time, optionally verifies a Cloudflare Turnstile token, and on success sends via **Resend** to both `adamissac08@gmail.com` and `alanmozhoor@gmail.com` (read from `getBookingRecipients()`), with `replyTo` set to the visitor's email. This is a real API route with a real email provider, not a third-party form service and not a no-op.
- **What I confirmed:** the `GET /api/contact` health check correctly reports `configured: false` in this sandbox (no `RESEND_API_KEY` secret here), and the form correctly disables its submit button and would show the "direct sending unavailable, email us instead" fallback banner with a `mailto:` link and copyable addresses in that state - this graceful-degradation path exists and is wired up as designed.
- **What I could not verify:** actually sending a real email end-to-end (needs `RESEND_API_KEY`, which isn't available in this sandbox), and the same client-side interactive-input limitation described above prevented me from automating "fill in an invalid email, confirm the inline error, fix it, confirm it clears." Code review of `validateField()` in `ContactForm.tsx` confirms the logic is correct and matches the server's Zod rules (name ≥ 2 chars, valid email regex, message ≥ 10 chars, 2000-char cap enforced via `maxLength` on the textarea) - client and server validation are not out of sync. **NEEDS ADAM** to run `npm run book:test` (or submit the live form) with real Resend credentials configured to do a true end-to-end email-delivery check, and to click through the validation states once visually.

### Unit → topic → quiz path (one per grade)

Confirmed via the automated page-audit (Phase 2) that on a representative topic in each grade (`grade-6/unit-1/factors-multiples-gcf-lcm`, `grade-7/geometry/circumference-area-circles`, `grade-8/pythagorean-volume/pythagorean-theorem`): the page loads cleanly, the video's `videoId` resolves via YouTube oEmbed (see below), and the quiz/exercises content renders in the DOM. `Quiz.tsx` and `TopicExercises.tsx` are, like the two flows above, `useState`-driven interactive components, so the same automation limitation applies to actually clicking through answer options and watching the score compute - code review confirms the scoring logic (`normalize()` + exact match against `q.answer`) is correct and the "your progress" persistence (`useUnitProgress` hook, `localStorage`-backed) already had a real bug found and fixed **earlier in this project's session** (a `setState`-during-render violation causing a React console error on every click of "Mark topic complete" - see that fix already merged to `main` in a prior commit). Since that fix, the toggle/quiz-progress persistence pattern is verified correct by code, and the toggle button itself was confirmed working live (with real state changes and `localStorage` persistence) via a successful automated click test in that earlier session. `useUnitProgress` also already guards every `localStorage` call in `try/catch`, so it fails gracefully (falls back to in-memory-only state) rather than crashing if storage is unavailable (private/incognito browsing) - confirmed by reading `read()`/`write()` in `hooks/useUnitProgress.ts`.

### External resource links, at scale

Every unique external resource referenced anywhere in `data/units.ts` was checked programmatically:

| Resource type | Count | Result |
|---|---|---|
| YouTube videos (`videoId`) | 79 unique | **79/79 resolve** - checked via YouTube's oEmbed endpoint, which fails for private/deleted/invalid videos. All public and playable. |
| Google Drive worksheets | 7 unique | **7/7 resolve** - each returns its real, descriptive PDF filename as the page title (not a Google sign-in/permission wall), confirming they're genuinely public. |
| GADOE framework PDFs (Drive) | 7 unique | **6/7 resolve** correctly with real filenames; **1 is broken** (Grade 6 Unit 1 - see fixes above). |
| External practice links (mathworksheets4kids.com etc.) | 45 unique | All 25 `mathworksheets4kids.com` links returned HTTP 403 to my automated checker - **verified this is Cloudflare's bot-challenge page** ("Just a moment...", confirmed by inspecting the actual response body, not just the status code), not a broken link; these work fine for real browser visitors. The other 20 non-Cloudflare-protected links all resolved normally. |

### Mobile nav / footer on "both template families"

Since bug #1 doesn't exist (there's only one template family, "Ascent Math," everywhere), there's only one footer and one mobile nav to check - not two. `Navbar.tsx`'s mobile hamburger menu and `Footer.tsx` were reviewed; both are single shared components used identically on every route (no per-template forking to go out of sync in the first place, which is exactly the "share one layout, don't fork it" outcome the audit prompt was hoping for from bug #1's fix - it's already the case here).

---

## Phase 5: Codebase-wide pass

- **TypeScript:** `npx tsc --noEmit` is clean (0 errors) on the final branch state. Grepped for `: any`, `<any>`, `as any` - the only match is the English word "any" inside a lesson-content string (`grade8.ts`), not a type annotation. No unsafe types found.
- **Dead code:** found and removed 6 fully-orphaned components (see fixes above). No leftover old unit-first (`/mathematics/unit-1`) URL references anywhere - the grade-first URL migration is complete and clean. No `TODO`/`FIXME`/`XXX` comments and no leftover `console.log` calls anywhere in `src/`.
- **Duplicated logic:** bug #1's hypothesis (two forked layout files that would drift) doesn't apply since there's one shared layout/metadata system already. No other duplicated-logic concerns found.
- **Performance:** `next/image` is used consistently; the one `<img>` tag in the codebase (`WorksheetCard.tsx`, for external Google Drive thumbnails) has an explicit `eslint-disable-next-line @next/next/no-img-element` acknowledging the deliberate exception (Drive thumbnails aren't a whitelisted `next/image` remote pattern in this case is actually already handled - `drive.google.com` *is* in `next.config.ts`'s `images.remotePatterns`, so this is a pre-existing minor inconsistency worth a follow-up look, not touched here since it's a working, deliberately-marked exception, not a defect). `adampic.jpg` (197KB) and `alanpic.jpg` (153KB) are reasonably sized, not egregious. The homepage's canvas-based symbol animation (`FloatingMathCanvas.tsx`) already caps device pixel ratio at 1.5x, throttles to ~30fps, and pauses via `IntersectionObserver` when off-screen - reasonable mid-range-mobile-friendly defaults already in place; I did not have a way to profile actual frame timing on a real mid-range device from this sandbox.
- **SEO:** `sitemap.xml` now lists every real route (84/84, fixed above); `robots.txt` disallows only private/auth/API routes and doesn't block anything that should be indexed.
- **Security:** No API keys or secrets found in client-side code or committed anywhere in `src/` (checked - `RESEND_API_KEY`, Firebase config, Turnstile secret are all read from `process.env` server-side or are intentionally-public `NEXT_PUBLIC_*` values per the README's own explanation of why those specific ones are safe to expose). The booking API route validates with a shared Zod schema **server-side** (`contactFormSchema.safeParse`), not just in the browser - confirmed by reading `route.ts`, this happens regardless of what the client sends.

---

## Fixed

1. `/mathematics` now a real index page instead of a redirect stub; every breadcrumb's "Mathematics" crumb across grade/unit/topic/find-your-start/curriculum-frameworks pages now points to it instead of the homepage `#study-paths` anchor (bug #6).
2. Added the missing `<h1>` to the new `/mathematics` page.
3. Added `/mathematics` to `sitemap.xml` (it dynamically includes every grade/unit/topic already, but was missing the new static index route).
4. Removed 6 fully dead/orphaned components (396 lines).

## Needs Adam's call

Nothing touching pricing, tier structure, wording, or brand naming was changed, per the ground rules. Specifically:

1. **Grade 6 Unit 1's GADOE framework PDF link is broken** (Google Drive "Page Not Found"). Needs a corrected Drive share link - I don't have access to fix this myself.
2. **Bugs #1, #2, #3, #5, #7, #8, #10 could not be reproduced against current `main`** (detailed evidence above). If the *live production site* still shows any of these, that points to a stale deployment rather than a codebase bug - worth checking what commit is actually deployed at adamsalphabet.com.
3. **Interactive click-through flows** (find-your-start wizard steps, booking-form inline validation, quiz answer selection) could not be exercised via this sandbox's browser automation (detailed explanation in Phase 3) - code review found them correct, but genuinely needs a human clicking through once, especially on real iOS Safari per the audit's own instructions, which I have no way to drive from this Linux sandbox.
4. **Booking form end-to-end email delivery** needs `RESEND_API_KEY` configured to verify with `npm run book:test` - not available in this sandbox.
5. **Responsive layout at 375/768/1440px and color contrast on secondary surfaces** need visual/device confirmation - no screenshot-diff or axe-core tooling was available in this sandbox to automate it.
6. **`/tutoring` redirect is defined twice** (once in `next.config.ts`, once as its own `page.tsx`) - both agree on the same destination so it's harmless, but could be consolidated to one mechanism as a minor cleanup; left alone since it's not broken and not part of the explicit fix list.
7. **Bugs #4 and #9 confirmed already correct/intentional** as described - no changes made (grade dropdown is complete; 4-tier pricing structure with no listed rates matches the "confirm before touching" framing).

---

## Build / typecheck / lint - final branch state

```
$ npx tsc --noEmit
(clean, 0 errors)

$ npm run lint
(clean, 0 warnings)

$ npm run build
✓ Compiled successfully
✓ Generating static pages (95/95)
(all routes build successfully, including the new /mathematics page)
```

All three confirmed clean on the final commit of this branch.
