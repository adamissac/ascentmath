import Link from "next/link";
import { buildPageMetadata } from "../../lib/metadata";
import { SITE_BRAND_NAME } from "../../lib/site-brand";
import { ADAM_EMAIL, ALAN_EMAIL, TUTOR_NAMES } from "../../data/site-team";

export const metadata = buildPageMetadata({
  title: "Terms of Service",
  description: `Terms governing use of ${SITE_BRAND_NAME} tutoring and study resources.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl page-x py-12 sm:py-16 prose prose-neutral">
      <h1 className="font-display text-3xl font-bold text-[var(--color-ink)]">Terms of Service</h1>
      <p className="text-sm text-[var(--color-ink-muted)] mt-2">
        Last updated: July 9, 2026
      </p>

      <section className="mt-8 space-y-4 text-[var(--color-ink-muted)] leading-relaxed">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of {SITE_BRAND_NAME} (&quot;Ascent
          Math,&quot; &quot;we,&quot; &quot;us&quot;) at joinascentmath.com (the &quot;Site&quot;). The
          Site is operated by {TUTOR_NAMES}. By using the Site or submitting a booking request, you
          agree to these Terms. If you do not agree, please do not use the Site.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">Services</h2>
        <p>
          {SITE_BRAND_NAME} provides:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-[var(--color-ink)]">Free study paths</strong> (self-paced learning
            pages for students and families), and
          </li>
          <li>
            <strong className="text-[var(--color-ink)]">Paid tutoring</strong> (1-on-1 and small-group
            sessions scheduled after a booking request).
          </li>
        </ul>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Free study paths (no account)
        </h2>
        <p>
          The free study paths are provided &quot;as is,&quot; for personal and educational use. They
          are not guaranteed to match any particular school curriculum or produce a specific result.
          You may not copy, sell, or redistribute our materials for commercial use.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Tutoring engagements
        </h2>
        <p>
          Tutoring sessions are scheduled after you submit a booking request and we confirm
          availability. Rates are communicated when booking (we do not list prices on the Site). Payment
          method and timing, if applicable, are confirmed when you book.
        </p>
        <p>
          <strong className="text-[var(--color-ink)]">First session free (new clients):</strong> we
          may offer one free initial tutoring session for new clients. Unless we state otherwise in
          writing, this means one free first session per new student/household.
        </p>
        <p>
          <strong className="text-[var(--color-ink)]">Cancellations/rescheduling:</strong>{" "}
          [CANCELLATION POLICY — P1 TODO: decide and insert]
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Minors and parental consent
        </h2>
        <p>
          If you are under 18, a parent or guardian must request and consent to tutoring on your
          behalf. The parent/guardian agrees to these Terms on the student&apos;s behalf. For students
          under 13, scheduling and logistics should go through the parent/guardian.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Acceptable use
        </h2>
        <p>
          Do not misuse the Site, attempt to scrape or overload our systems, submit spam, or upload
          harmful content. We may decline, suspend, or discontinue service for abusive or unsafe
          behavior.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Intellectual property and classroom use
        </h2>
        <p>
          The Site content, study paths, and worksheets are owned by {SITE_BRAND_NAME} unless otherwise
          stated. You may use them for personal learning. Teachers may print worksheets for classroom
          use. You may not sell, redistribute, or publish our materials for commercial use without
          permission.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Third-party links and content
        </h2>
        <p>
          The Site may link to third-party content or websites (for example, YouTube videos, Google
          Drive files, and external practice sites). We do not control those services and are not
          responsible for their content, policies, or availability.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Disclaimers (no guarantee of results)
        </h2>
        <p>
          Tutoring and study materials support learning, but we do not guarantee specific grades,
          scores, or outcomes. The Site and materials are provided &quot;as is&quot; and may contain
          errors or omissions.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Limitation of liability
        </h2>
        <p>
          To the fullest extent permitted by law, {SITE_BRAND_NAME} will not be liable for indirect,
          incidental, special, consequential, or punitive damages arising from your use of the Site or
          tutoring services. Our total liability for any claim will not exceed the amount you paid us
          for the tutoring services giving rise to the claim.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Indemnification
        </h2>
        <p>
          If you misuse the Site or violate these Terms, you agree to defend and indemnify {SITE_BRAND_NAME}
          from claims and expenses arising from that misuse or violation.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Governing law
        </h2>
        <p>
          These Terms are governed by the laws of the State of Georgia, USA, without regard to conflict-of-law
          principles.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Accessibility
        </h2>
        <p>
          We aim to make this Site accessible to as many people as possible. If you experience an accessibility
          barrier, please email us and we will work to address it. See our{" "}
          <Link href="/accessibility" className="link font-semibold">
            Accessibility Statement
          </Link>
          .
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Trademark and non-affiliation notice
        </h2>
        <p>
          AP® and SAT® are trademarks registered by the College Board, which is not affiliated with, and does not
          endorse, this site. ACT® is a registered trademark of ACT, Inc. {SITE_BRAND_NAME} is not affiliated with
          or endorsed by the Georgia Department of Education or the Georgia Institute of Technology.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">Changes</h2>
        <p>
          We may update these terms. Continued use after changes constitutes acceptance. Material
          changes will be reflected in the &quot;Last updated&quot; date above.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">Contact</h2>
        <p>
          Questions? Use the{" "}
          <Link href="/#book-session" className="link font-semibold">
            booking form
          </Link>{" "}
          or email us at {ADAM_EMAIL} or {ALAN_EMAIL}. Please also review our{" "}
          <Link href="/privacy" className="link font-semibold">
            Privacy Policy
          </Link>
          . If mailing address is required, use: [POSTAL ADDRESS — REQUIRED, SEE LEGAL TODO #B1]
        </p>
      </section>
    </article>
  );
}
