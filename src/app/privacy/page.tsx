import Link from "next/link";
import { buildPageMetadata } from "../../lib/metadata";
import { SITE_BRAND_NAME } from "../../lib/site-brand";
import {
  ADAM_EMAIL,
  ALAN_EMAIL,
  ADAM_PHONE_DISPLAY,
  ALAN_PHONE_DISPLAY,
  TUTOR_NAMES,
} from "../../data/site-team";

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
        Last updated: July 9, 2026
      </p>

      <section className="mt-8 space-y-4 text-[var(--color-ink-muted)] leading-relaxed">
        <p>
          {SITE_BRAND_NAME} (&quot;we,&quot; &quot;us&quot;) provides paid math tutoring and free
          self-paced study paths at{" "}
          <strong className="text-[var(--color-ink)]">joinascentmath.com</strong>. {SITE_BRAND_NAME} is
          operated by <strong className="text-[var(--color-ink)]">{TUTOR_NAMES}</strong>. This policy
          explains what information we collect, how we use it, and the choices you have.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Information we collect
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-[var(--color-ink)]">Contact and booking forms:</strong> the adult
            requester&apos;s name and email (required), optional school/organization and grade level,
            and your message.
          </li>
          <li>
            <strong className="text-[var(--color-ink)]">Usage data:</strong> anonymized analytics
            (page views, performance) via Vercel Analytics.
          </li>
          <li>
            <strong className="text-[var(--color-ink)]">Study-path progress (on your device):</strong>{" "}
            our study paths save progress using your browser&apos;s local storage so you can pick up
            where you left off. This progress stays on your device and is not sent to our servers.
          </li>
        </ul>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          How we use information
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Respond to inquiries and schedule tutoring, demos, or partnerships.</li>
          <li>Provide tutoring services and communicate about sessions.</li>
          <li>Maintain, secure, and improve the website.</li>
          <li>Comply with legal obligations and prevent fraud/spam.</li>
        </ul>
        <p>
          We do not sell personal information. We do not use your information for targeted advertising,
          and we do not run third-party advertising on this site.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Children and students (FERPA / COPPA)
        </h2>
        <p>
          {SITE_BRAND_NAME} is intended for families and schools, including learners in elementary and
          middle school. We designed the site so that students can use the free study paths{" "}
          <strong className="text-[var(--color-ink)]">without creating an account</strong> and without
          providing personal information.
        </p>
        <p>
          <strong className="text-[var(--color-ink)]">Students under 13:</strong> we do not knowingly
          collect personal information directly from children under 13. Our booking/contact form is
          intended to be submitted by a parent/guardian, educator, or school staff member.
        </p>
        <p>
          <strong className="text-[var(--color-ink)]">What we may receive about a child:</strong> if a
          parent/guardian or school includes a student&apos;s information in a tutoring request (for
          example, the student&apos;s first name, grade level, or learning needs), we use it only to
          respond to the inquiry and provide the requested services.
        </p>
        <p>
          <strong className="text-[var(--color-ink)]">Parent rights:</strong> a parent or guardian may
          request to review, correct, or delete information we have received about their child by
          emailing us (see Contact below). We will respond within 30 days.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Essential cookies / storage
        </h2>
        <p>
          We use essential storage to make the site work (for example, saving study-path progress on
          your device and preventing spam submissions). We do not use advertising cookies or cross-site
          tracking cookies.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Third-party services
        </h2>
        <p>We use:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-[var(--color-ink)]">Vercel</strong> for hosting and anonymized analytics.
          </li>
          <li>
            <strong className="text-[var(--color-ink)]">Cloudflare Turnstile</strong> for spam prevention on
            the booking/contact form.
          </li>
          <li>
            <strong className="text-[var(--color-ink)]">Resend</strong> for email delivery of form submissions
            to our tutor inboxes.
          </li>
        </ul>
        <p>
          Some pages include links to third-party content (for example, worksheets hosted on Google Drive,
          videos on YouTube, and external practice websites). If you click those links, the third party will
          process information under their own policies.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">Retention</h2>
        <p>
          Form submissions are delivered to our email inboxes and may be retained as long as needed to respond,
          provide services, and keep basic business records. You can request deletion at any time. Anonymized
          analytics is retained in aggregate form.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">Security</h2>
        <p>
          We use HTTPS and reputable service providers, and we limit access to inquiry information to the
          founders/operators. No method of transmission or storage is 100% secure, but we work to protect
          information we handle.
        </p>
        <p>
          If a breach affecting your personal information occurs, we will notify affected users promptly
          consistent with applicable law.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">School partnerships</h2>
        <p>
          If we work with a school, any student information the school shares with us is used only to provide
          the agreed services, is not sold or used for advertising, and will be deleted at the school&apos;s request.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Your rights
        </h2>
        <p>
          You may request access, correction, or deletion of your personal information by emailing
          us at the addresses listed below. We will respond within 30 days.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Changes to this policy
        </h2>
        <p>
          We may update this policy from time to time. We will post the updated version on this page and update
          the &ldquo;Last updated&rdquo; date above.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">Contact</h2>
        <p>Questions about this policy, or want to request access or deletion? Contact us:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-[var(--color-ink)]">Email:</strong> {ADAM_EMAIL} or {ALAN_EMAIL}
          </li>
          <li>
            <strong className="text-[var(--color-ink)]">Phone:</strong> Adam ({ADAM_PHONE_DISPLAY}) or Alan ({ALAN_PHONE_DISPLAY})
          </li>
          <li>
            <strong className="text-[var(--color-ink)]">Mailing address:</strong>{" "}
            [POSTAL ADDRESS — REQUIRED, SEE LEGAL TODO #B1]
          </li>
        </ul>
        <p>
          You can also use{" "}
          <Link href="/#book-session" className="link font-semibold">
            the booking form
          </Link>
          . By submitting the form, you agree to our{" "}
          <Link href="/terms" className="link font-semibold">
            Terms of Service
          </Link>
          .
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          International visitors
        </h2>
        <p>
          {SITE_BRAND_NAME} is operated from the United States for a U.S. audience. If you access the site from
          outside the U.S., you understand your information may be processed in the U.S.
        </p>
      </section>
    </article>
  );
}
