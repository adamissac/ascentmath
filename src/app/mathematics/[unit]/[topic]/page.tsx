import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import Section from "../../../../components/Section";
import Badge from "../../../../components/Badge";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import VideoEmbed from "../../../../components/VideoEmbed";
import WorksheetCard from "../../../../components/WorksheetCard";
import ResourceLinkCard from "../../../../components/ResourceLinkCard";
import Quiz from "../../../../components/Quiz";
import Walkthrough from "../../../../components/Walkthrough";
import TopicCompleteToggle from "../../../../components/TopicCompleteToggle";
import ColorBand from "../../../../components/ColorBand";
import Reveal from "../../../../components/Reveal";
import MathBackdrop from "../../../../components/MathBackdrop";
import Container from "../../../../components/Container";

import { UNITS, getTopic } from "../../../../data/units";

type Params = { unit: string; topic: string };

export function generateStaticParams() {
  return UNITS.flatMap((u) => u.topics.map((t) => ({ unit: u.slug, topic: t.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { unit, topic } = await params;
  const found = getTopic(unit, topic);
  if (!found) return { title: "Topic not found" };
  return {
    title: `${found.topic.title} · Unit ${found.unit.number}`,
    description: found.topic.summary,
  };
}

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { unit, topic } = await params;
  const found = getTopic(unit, topic);
  if (!found) notFound();

  const { unit: u, topic: t, index, prev, next } = found;
  const total = u.topics.length;

  const progressItems = u.topics.map((tp) => ({ id: tp.id, label: tp.title }));
  const hasPractice = Boolean(t.worksheet) || (t.practiceLinks?.length ?? 0) > 0;

  return (
    <>
      {/* HERO */}
      <section className="hero-surface relative overflow-hidden">
        <MathBackdrop variant="paper" density="dense" fadeEdges />
        <Container size="lg" className="relative pt-10 pb-12 sm:pb-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Mathematics", href: "/mathematics" },
              { label: `Unit ${u.number}`, href: `/mathematics/${u.slug}` },
              { label: t.title },
            ]}
          />

          <Reveal className="mt-6 max-w-3xl" variant="up">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge tone="brand">Unit {u.number}</Badge>
              <span className="caption text-[var(--color-ink-muted)]">
                Topic {index + 1} of {total}
              </span>
              <span className="caption text-[var(--color-ink-muted)]">~{t.estimatedMinutes} min</span>
            </div>

            <h1 className="h-display mt-5 min-w-0 break-words">{t.title}</h1>

            <p className="lede mt-5">{t.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <TopicCompleteToggle unitId={u.id} topicId={t.id} items={progressItems} />
              <Link href={`/mathematics/${u.slug}`} className="btn btn-ghost btn-sm">
                All topics in this unit
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* STEP 1 — WALKTHROUGH */}
      <Section tone="default" size="sm" containerSize="lg" decorated="paper" decoratedDensity="medium" reveal={false}>
        <section aria-labelledby="learn-h">
          <Reveal>
            <span className="eyebrow">Step 1 · Learn</span>
            <h2 id="learn-h" className="h2 mt-2">Walkthrough</h2>
            <p className="lede mt-2 max-w-2xl">
              Read this first — it covers the idea in plain language with a worked example.
            </p>
          </Reveal>
          <Reveal className="mt-8">
            <Walkthrough blocks={t.walkthrough} />
          </Reveal>
        </section>
      </Section>

      {/* STEP 2 — VIDEO */}
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
          <Reveal stagger className={`mt-8 grid gap-5 ${t.extraVideo ? "sm:grid-cols-2" : "sm:max-w-2xl"}`}>
            <VideoEmbed
              videoId={t.video.videoId}
              title={t.video.title}
              source={t.video.source}
              description={t.video.description}
            />
            {t.extraVideo && (
              <VideoEmbed
                videoId={t.extraVideo.videoId}
                title={t.extraVideo.title}
                source={t.extraVideo.source}
                description={t.extraVideo.description}
              />
            )}
          </Reveal>
        </section>
      </Section>

      {/* STEP 3 — PRACTICE */}
      {hasPractice && (
        <Section tone="muted" size="sm" containerSize="lg" decorated="muted" decoratedDensity="medium" reveal={false}>
          <section aria-labelledby="practice-h">
            <Reveal>
              <span className="eyebrow">Step 3 · Practice</span>
              <h2 id="practice-h" className="h2 mt-2">Practice</h2>
              <p className="lede mt-2 max-w-2xl">
                Try a worksheet or work through some problems before the quiz.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-8">
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

      {/* STEP 4 — QUIZ */}
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
                A couple of questions to make sure this topic stuck. Retake as many times as you want.
              </p>
            </Reveal>
            <div className="mt-8">
              <Quiz title={t.title} questions={t.quiz} />
            </div>
          </section>
        </ColorBand>
      )}

      {/* PREV / NEXT TOPIC */}
      <Section tone="muted" size="sm" containerSize="lg" decorated="muted" decoratedDensity="medium">
        <div className="grid sm:grid-cols-2 gap-4">
          {prev ? (
            <TopicNavCard
              direction="prev"
              label={`Topic ${index} of ${total}`}
              title={prev.title}
              href={`/mathematics/${u.slug}/${prev.slug}`}
            />
          ) : (
            <Link href={`/mathematics/${u.slug}`} className="card card-interactive p-6 flex items-center gap-3 no-underline">
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
              href={`/mathematics/${u.slug}/${next.slug}`}
            />
          ) : (
            <Link href={`/mathematics/${u.slug}`} className="card card-interactive p-6 flex items-center gap-3 no-underline sm:flex-row-reverse sm:text-right">
              <span aria-hidden>→</span>
              <span className="flex-1">
                <span className="caption text-[var(--color-ink-muted)] uppercase tracking-wider">Finished the unit?</span>
                <span className="block font-semibold text-[var(--color-ink)]">Back to Unit {u.number}</span>
              </span>
            </Link>
          )}
        </div>
      </Section>
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
