import Link from "next/link";
import ColorBand from "./ColorBand";
import Reveal from "./Reveal";
import StudyPathListCard from "./StudyPathListCard";
import { GRADES } from "../data/units";

export default function HomeStudyPathsSection() {
  let units = 0;
  let topics = 0;
  for (const g of GRADES) {
    units += g.units.length;
    for (const u of g.units) {
      topics += u.topics.length;
    }
  }

  return (
    <ColorBand
      id="study-paths"
      variant="brand"
      size="md"
      containerSize="lg"
      reveal={false}
      faintSymbols
      className="scroll-mt-[5.5rem]"
    >
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal variant="fade" className="lg:col-span-4 lg:sticky lg:top-24">
          <p className="caption font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-300)]">
            Study paths · free · no account
          </p>
          <h2
            id="study-paths-heading"
            className="font-display mt-4 text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl"
          >
            Grades 6–8, self-paced
          </h2>

          <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/75 sm:text-base">
            Full grade paths with lessons, videos, practice, and quizzes on every topic. No account
            needed — open a grade and jump to what your class is on.
          </p>

          <p className="mt-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-[var(--color-accent-300)]">
            {GRADES.length} grades · {units} units · {topics} topics
          </p>

          <p className="small mt-6 text-white/70">
            Not sure where to begin?{" "}
            <Link
              href="/mathematics/find-your-start"
              className="font-semibold text-[var(--color-accent-300)] transition-colors hover:text-white"
            >
              Find your start →
            </Link>
          </p>
        </Reveal>

        <Reveal stagger className="grid gap-2 sm:gap-2.5 lg:col-span-8">
          {GRADES.map((g) => {
            const unitCount = g.units.length;
            const topicCount = g.units.reduce((n, u) => n + u.topics.length, 0);
            return (
              <StudyPathListCard
                key={g.slug}
                variant="brand"
                href={`/mathematics/${g.slug}`}
                ariaLabel={`Open ${g.title} Mathematics`}
                gradeGlyph={g.icon}
                title={`${g.title} Mathematics`}
                description={g.short}
                pills={[
                  `${unitCount} unit${unitCount === 1 ? "" : "s"}`,
                  `${topicCount} topic${topicCount === 1 ? "" : "s"}`,
                ]}
              />
            );
          })}
        </Reveal>
      </div>
    </ColorBand>
  );
}
