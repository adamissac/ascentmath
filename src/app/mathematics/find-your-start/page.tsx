import type { Metadata } from "next";
import Container from "../../../components/Container";
import TopicStartFinder from "../../../components/TopicStartFinder";
import StudyPathCta from "../../../components/StudyPathCta";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { GRADES } from "../../../data/units";
import { MATHEMATICS_HREF } from "../../../lib/site-paths";
import { buildPageMetadata } from "../../../lib/metadata";
import StudyPathsLink from "../../../components/StudyPathsLink";

export const metadata: Metadata = buildPageMetadata({
  title: "Find your start",
  description:
    "Answer three quick questions to find the right grade, unit, and topic in the free Grades 6-8 study paths.",
  path: "/mathematics/find-your-start",
});

const PANEL =
  "rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8";

export default function FindYourStartPage() {
  const totalUnits = GRADES.reduce((s, g) => s + g.units.length, 0);

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] py-8 sm:py-10">
        <Container size="md">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Mathematics", href: MATHEMATICS_HREF },
              { label: "Find your start" },
            ]}
          />

          <div className={`${PANEL} mt-6 sm:mt-8`}>
            <h1 className="h-display min-w-0 text-[var(--color-ink-cool)]">Find the right unit for you</h1>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--color-ink-muted)] sm:text-base">
              You don&apos;t have to browse all {totalUnits} units blind. Pick your grade and what your
              class is covering — we&apos;ll point you to a sensible starting topic.
            </p>

            <div className="mt-8 border-t border-[var(--color-border)] pt-8">
              <TopicStartFinder />
            </div>
          </div>

          <p className="small mt-6 text-center text-[var(--color-ink-muted)]">
            Already know the topic name?{" "}
            <StudyPathsLink className="link font-semibold">Browse study paths</StudyPathsLink>.
          </p>
        </Container>
      </section>

      <StudyPathCta />
    </>
  );
}
