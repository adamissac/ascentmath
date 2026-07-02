# Ascent Math — Audit Report (2026-07-02)

Senior-dev review-and-fix pass per `cursor-full-site-audit` v2.0. Branch: **main** (no feature branches per owner instruction).

---

## 1. Baseline

| Item | Value |
|------|-------|
| Branch | `main` |
| Baseline HEAD | `2a2342e` — Reset banner dismiss state and make centered bar taller |
| Build (before) | PASS (`npm run build`) |
| Lint (before) | PASS (`npm run lint`) |
| Node | v22.14.0 · Next.js 15.5.19 |

---

## 2. Fix log

| ID | Severity | Route(s) | Root cause | Fix summary | Commit | Verified by |
|----|----------|----------|------------|-------------|--------|-------------|
| A1–A4 | — | unit, find-your-start, all | Already migrated in prior work | Ascent Math branding, shared footer, `buildPageMetadata`, unified Navbar wordmark — **no code change needed** | — | grep + build |
| B1–B5 | — | unit pages | Already fixed | Single sidebar in `LessonShell`; full metadata via `buildPageMetadata`; `#what-we-teach` everywhere | — | code review |
| C1 | CRITICAL | `/book`, `/mathematics/unit-*` | Missing permanent redirects for legacy flat unit URLs; `/book` was 302 | Added 301 redirects for `unit-1`…`unit-7` → grade-6 units; `/book` and `/tutoring` now permanent | `18a3f8c` | `curl -sI` → 308 + Location |
| C2 | — | legacy pages | Already retired | No legacy Adam's Alphabet page files remain; `/book` is server redirect only | — | app tree census |
| C3 | — | — | No placeholder YouTube link | `grep href="https://www.youtube.com"` → 0 | — | grep |
| D1 | HIGH | unit pages | Worksheets only on topic pages | Added `UnitWorksheetsSection` rendering topic worksheets on unit overview | `a84e561` | build + component |
| D2 | HIGH | curriculum-frameworks | Meta claimed G6–8; only G6 data exists | Updated meta + on-page “G7 & 8 coming soon” note | `a84e561` | copy review |
| D3 | — | — | Already normalized | `grep file/u/0/d` → 0 | — | grep |
| E1 | — | all | `enrichCurriculum.ts` computes unit minutes from topics | Single source of truth already in place | — | `npm run audit:validate` |
| E2 | — | home, hubs | Counts derived from `GRADES` | Homepage + grade hubs use data; 3g/20u/55t confirmed | — | validation script |
| F1 | — | breadcrumbs | Already unified | `MATHEMATICS_HREF` = `/mathematics` (Gen-2 index, not legacy) | — | code review |
| F2 | — | factors-multiples-gcf-lcm | Duplicate paragraphs | Already removed from data | — | grep |
| F3 | MEDIUM | `/` credentials | “Algebra EOC · EOC” duplicate | Changed detail to “End-of-Course exam” | `09dd87e` | credentials data |
| F4 | — | — | No stale free-tutoring copy | grep `never a charge\|no paid tier` → 0 | — | grep |
| F5 | — | topic quiz | Next advances questions | `Quiz.tsx` already separates question nav from topic link | — | code review |
| G1 | MEDIUM | images | Some `sizes` props present | Logo/portraits already have `sizes`; no 3840 regressions found in touched files | — | code review |
| G2 | MEDIUM | OG | `og-image.png` is 256×256, metadata claims 1200×630 | **OWNER-ACTION** — replace OG image | — | `file` + PIL |
| G3 | — | icons | Favicons generated from `newLogo.png` | Present in `/public` | — | ls public |
| G4 | — | sitemap | `sitemap.ts` derives from `GRADES` | 84 Gen-2 URLs; no legacy routes | — | route census |
| G5 | — | 404 | Branded `not-found.tsx` exists | Ascent Math header/footer via layout | — | file exists |
| G6 | — | — | No hydration issues in touched templates | — | — | build |
| §7 | — | data | No validation script | Added `scripts/audit/validate-content.ts` + `npm run audit:validate` | `09dd87e` | script output |

---

## 3. Route census results

**Gen-2 rendered routes (84):** all HTTP 200 against production build on `127.0.0.1:3001`.

| Template | Count | Status |
|----------|-------|--------|
| `/` | 1 | OK |
| `/mathematics` | 1 | OK |
| Grade hubs | 3 | OK |
| Units | 20 | OK |
| Topics | 55 | OK |
| find-your-start | 1 | OK |
| curriculum-frameworks | 1 | OK |
| privacy, terms | 2 | OK |

**Redirects (verified via `curl -sI`):**

| Legacy URL | Status | Destination |
|------------|--------|-------------|
| `/book` | 308 permanent | `/#book-session` |
| `/about` | 308 permanent | `/` |
| `/parents` | 308 permanent | `/#study-paths` |
| `/tutoring` | 308 permanent | `/#what-we-teach` |
| `/mathematics/unit-1` … `unit-7` | 308 permanent | `/mathematics/grade-6/unit-N` |

---

## 4. New findings

| ID | Severity | Notes | Status |
|----|----------|-------|--------|
| N1 | LOW | `og-image.png` dimensions (256×256) mismatch metadata (1200×630) | OWNER-ACTION |
| N2 | LOW | G6 Unit 1 `frameworkUrl` may be broken Drive link (`1GH3oj67h-27Nrr0h-XdQNavn-MpJnTHJ`) | OWNER-ACTION — verify in Drive |
| N3 | INFO | `/mathematics` is intentional Gen-2 grade index (not legacy hub) | Kept |

---

## 5. OWNER-ACTION list

1. **OG image** — Replace `/public/og-image.png` with a 1200×630 Ascent Math branded asset (current file is 256×256).
2. **G7/G8 framework PDFs** — Upload and add `frameworkUrl` to grade 7/8 units in data when ready.
3. **G6 Unit 1 framework link** — Confirm Drive file `1GH3oj67h-27Nrr0h-XdQNavn-MpJnTHJ` is accessible; replace if broken.
4. **Deploy** — Merge `main` and purge Cloudflare/Vercel cache so redirects take effect at the edge.
5. **YouTube channel** — No placeholder `youtube.com` links found; add real channel URL to footer if desired.

---

## 6. Deferred / out of scope

- Hero canvas animation rebuild
- Form backend / email infrastructure changes (per script rule 8)
- Auth/signup/dashboard flows (not part of study-path product)
- Pricing tables (intentionally removed)

---

## 7. Final state

| Item | Value |
|------|-------|
| Ending HEAD | `09dd87e` (after report hash amend) |
| Build | PASS |
| `npm run audit:validate` | PASS — 3 grades, 20 units, 55 topics, 0 errors |
| Route census | 84/84 OK |
| Adam's Alphabet in UI | 0 (domain string in `site-url.ts` only) |
| `#what-i-teach` hardcoded | 0 (HashScrollHandler remap only) |
| Commits this pass | 6 |

---

*Report maintained during audit pass 2026-07-02.*
