import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Section from "../../../components/Section";
import CurriculumHero from "../../../components/CurriculumHero";
import Reveal from "../../../components/Reveal";
import StudyPathListCard from "../../../components/StudyPathListCard";
import StudyPathCta from "../../../components/StudyPathCta";
import { GRADES, getGrade } from "../../../data/units";
import { STUDY_PATHS_HREF } from "../../../lib/site-paths";
import { buildPageMetadata } from "../../../lib/metadata";
import StudyPathsLink from "../../../components/StudyPathsLink";

type Params = { grade: string };

export function generateStaticParams() {
  return GRADES.map((g) => ({ grade: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { grade } = await params;
  const g = getGrade(grade);
  if (!g) return { title: "Grade not found" };
  const unitCount = g.units.length;
  const topicCount = g.units.reduce((n, u) => n + u.topics.length, 0);
  return buildPageMetadata({
    title: `${g.title} Mathematics`,
    description: `Free ${g.title} self-paced math study path — ${unitCount} units, ${topicCount} topics with walkthroughs, videos, practice, and quizzes.`,
    path: `/mathematics/${grade}`,
  });
}

export default async function GradeLibrary({ params }: { params: Promise<Params> }) {
  const { grade } = await params;
  const g = getGrade(grade);
  if (!g) notFound();

  const units = g.units;
  const totalTopics = units.reduce((s, u) => s + u.topics.length, 0);
  const firstUnit = units[0];

  const heroStats = [
    { value: units.length, label: "units" },
    { value: totalTopics, label: "topics" },
  ];

  return (
    <>
      <CurriculumHero
        variant="grade"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Mathematics", href: STUDY_PATHS_HREF },
          { label: g.title },
        ]}
        gradeTitle={g.title}
        gradeIcon={g.icon}
        description="Pick a unit and work through the topics — each one has a short lesson, video, practice, and quiz."
        stats={units.length > 0 ? heroStats : []}
        primaryCta={
          firstUnit
            ? {
                href: `/mathematics/${g.slug}/${firstUnit.slug}`,
                label: `Start Unit ${firstUnit.number}`,
              }
            : undefined
        }
        secondaryCta={units.length > 0 ? { href: "#units", label: "See all units" } : undefined}
      />

      <Section id="units" tone="default" size="sm" containerSize="lg" reveal={false}>
        {units.length > 0 ? (
          <Reveal stagger className="grid gap-3">
            {units.map((u, i) => (
              <StudyPathListCard
                key={u.id}
                href={`/mathematics/${g.slug}/${u.slug}`}
                ariaLabel={`Open Unit ${u.number}: ${u.title}`}
                index={i}
                symbol={u.icon}
                title={u.title}
                badge={`Unit ${u.number}`}
                description={u.short}
                pills={[
                  `${u.topics.length} topic${u.topics.length === 1 ? "" : "s"}`,
                  `~${u.estimatedMinutes} min`,
                ]}
              />
            ))}
          </Reveal>
        ) : (
          <Reveal>
            <div className="card p-8 text-center">
              <p className="font-display text-lg font-semibold text-[var(--color-ink)]">Coming soon</p>
              <p className="small mt-2 text-[var(--color-ink-muted)]">
                {g.title} units are being added. Check back shortly.
              </p>
              <StudyPathsLink className="btn btn-outline btn-sm mt-5">Back to all grades</StudyPathsLink>
            </div>
          </Reveal>
        )}
      </Section>

      <StudyPathCta />
    </>
  );
}
