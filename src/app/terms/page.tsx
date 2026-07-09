import Link from "next/link";
import { buildPageMetadata } from "../../lib/metadata";
import { SITE_BRAND_NAME } from "../../lib/site-brand";

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
        Last updated: June 28, 2026
      </p>

      <section className="mt-8 space-y-4 text-[var(--color-ink-muted)] leading-relaxed">
        <p>
          By using {SITE_BRAND_NAME} (&quot;the Site&quot;), you agree to these terms. If you do not
          agree, please do not use the Site.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">Services</h2>
        <p>
          {SITE_BRAND_NAME} offers paid math tutoring and free self-paced study materials for grades
          6–8. Tutoring availability, pricing, and scheduling are confirmed individually after you
          submit a booking request.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Acceptable use
        </h2>
        <p>
          Do not misuse the Site, attempt to scrape or overload our systems, submit spam, or upload
          harmful content. We may decline or suspend access for abuse.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Educational content
        </h2>
        <p>
          Study materials are provided for personal learning. They are not a substitute for
          classroom instruction or professional advice. We strive for accuracy but do not guarantee
          completeness or exam results.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Minors and parental consent
        </h2>
        <p>
          If you are under 18, a parent or guardian should submit tutoring requests on your behalf.
          By using the Site, you confirm you have permission to share any learner information you
          provide.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Limitation of liability
        </h2>
        <p>
          The Site is provided &quot;as is.&quot; To the fullest extent permitted by law,{" "}
          {SITE_BRAND_NAME} is not liable for indirect or consequential damages arising from use of
          the Site or tutoring services.
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
          or read our{" "}
          <Link href="/privacy" className="link font-semibold">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
