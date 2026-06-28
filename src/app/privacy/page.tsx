import Link from "next/link";
import { buildPageMetadata } from "../../lib/metadata";
import { SITE_BRAND_NAME } from "../../lib/site-brand";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: `How ${SITE_BRAND_NAME} collects, uses, and protects your information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl page-x py-12 sm:py-16 prose prose-neutral">
      <h1 className="font-display text-3xl font-bold text-[var(--color-ink)]">Privacy Policy</h1>
      <p className="text-sm text-[var(--color-ink-muted)] mt-2">
        Last updated: June 28, 2026
      </p>

      <section className="mt-8 space-y-4 text-[var(--color-ink-muted)] leading-relaxed">
        <p>
          {SITE_BRAND_NAME} (&quot;we,&quot; &quot;us&quot;) provides math tutoring and free study
          resources. This policy explains what information we collect and how we use it.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Information we collect
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-[var(--color-ink)]">Contact and booking forms:</strong> name,
            email, school, grade, and message when you request tutoring or a demo.
          </li>
          <li>
            <strong className="text-[var(--color-ink)]">Account data:</strong> if you create an
            account, we store your email, display name, and progress preferences via Firebase.
          </li>
          <li>
            <strong className="text-[var(--color-ink)]">Usage data:</strong> anonymized analytics
            (page views, performance) via Vercel Analytics. We do not sell personal data.
          </li>
        </ul>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Children and students (FERPA / COPPA)
        </h2>
        <p>
          We may receive information about learners under 18 when a parent, guardian, or school
          submits a tutoring request. We use that information only to respond to the inquiry and
          provide tutoring services. We do not knowingly collect personal information directly from
          children under 13 without parental consent. If you believe we have collected information
          from a child in error, contact us and we will delete it promptly.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          How we use information
        </h2>
        <p>
          We use your information to respond to booking requests, deliver tutoring services,
          maintain your account, improve our site, and comply with legal obligations. We do not
          display ads or sell data to third parties.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Third-party services
        </h2>
        <p>
          We use Resend (email delivery), Firebase (authentication), Cloudflare Turnstile (spam
          protection), and Vercel (hosting). Each provider processes data under their own privacy
          policies and our instructions.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Your rights
        </h2>
        <p>
          You may request access, correction, or deletion of your personal information by emailing
          us at the addresses listed on our homepage. We will respond within a reasonable time.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">Contact</h2>
        <p>
          Questions about this policy? Reach {SITE_BRAND_NAME} via the contact form on{" "}
          <Link href="/#book-session" className="link font-semibold">
            our homepage
          </Link>{" "}
          or see our{" "}
          <Link href="/terms" className="link font-semibold">
            Terms of Service
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
