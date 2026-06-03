import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../../components/Container";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FloatingMathCanvas from "../../../components/FloatingMathCanvas";
import TopicStartFinder from "../../../components/TopicStartFinder";
import Reveal from "../../../components/Reveal";
import { GRADES } from "../../../data/units";
import { STUDY_PATHS_HREF } from "../../../lib/site-paths";
import StudyPathsLink from "../../../components/StudyPathsLink";

export const metadata: Metadata = {
  title: "Find your start",
  description:
    "Answer three quick questions to find the right grade, unit, and topic in the free Grades 6–8 study paths.",
};

export default function FindYourStartPage() {
  const totalUnits = GRADES.reduce((s, g) => s + g.units.length, 0);

  return (
    <>
      <section className="hero-surface relative overflow-hidden">
        <FloatingMathCanvas variant="compass" />
        <Container size="lg" className="relative pt-10 pb-12 sm:pb-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Mathematics", href: STUDY_PATHS_HREF },
              { label: "Find your start" },
            ]}
          />
          <Reveal className="mt-6 w-full min-w-0 max-w-2xl" variant="up">
            <h1 className="h-display min-w-0 break-words">Find the right unit for you.</h1>
            <p className="lede mt-4 min-w-0">
              You don&apos;t have to browse all {totalUnits} units blind. Tell us your grade and what your
              class is covering - we&apos;ll drop you into a sensible starting point.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[var(--color-bg)] py-10 sm:py-14">
        <Container size="md">
          <TopicStartFinder />
          <p className="small text-[var(--color-ink-muted)] mt-8 text-center">
            Already know the topic name?{" "}
            <StudyPathsLink className="link font-semibold">
              Search study paths
            </StudyPathsLink>
            .
          </p>
        </Container>
      </section>

    </>
  );
}
