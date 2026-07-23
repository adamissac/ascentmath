# Contributing to Ascent Math

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Before opening a PR

- `npm run lint`
- `npm run build` for production sanity
- Prefer small, focused PRs (copy, content, or infra — not mixed)

Booking email changes should be tested with `npm run book:test` when Resend credentials are configured.
