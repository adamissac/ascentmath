# Ascent Math

Free Grades 6-8 math resources — self-paced study paths, video walkthroughs, worksheets, and quizzes — layered under a paid 1-on-1 tutoring business. Built with Next.js 15, React 19, and Tailwind CSS v4.

Live at **https://www.joinascentmath.com**

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in your Resend API key
npm run dev
```

Open <http://localhost:3000>.

## Booking system (Resend)

The booking form lives on the homepage (`#book-session`) and sends real emails to Adam and Alan via [Resend](https://resend.com). Both `adamissac08@gmail.com` and `alanmozhoor@gmail.com` receive submissions. The form posts to the in-app API route `src/app/api/contact/route.ts` — no `mailto:` links anywhere, no third-party widgets.

Fields collected: inquiry type (Student Tutoring / Class Demo / School Partnership / General), name, email, school or org (optional), grade level, and message.

There's no instant booking or published pricing on the site. A submission goes to Adam and Alan, who personally review and reply within 1-2 days to set up a **free consultation call** over Zoom before any paid sessions begin. Tutoring itself is Zoom-only — no in-person option.

### One-time setup

1. Create a free Resend account at <https://resend.com>.
2. Verify both destination addresses (`adamissac08@gmail.com` and `alanmozhoor@gmail.com`) under **Settings → Verified Emails**. This lets you send to those inboxes without owning a custom domain.
3. Create an API key under **API Keys → Create API Key**. Copy the `re_…` string.
4. Copy `.env.example` to `.env.local` and paste the key:

   ```bash
   RESEND_API_KEY=re_your_real_key_here
   BOOKING_RECIPIENT_EMAIL=adamissac08@gmail.com,alanmozhoor@gmail.com
   BOOKING_FROM_EMAIL="Ascent Math <onboarding@resend.dev>"
   ```

5. Restart the dev server. Bookings now flow to both tutors' inboxes.

### Production (Vercel)

Add the same three keys in **Project Settings → Environment Variables**. Redeploy.

### Optional: send from your own domain

Once `joinascentmath.com` is verified in Resend (Settings → Domains), switch `BOOKING_FROM_EMAIL` to something like `"Ascent Math <booking@joinascentmath.com>"`. Replies will still route to whoever submitted the form, because the API sets `replyTo` to the visitor's address.

### What the API does

- **Validates** every field server-side with Zod (`src/app/api/contact/route.ts`).
- **Rate-limits** to 5 submissions per minute per IP.
- **Honeypot** field hidden in the form catches bots.
- **Templates** the email (HTML + plain text) in `src/lib/contactEmail.ts`.
- Returns structured JSON: `{ ok: true }` on success, or `{ ok: false, error, fieldErrors? }` on failure — the form surfaces these inline.

## Authentication (Firebase)

Account pages live at `/signup`, `/login`, `/forgot-password`, and `/dashboard`. The system uses **Firebase Authentication** (email + password and Google) with optional **Firestore** for storing user profiles.

> **Note:** the free study paths themselves require no account — this auth system is separate, opt-in infrastructure. Worth double-checking before public launch whether the site's "no account needed" messaging and this dashboard coexist cleanly, especially given COPPA considerations for a site with under-13 visitors.

### One-time setup

1. **Create a Firebase project** at <https://console.firebase.google.com>.
2. **Enable sign-in methods**:
   - Authentication → Sign-in method → enable **Email/Password**.
   - Authentication → Sign-in method → enable **Google** (set a support email).
3. **(Optional) Enable Firestore** to persist user profiles:
   - Build → Firestore Database → Create database (Production mode → pick a region).
   - Replace the default rules with the snippet below so a user can only read/write their own profile:

     ```rules
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /users/{uid} {
           allow read, write: if request.auth != null && request.auth.uid == uid;
         }
       }
     }
     ```

4. **Register a web app**: Project settings (gear) → General → "Your apps" → Web (`</>`) → register. Copy the six `firebaseConfig` values into `.env.local`:

   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc...
   ```

   These keys are **public by design** — the Firebase Web SDK requires them in the browser bundle. Security is enforced by the rules above, not by hiding the key.

5. **Authorized domains**: still in Authentication → Settings → Authorized domains, add `localhost` (already there) and any production domain you'll deploy on (e.g. `joinascentmath.com`, `ascent-math.vercel.app`).
6. Restart `npm run dev`. Sign up at `/signup`, log out from the navbar avatar menu, and try `/forgot-password`.

### How it's wired

| Concern | Where |
| --- | --- |
| SDK init (lazy, env-guarded) | `src/lib/firebase.ts` |
| Friendly error messages | `src/lib/auth-errors.ts` |
| Session + actions context | `src/components/AuthProvider.tsx` |
| Route guards | `src/components/ProtectedRoute.tsx`, `src/components/RedirectIfAuthed.tsx` |
| Shared auth-page chrome | `src/components/AuthShell.tsx` |
| Form primitives (Google btn, password meter, etc.) | `src/components/AuthFormParts.tsx` |
| Signup / login / forgot / dashboard pages | `src/app/{signup,login,forgot-password,dashboard}/page.tsx` |
| Navbar user menu | `src/components/Navbar.tsx` |

Key behaviors:

- **Persistent sessions** — `browserLocalPersistence` by default. Uncheck "Remember me" on the login screen to switch to `browserSessionPersistence`.
- **Protected routes** — `/dashboard` redirects to `/login?next=/dashboard` if not authenticated. After login the user is sent back to the original `next` path.
- **Already-logged-in guard** — `/login`, `/signup`, `/forgot-password` redirect to `/dashboard` if the visitor already has a session.
- **Graceful degradation** — if `NEXT_PUBLIC_FIREBASE_*` aren't set, every auth screen and the dashboard show a friendly "Firebase not configured" banner instead of crashing.
- **Profiles** — on first sign-in a `users/{uid}` document is created in Firestore (name, email, role, createdAt). If Firestore isn't enabled the auth still works; we just synthesize the profile from the Auth record.
- **Google sign-in resilience** — tries `signInWithPopup` first; if the browser blocks the popup or refuses third-party storage, automatically falls back to `signInWithRedirect`. `getRedirectResult` is consumed on mount so the user lands back in `/dashboard` without an extra click.

### Troubleshooting Google sign-in

If "Continue with Google" doesn't work, walk this checklist:

1. **Method enabled?** Firebase Console → Authentication → Sign-in method → confirm **Google** shows "Enabled". Setting a support email is required to turn it on. If you haven't done this you'll see `auth/operation-not-allowed`.
2. **Domain authorized?** Authentication → Settings → **Authorized domains** must include the host the user is on. `localhost` is added by default; your production host (e.g. `joinascentmath.com`, `ascent-math.vercel.app`) must be added manually. Missing entries throw `auth/unauthorized-domain`.
3. **Env vars filled?** All six `NEXT_PUBLIC_FIREBASE_*` values must be set in `.env.local` and the dev server restarted afterwards (Next.js bakes them in at build time).
4. **Popup blocker?** Some browsers (especially Safari + Firefox in strict mode) block OAuth popups. The app will auto-fall-back to a full-page redirect — if you'd rather use the popup, allow popups for this site.
5. **Strict tracking protection?** Brave / Safari ITP can disable the storage Firebase needs. You'll see `auth/web-storage-unsupported`. Disable strict tracking for the site or use the redirect flow.
6. **Verified support email?** If you change the support email in GCP, Google sign-in can briefly stop working — re-saving the Sign-in method config refreshes it.

## Project structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout (Nav + Footer + fonts)
│   ├── page.tsx                    # Landing page (credentials, booking form, study paths)
│   ├── globals.css                 # Design tokens + base styles
│   ├── loading.tsx, error.tsx, not-found.tsx
│   ├── about/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── accessibility/page.tsx
│   └── mathematics/
│       ├── page.tsx                # Curriculum hub / "Find your start"
│       ├── curriculum-frameworks/page.tsx
│       └── [grade]/[unit]/page.tsx # Dynamic unit page (Grades 6, 7, 8)
├── components/                     # Reusable UI primitives
│   ├── Navbar, Footer, Container, Section, SectionHeader
│   ├── Button, Card, Badge, Breadcrumbs, ProgressBar
│   ├── VideoEmbed, WorksheetCard, ResourceLinkCard
│   ├── Quiz, UnitProgressPanel
├── data/
│   └── units.ts                    # Curriculum source of truth (Grades 6-8)
└── hooks/
    └── useUnitProgress.ts          # localStorage-backed progress
```

## Adding or editing content

All curriculum data — units, videos, worksheets, quiz questions — lives in `src/data/units.ts`, covering Grade 6 (7 units, 22 topics), Grade 7 (6 units, 17 topics), and Grade 8 (7 units, 16 topics). Edit that file and every page (home, math hub, unit pages, frameworks page) updates automatically.

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

- Brand palette (`--color-brand-50` … `--color-brand-900`) — teal-green
- Accent palette (`--color-accent-*`) — warm amber
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
