import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import LessonShell from "../../../../../components/LessonShell";
import TopicLessonContent from "../../../../../components/TopicLessonContent";
import TopicCompleteToggle from "../../../../../components/TopicCompleteToggle";

import { GRADES, getTopic } from "../../../../../data/units";
import { STUDY_PATHS_HREF } from "../../../../../lib/site-paths";
import { buildPageMetadata } from "../../../../../lib/metadata";

type Params = { grade: string; unit: string; topic: string };

export function generateStaticParams() {
  return GRADES.flatMap((g) =>
    g.units.flatMap((u) => u.topics.map((t) => ({ grade: g.slug, unit: u.slug, topic: t.slug })))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { grade, unit, topic } = await params;
  const found = getTopic(grade, unit, topic);
  if (!found) return { title: "Topic not found" };
  return buildPageMetadata({
    title: `${found.topic.title} · ${found.grade.title} Unit ${found.unit.number}`,
    description: found.topic.summary,
    path: `/mathematics/${grade}/${unit}/${topic}`,
  });
}

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { grade, unit, topic } = await params;
  const found = getTopic(grade, unit, topic);
  if (!found) notFound();

  const { grade: g, unit: u, topic: t, index, next } = found;
  const unitHref = `/mathematics/${g.slug}/${u.slug}`;
  const gradeHref = `/mathematics/${g.slug}`;
  const progressItems = u.topics.map((tp) => ({ id: tp.id, label: tp.title }));

  return (
    <LessonShell
      grade={g}
      unit={u}
      topic={t}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Mathematics", href: STUDY_PATHS_HREF },
        { label: g.title, href: gradeHref },
        { label: `Unit ${u.number}`, href: unitHref },
        { label: t.title },
      ]}
      lessonMeta={`Unit ${u.number} · Topic ${index + 1}`}
      title={t.title}
      description={t.summary}
      estimatedMinutes={t.estimatedMinutes}
      nextHref={next ? `${unitHref}/${next.slug}` : undefined}
      nextLabel={next ? `Next: ${next.title}` : undefined}
      backHref={gradeHref}
      backLabel="All units"
      headerActions={
        <>
          <TopicCompleteToggle unitId={u.id} topicId={t.id} items={progressItems} />
          <Link href={unitHref} className="btn btn-ghost btn-sm">
            Unit overview
          </Link>
        </>
      }
    >
      <TopicLessonContent topic={t} />
    </LessonShell>
  );
}
