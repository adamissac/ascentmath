import { buildPageMetadata } from "../../lib/metadata";
import { SITE_BRAND_NAME } from "../../lib/site-brand";
import { ADAM_EMAIL, ALAN_EMAIL } from "../../data/site-team";

export const metadata = buildPageMetadata({
  title: "Accessibility Statement",
  description: `Accessibility statement for ${SITE_BRAND_NAME}.`,
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <article className="mx-auto max-w-3xl page-x py-12 sm:py-16 prose prose-neutral">
      <h1 className="font-display text-3xl font-bold text-[var(--color-ink)]">
        Accessibility Statement
      </h1>
      <p className="text-sm text-[var(--color-ink-muted)] mt-2">Last updated: July 9, 2026</p>

      <section className="mt-8 space-y-4 text-[var(--color-ink-muted)] leading-relaxed">
        <p>
          {SITE_BRAND_NAME} is committed to making our website usable for as many people as possible,
          including learners, parents, and educators using assistive technology.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Our accessibility goal
        </h2>
        <p>
          We aim to meet the intent of WCAG 2.1 AA where practical for a small tutoring business.
        </p>

        <h2 className="font-display text-xl font-bold text-[var(--color-ink)] mt-8">
          Feedback and support
        </h2>
        <p>
          If you encounter an accessibility barrier, please email us and include the page URL and a
          short description of the problem. We will prioritize fixes for serious barriers.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-[var(--color-ink)]">Email:</strong> {ADAM_EMAIL} or {ALAN_EMAIL}
          </li>
        </ul>
      </section>
    </article>
  );
}

