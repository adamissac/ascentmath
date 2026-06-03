import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import Section from "../../../../../components/Section";
import Badge from "../../../../../components/Badge";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import VideoEmbed from "../../../../../components/VideoEmbed";
import WorksheetCard from "../../../../../components/WorksheetCard";
import ResourceLinkCard from "../../../../../components/ResourceLinkCard";
import Quiz from "../../../../../components/Quiz";
import TopicExercises from "../../../../../components/TopicExercises";
import Walkthrough from "../../../../../components/Walkthrough";
import TopicCompleteToggle from "../../../../../components/TopicCompleteToggle";
import ColorBand from "../../../../../components/ColorBand";
import DarkAccordionSection from "../../../../../components/DarkAccordionSection";
import { topicAccordion } from "../../../../../data/dark-sections";
import Reveal from "../../../../../components/Reveal";
import MathBackdrop from "../../../../../components/MathBackdrop";
import Container from "../../../../../components/Container";

import { GRADES, getTopic } from "../../../../../data/units";
import { STUDY_PATHS_HREF } from "../../../../../lib/site-paths";

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
  return {
    title: `${found.topic.title} · ${found.grade.title} Unit ${found.unit.number}`,
    description: found.topic.summary,
  };
}

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { grade, unit, topic } = await params;
  const found = getTopic(grade, unit, topic);
  if (!found) notFound();

  const { grade: g, unit: u, topic: t, index, prev, next } = found;
  const total = u.topics.length;
  const unitHref = `/mathematics/${g.slug}/${u.slug}`;

  const progressItems = u.topics.map((tp) => ({ id: tp.id, label: tp.title }));
  const hasExercises = (t.exercises?.length ?? 0) > 0;
  const hasPractice =
    hasExercises || Boolean(t.worksheet) || (t.practiceLinks?.length ?? 0) > 0;

  return (
    <>
      {/* HERO */}
      <section className="hero-surface relative overflow-hidden">
        <MathBackdrop variant="paper" density="dense" fadeEdges />
        <Container size="lg" className="relative pt-10 pb-12 sm:pb-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Mathematics", href: STUDY_PATHS_HREF },
              { label: g.title, href: `/mathematics/${g.slug}` },
              { label: `Unit ${u.number}`, href: unitHref },
              { label: t.title },
            ]}
          />

          <Reveal className="mt-6 max-w-3xl" variant="up">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge tone="brand">{g.title} · Unit {u.number}</Badge>
              <span className="caption text-[var(--color-ink-muted)]">
                Topic {index + 1} of {total}
              </span>
              <span className="caption text-[var(--color-ink-muted)]">~{t.estimatedMinutes} min</span>
            </div>

            <h1 className="h-display mt-5 min-w-0 break-words">{t.title}</h1>

            <p className="lede mt-5">{t.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <TopicCompleteToggle unitId={u.id} topicId={t.id} items={progressItems} />
              <Link href={unitHref} className="btn btn-ghost btn-sm">
                All topics in this unit
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* STEP 1 - WALKTHROUGH */}
      <Section tone="default" size="sm" containerSize="lg" decorated="paper" decoratedDensity="medium" reveal={false}>
        <section aria-labelledby="learn-h">
          <Reveal>
            <span className="eyebrow">Step 1 · Learn</span>
            <h2 id="learn-h" className="h2 mt-2">The lesson</h2>
            <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-[#4a4a6a]">
              Read each part below, then watch the video, practice, and take the quick quiz. About{" "}
              <strong className="font-semibold text-[#1a1a2e]">{t.estimatedMinutes} minutes</strong>{" "}
              if you do everything.
            </p>
          </Reveal>
          <Reveal className="mt-8">
            <Walkthrough blocks={t.walkthrough} topicTitle={t.title} />
          </Reveal>
        </section>
      </Section>

      {/* STEP 2 - VIDEO */}
      <Section tone="muted" size="sm" containerSize="lg" decorated="muted" decoratedDensity="medium" reveal={false}>
        <section aria-labelledby="watch-h">
          <Reveal>
            <span className="eyebrow">Step 2 · Watch</span>
            <h2 id="watch-h" className="h2 mt-2">Video walkthrough</h2>
            <p className="lede mt-2 max-w-2xl">
              {t.extraVideo
                ? "Watch the main video, then check the second take if you want another explanation."
                : "A short video that walks through this topic."}
            </p>
          </Reveal>
          <Reveal
            stagger
            className={[
              "mt-8 grid gap-4 justify-items-center",
              t.extraVideo
                ? "sm:grid-cols-2 sm:max-w-3xl sm:mx-auto"
                : "max-w-md mx-auto w-full",
            ].join(" ")}
          >
            <VideoEmbed
              size="compact"
              videoId={t.video.videoId}
              title={t.video.title}
              source={t.video.source}
              description={t.video.description}
              className="w-full"
            />
            {t.extraVideo && (
              <VideoEmbed
                size="compact"
                videoId={t.extraVideo.videoId}
                title={t.extraVideo.title}
                source={t.extraVideo.source}
                description={t.extraVideo.description}
                className="w-full"
              />
            )}
          </Reveal>
        </section>
      </Section>

      {/* STEP 3 - PRACTICE */}
      {hasPractice && (
        <Section tone="muted" size="sm" containerSize="lg" decorated="muted" decoratedDensity="medium" reveal={false}>
          <section aria-labelledby="practice-h">
            <Reveal>
              <span className="eyebrow">Step 3 · Practice</span>
              <h2 id="practice-h" className="h2 mt-2">Practice</h2>
              <p className="lede mt-2 max-w-2xl">
                Work these problems on paper first. Use hints only after you try; open solutions to
                check your steps.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-8">
              {hasExercises && t.exercises && (
                <Reveal variant="up">
                  <TopicExercises title={t.title} exercises={t.exercises} />
                </Reveal>
              )}

              {t.worksheet && (
                <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <WorksheetCard {...t.worksheet} />
                </Reveal>
              )}

              {t.practiceLinks && t.practiceLinks.length > 0 && (
                <Reveal stagger className="grid sm:grid-cols-2 gap-4">
                  {t.practiceLinks.map((r) => (
                    <ResourceLinkCard
                      key={r.href}
                      href={r.href}
                      title={r.title}
                      description={r.description}
                      source={r.source}
                    />
                  ))}
                </Reveal>
              )}
            </div>
          </section>
        </Section>
      )}

      {/* STEP 4 - QUIZ */}
      {t.quiz.length > 0 && (
        <ColorBand variant="dark" containerSize="lg" reveal={false}>
          <section aria-labelledby="quiz-h">
            <Reveal>
              <span className="caption font-semibold tracking-wider uppercase text-[var(--color-brand-300)]">
                Step 4 · Check
              </span>
              <h2 id="quiz-h" className="font-display font-bold text-2xl sm:text-3xl mt-2 text-white">
                Quick check
              </h2>
              <p className="mt-2 max-w-xl text-white/75 leading-relaxed">
                {t.quiz.length} questions to make sure this topic stuck. Aim for at least 80% before
                moving on, retake as many times as you need.
              </p>
            </Reveal>
            <div className="mt-8">
              <Quiz title={t.title} questions={t.quiz} />
            </div>
          </section>
        </ColorBand>
      )}

      <DarkAccordionSection
        eyebrow="Topic help"
        title="Stuck or unsure what to do next?"
        items={topicAccordion(t.title)}
        containerSize="lg"
        lightSectionBelow={
          <Section tone="muted" size="sm" containerSize="lg" decorated="muted" decoratedDensity="medium">
            <div className="grid sm:grid-cols-2 gap-4">
              {prev ? (
                <TopicNavCard
                  direction="prev"
                  label={`Topic ${index} of ${total}`}
                  title={prev.title}
                  href={`${unitHref}/${prev.slug}`}
                />
              ) : (
                <Link href={unitHref} className="card card-interactive p-6 flex items-center gap-3 no-underline">
                  <span aria-hidden>←</span>
                  <span>
                    <span className="caption text-[var(--color-ink-muted)] uppercase tracking-wider">Back to</span>
                    <span className="block font-semibold text-[var(--color-ink)]">Unit {u.number} overview</span>
                  </span>
                </Link>
              )}

              {next ? (
                <TopicNavCard
                  direction="next"
                  label={`Topic ${index + 2} of ${total}`}
                  title={next.title}
                  href={`${unitHref}/${next.slug}`}
                />
              ) : (
                <Link
                  href={unitHref}
                  className="card card-interactive p-6 flex items-center gap-3 no-underline sm:flex-row-reverse sm:text-right"
                >
                  <span aria-hidden>→</span>
                  <span className="flex-1">
                    <span className="caption text-[var(--color-ink-muted)] uppercase tracking-wider">
                      Finished the unit?
                    </span>
                    <span className="block font-semibold text-[var(--color-ink)]">Back to Unit {u.number}</span>
                  </span>
                </Link>
              )}
            </div>
          </Section>
        }
      />
    </>
  );
}

function TopicNavCard({
  direction,
  label,
  title,
  href,
}: {
  direction: "prev" | "next";
  label: string;
  title: string;
  href: string;
}) {
  const arrow = direction === "prev" ? "←" : "→";
  return (
    <Link
      href={href}
      className={`card card-interactive p-6 flex items-center gap-4 no-underline ${
        direction === "next" ? "sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <span aria-hidden className="text-[var(--color-ink-soft)] text-xl">{arrow}</span>
      <span className="flex-1">
        <span className="caption text-[var(--color-ink-muted)] uppercase tracking-wider">
          {direction === "prev" ? "Previous" : "Next up"} · {label}
        </span>
        <span className="block font-semibold text-[var(--color-ink)] mt-0.5">{title}</span>
      </span>
    </Link>
  );
}
