# Ascent Math

Free Grades 6-8 math resources â€” self-paced study paths, video walkthroughs, worksheets, and quizzes â€” layered under a paid 1-on-1 tutoring business. Built with Next.js 15, React 19, and Tailwind CSS v4.

Live at **https://www.joinascentmath.com**

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in your Resend API key
npm run dev
```

Open <http://localhost:3000>.

## Booking system (Resend)

The booking form lives on the homepage (`#book-session`) and sends real emails to Adam and Alan via [Resend](https://resend.com). Both `adamissac08@gmail.com` and `alanmozhoor@gmail.com` receive submissions. The form posts to the in-app API route `src/app/api/contact/route.ts` â€” no `mailto:` links anywhere, no third-party widgets.

Fields collected: inquiry type (Student Tutoring / Class Demo / School Partnership / General), name, email, school or org (optional), grade level, and message.

There's no instant booking or published pricing on the site. A submission goes to Adam and Alan, who personally review and reply within 1-2 days to set up a **free consultation call** over Zoom before any paid sessions begin. Tutoring itself is Zoom-only â€” no in-person option.

### One-time setup

1. Create a free Resend account at <https://resend.com>.
2. Verify both destination addresses (`adamissac08@gmail.com` and `alanmozhoor@gmail.com`) under **Settings â†’ Verified Emails**. This lets you send to those inboxes without owning a custom domain.
3. Create an API key under **API Keys â†’ Create API Key**. Copy the `re_â€¦` string.
4. Copy `.env.example` to `.env.local` and paste the key:

   ```bash
   RESEND_API_KEY=re_your_real_key_here
   BOOKING_RECIPIENT_EMAIL=adamissac08@gmail.com,alanmozhoor@gmail.com
   BOOKING_FROM_EMAIL="Ascent Math <onboarding@resend.dev>"
   ```

5. Restart the dev server. Bookings now flow to both tutors' inboxes.

### Production (Vercel)

Add the same three keys in **Project Settings â†’ Environment Variables**. Redeploy.

### Optional: send from your own domain

Once `joinascentmath.com` is verified in Resend (Settings â†’ Domains), switch `BOOKING_FROM_EMAIL` to something like `"Ascent Math <booking@joinascentmath.com>"`. Replies will still route to whoever submitted the form, because the API sets `replyTo` to the visitor's address.

### What the API does

- **Validates** every field server-side with Zod (`src/app/api/contact/route.ts`).
- **Rate-limits** to 5 submissions per minute per IP.
- **Honeypot** field hidden in the form catches bots.
- **Templates** the email (HTML + plain text) in `src/lib/contactEmail.ts`.
- Returns structured JSON: `{ ok: true }` on success, or `{ ok: false, error, fieldErrors? }` on failure â€” the form surfaces these inline.

## Authentication

Account sign-up / login is **not active** in the current app â€” study paths and booking work without an account. `/login` redirects to the booking section. Older Firebase env vars in docs were removed from `.env.example` to match production.

## Project structure

```
src/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ layout.tsx                  # Root layout (Nav + Footer + fonts)
â”‚   â”œâ”€â”€ page.tsx                    # Landing page (credentials, booking form, study paths)
â”‚   â”œâ”€â”€ globals.css                 # Design tokens + base styles
â”‚   â”œâ”€â”€ loading.tsx, error.tsx, not-found.tsx
â”‚   â”œâ”€â”€ about/page.tsx
â”‚   â”œâ”€â”€ privacy/page.tsx
â”‚   â”œâ”€â”€ terms/page.tsx
â”‚   â”œâ”€â”€ accessibility/page.tsx
â”‚   â””â”€â”€ mathematics/
â”‚       â”œâ”€â”€ page.tsx                # Curriculum hub / "Find your start"
â”‚       â”œâ”€â”€ curriculum-frameworks/page.tsx
â”‚       â””â”€â”€ [grade]/[unit]/page.tsx # Dynamic unit page (Grades 6, 7, 8)
â”œâ”€â”€ components/                     # Reusable UI primitives
â”‚   â”œâ”€â”€ Navbar, Footer, Container, Section, SectionHeader
â”‚   â”œâ”€â”€ Button, Card, Badge, Breadcrumbs, ProgressBar
â”‚   â”œâ”€â”€ VideoEmbed, WorksheetCard, ResourceLinkCard
â”‚   â”œâ”€â”€ Quiz, UnitProgressPanel
â”œâ”€â”€ data/
â”‚   â””â”€â”€ units.ts                    # Curriculum source of truth (Grades 6-8)
â””â”€â”€ hooks/
    â””â”€â”€ useUnitProgress.ts          # localStorage-backed progress
```

## Adding or editing content

All curriculum data â€” units, videos, worksheets, quiz questions â€” lives in `src/data/units.ts`, covering Grade 6 (7 units, 22 topics), Grade 7 (6 units, 17 topics), and Grade 8 (7 units, 16 topics). Edit that file and every page (home, math hub, unit pages, frameworks page) updates automatically.

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

- Brand palette (`--color-brand-50` â€¦ `--color-brand-900`) â€” teal-green
- Accent palette (`--color-accent-*`) â€” warm amber
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
