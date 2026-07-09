import type { Metadata } from "next";
import Link from "next/link";
import Container from "../../components/Container";
import Breadcrumbs from "../../components/Breadcrumbs";
import StudyPathListCard from "../../components/StudyPathListCard";
import StudyPathsLink from "../../components/StudyPathsLink";
import StudyPathCta from "../../components/StudyPathCta";
import Reveal from "../../components/Reveal";
import JsonLdScript from "../../components/JsonLdScript";
import { GRADES } from "../../data/units";
import { buildBreadcrumbJsonLd } from "../../lib/json-ld";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Grades 6-8 Math Study Paths — Lessons, Videos & Quizzes",
  description:
    "Free self-paced Grades 6-8 math study paths with lessons, videos, practice, and quizzes. No account needed — open a grade and jump to what your class is on.",
  path: "/mathematics",
});

export default function MathematicsIndexPage() {
  const totalUnits = GRADES.reduce((s, g) => s + g.units.length, 0);
  const totalTopics = GRADES.reduce(
    (s, g) => s + g.units.reduce((n, u) => n + u.topics.length, 0),
    0
  );

  return (
    <>
      <JsonLdScript
        data={[
          buildBreadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Mathematics" },
          ]),
        ]}
      />

      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <Container size="lg" className="pt-8 pb-10 sm:pt-10 sm:pb-12">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Mathematics" }]} />
          <Reveal className="mt-6 sm:mt-8" variant="up">
            <p className="eyebrow">Free study paths</p>
            <h1 className="h-display mt-2 min-w-0 break-words text-[var(--color-ink-cool)]">
              Grades 6-8 mathematics
            </h1>
            <p className="lede mt-3">
              Pick a grade below to see its units and topics. {totalUnits} units, {totalTopics}{" "}
              topics total - every lesson, video, and quiz is free, with no account required.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[var(--color-bg)] py-10 sm:py-14">
        <Container size="lg">
          <Reveal stagger className="grid gap-3">
            {GRADES.map((g, i) => {
              const topicCount = g.units.reduce((n, u) => n + u.topics.length, 0);
              return (
                <StudyPathListCard
                  key={g.slug}
                  href={`/mathematics/${g.slug}`}
                  ariaLabel={`Open ${g.title} mathematics`}
                  index={i}
                  gradeGlyph={g.icon}
                  title={g.title}
                  description={g.description}
                  pills={[
                    `${g.units.length} unit${g.units.length === 1 ? "" : "s"}`,
                    `${topicCount} topic${topicCount === 1 ? "" : "s"}`,
                  ]}
                />
              );
            })}
          </Reveal>

          <Reveal variant="fade" delay={80} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            <StudyPathsLink className="link small">Why these study paths are free →</StudyPathsLink>
            <Link href="/mathematics/find-your-start" className="link small">
              Not sure where to start? →
            </Link>
            <Link href="/mathematics/curriculum-frameworks" className="link small">
              GADOE curriculum frameworks →
            </Link>
          </Reveal>
        </Container>
      </section>

      <StudyPathCta />
    </>
  );
}
