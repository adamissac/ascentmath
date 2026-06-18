import type { Metadata } from "next";
import Container from "../../../components/Container";
import TopicStartFinder from "../../../components/TopicStartFinder";
import Reveal from "../../../components/Reveal";
import StudyPathCta from "../../../components/StudyPathCta";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { GRADES } from "../../../data/units";
import { STUDY_PATHS_HREF } from "../../../lib/site-paths";
import { buildPageMetadata } from "../../../lib/metadata";
import StudyPathsLink from "../../../components/StudyPathsLink";

export const metadata: Metadata = buildPageMetadata({
  title: "Find your start",
  description:
    "Answer three quick questions to find the right grade, unit, and topic in the free Grades 6-8 study paths.",
  path: "/mathematics/find-your-start",
});

const CARD =
  "rounded-2xl border border-[rgba(26,26,46,0.08)] bg-white/85 p-6 shadow-[0_2px_12px_rgba(26,26,46,0.04)] backdrop-blur-sm sm:p-8";

export default function FindYourStartPage() {
  const totalUnits = GRADES.reduce((s, g) => s + g.units.length, 0);

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <Container size="lg" className="pt-8 pb-10 sm:pt-10 sm:pb-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Mathematics", href: STUDY_PATHS_HREF },
              { label: "Find your start" },
            ]}
          />
          <Reveal className="mt-6 sm:mt-8" variant="up">
            <div className={`${CARD} max-w-2xl`}>
              <p className="caption font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-600)]">
                Study paths
              </p>
              <h1 className="h-display mt-3 min-w-0 break-words text-[var(--color-ink-cool)]">
                Find the right unit for you
              </h1>
              <p className="mt-4 min-w-0 text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-[1.7] text-[var(--color-ink-cool-muted)]">
                You don&apos;t have to browse all {totalUnits} units blind. Tell us your grade and
                what your class is covering — we&apos;ll drop you into a sensible starting point.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-10 sm:py-14">
        <Container size="md">
          <div className={`${CARD}`}>
            <TopicStartFinder />
          </div>
          <p className="small mt-8 text-center text-[var(--color-ink-muted)]">
            Already know the topic name?{" "}
            <StudyPathsLink className="link font-semibold">Search study paths</StudyPathsLink>.
          </p>
        </Container>
      </section>

      <StudyPathCta />
    </>
  );
}
