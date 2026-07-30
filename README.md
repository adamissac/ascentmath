# Ascent Math

Free Grades 6-8 math resources Ã¢â‚¬â€ self-paced study paths, video walkthroughs, worksheets, and quizzes Ã¢â‚¬â€ layered under a paid 1-on-1 tutoring business. Built with Next.js 15, React 19, and Tailwind CSS v4.

Live at **https://www.joinascentmath.com**

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in your Resend API key
npm run dev
```

Open <http://localhost:3000>.

## Booking system (Resend)

The booking form lives on the homepage (`#book-session`) and sends real emails to Adam and Alan via [Resend](https://resend.com). Both `adamissac08@gmail.com` and `alanmozhoor@gmail.com` receive submissions. The form posts to the in-app API route `src/app/api/contact/route.ts` Ã¢â‚¬â€ no `mailto:` links anywhere, no third-party widgets.

Fields collected: inquiry type (Student Tutoring / Class Demo / School Partnership / General), name, email, school or org (optional), grade level, and message.

There's no instant booking or published pricing on the site. A submission goes to Adam and Alan, who personally review and reply within 1-2 days to set up a **free consultation call** over Zoom before any paid sessions begin. Tutoring itself is Zoom-only Ã¢â‚¬â€ no in-person option.

### One-time setup

1. Create a free Resend account at <https://resend.com>.
2. Verify both destination addresses (`adamissac08@gmail.com` and `alanmozhoor@gmail.com`) under **Settings Ã¢â€ â€™ Verified Emails**. This lets you send to those inboxes without owning a custom domain.
3. Create an API key under **API Keys Ã¢â€ â€™ Create API Key**. Copy the `re_Ã¢â‚¬Â¦` string.
4. Copy `.env.example` to `.env.local` and paste the key:

   ```bash
   RESEND_API_KEY=re_your_real_key_here
   BOOKING_RECIPIENT_EMAIL=adamissac08@gmail.com,alanmozhoor@gmail.com
   BOOKING_FROM_EMAIL="Ascent Math <onboarding@resend.dev>"
   ```

5. Restart the dev server. Bookings now flow to both tutors' inboxes.

### Production (Vercel)

Add the same three keys in **Project Settings Ã¢â€ â€™ Environment Variables**. Redeploy.

### Optional: send from your own domain

Once `joinascentmath.com` is verified in Resend (Settings Ã¢â€ â€™ Domains), switch `BOOKING_FROM_EMAIL` to something like `"Ascent Math <booking@joinascentmath.com>"`. Replies will still route to whoever submitted the form, because the API sets `replyTo` to the visitor's address.

### What the API does

- **Validates** every field server-side with Zod (`src/app/api/contact/route.ts`).
- **Rate-limits** to 5 submissions per minute per IP.
- **Honeypot** field hidden in the form catches bots.
- **Templates** the email (HTML + plain text) in `src/lib/contactEmail.ts`.
- Returns structured JSON: `{ ok: true }` on success, or `{ ok: false, error, fieldErrors? }` on failure Ã¢â‚¬â€ the form surfaces these inline.

## Authentication

Account sign-up / login is **not active** in the current app Ã¢â‚¬â€ study paths and booking work without an account. `/login` redirects to the booking section. Older Firebase env vars in docs were removed from `.env.example` to match production.

## Project structure

```
src/
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ app/
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ layout.tsx                  # Root layout (Nav + Footer + fonts)
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ page.tsx                    # Landing page (credentials, booking form, study paths)
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ globals.css                 # Design tokens + base styles
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ loading.tsx, error.tsx, not-found.tsx
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ about/page.tsx
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ privacy/page.tsx
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ terms/page.tsx
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ accessibility/page.tsx
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ mathematics/
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ page.tsx                # Curriculum hub / "Find your start"
Ã¢â€â€š       Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ curriculum-frameworks/page.tsx
Ã¢â€â€š       Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ [grade]/[unit]/page.tsx # Dynamic unit page (Grades 6, 7, 8)
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ components/                     # Reusable UI primitives
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Navbar, Footer, Container, Section, SectionHeader
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Button, Card, Badge, Breadcrumbs, ProgressBar
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ VideoEmbed, WorksheetCard, ResourceLinkCard
Ã¢â€â€š   Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ Quiz, UnitProgressPanel
Ã¢â€Å“Ã¢â€â‚¬Ã¢â€â‚¬ data/
Ã¢â€â€š   Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ units.ts                    # Curriculum source of truth (Grades 6-8)
Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ hooks/
    Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬ useUnitProgress.ts          # localStorage-backed progress
```

## Adding or editing content

All curriculum data Ã¢â‚¬â€ units, videos, worksheets, quiz questions Ã¢â‚¬â€ lives in `src/data/units.ts`, covering Grade 6 (7 units, 22 topics), Grade 7 (6 units, 17 topics), and Grade 8 (7 units, 16 topics). Edit that file and every page (home, math hub, unit pages, frameworks page) updates automatically.

### Add a video to a unit

```ts
videos: [
  { videoId: "abc123XYZ", title: "Adding fractions", source: "Khan Academy", description: "..." },
  // ...
]
```

### Add a worksheet (Google Drive)

```ts
worksheets: [
  { driveFileId: "1abc...", title: "Worksheet 1", description: "..." },
]
```

### Add a quiz question

```ts
quiz: [
  {
    id: "u1-q5",
    prompt: "What is 1/2 + 1/3?",
    type: "multiple-choice",
    options: ["2/5", "5/6", "1/5", "2/6"],
    answer: "5/6",
    explanation: "Common denominator 6: 3/6 + 2/6 = 5/6.",
    difficulty: "easy",
  },
]
```

## Design system

Design tokens are defined as CSS custom properties in `src/app/globals.css` under the `@theme` block. Component primitives map to these tokens via utility classes like `btn`, `btn-primary`, `card`, `pill`, etc.

Tokens include:

- Brand palette (`--color-brand-50` Ã¢â‚¬Â¦ `--color-brand-900`) Ã¢â‚¬â€ teal-green
- Accent palette (`--color-accent-*`) Ã¢â‚¬â€ warm amber
- Surface, ink, border tokens (background `#FBFAF7`)
- Semantic colors (info, success, warning, danger)
- Radii, shadows, focus rings

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Lint check |

## License

Free educational use. Not affiliated with Khan Academy, GADOE, Georgia Tech, or any specific school district.

## Security notes

Never commit `.env.local`. Use `.env.example` as the template for Resend and related keys.

See [CONTRIBUTING.md](CONTRIBUTING.md).

Quick validation: `npm test` (lint + typecheck).
