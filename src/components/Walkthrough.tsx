"use client";

import type { WalkthroughBlock } from "../data/units";

const PART_COLORS = [
  { badge: "bg-[#E8EEFF] text-[var(--color-brand-500)]", stripe: "border-[var(--color-brand-500)]" },
  { badge: "bg-[var(--color-accent-50)] text-[#C45A10]", stripe: "border-[var(--color-accent-500)]" },
  { badge: "bg-[#E8F5EE] text-[#1B7A4A]", stripe: "border-[#3D9B6A]" },
  { badge: "bg-[#F3E8FF] text-[#6B3FA0]", stripe: "border-[#9B6FD4]" },
] as const;

function partColor(index: number) {
  return PART_COLORS[index % PART_COLORS.length];
}

function isStudyPlanBlock(block: WalkthroughBlock) {
  const h = block.heading?.toLowerCase() ?? "";
  return h.includes("how to study") || h.includes("study this topic");
}

function isChallengeBlock(block: WalkthroughBlock) {
  const h = block.heading?.toLowerCase() ?? "";
  return h.includes("try it on your own") || h.includes("try it yourself");
}

function isCalloutOnlyBlock(block: WalkthroughBlock) {
  return (
    Boolean(block.callout) &&
    !block.heading &&
    !(block.paragraphs?.length ?? 0) &&
    !(block.steps?.length ?? 0) &&
    !block.example
  );
}

function friendlyCalloutLabel(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("tip")) return "Good to know";
  if (lower.includes("mistake") || lower.includes("watch")) return "Watch out";
  if (lower.includes("class")) return "In class";
  if (lower.includes("remember")) return "Remember";
  return label;
}

type Props = {
  blocks: WalkthroughBlock[];
  topicTitle?: string;
};

/**
 * Topic lesson — short sections middle-schoolers can scan: one idea per card,
 * plain labels, and clear “try this” / “let’s solve one” blocks.
 */
export default function Walkthrough({ blocks, topicTitle }: Props) {
  const lessonBlocks = blocks.filter(
    (b) => !isStudyPlanBlock(b) && !isChallengeBlock(b) && !isCalloutOnlyBlock(b)
  );
  const studyBlock = blocks.find(isStudyPlanBlock);
  const challengeBlock = blocks.find(isChallengeBlock);
  const extraCallouts = blocks.filter(isCalloutOnlyBlock);

  return (
    <div className="grid gap-5 sm:gap-6">
      <div className="rounded-2xl border-2 border-dashed border-[#2A4BCB]/25 bg-[#F7F9FF] px-5 py-4 sm:px-6 sm:py-5">
        <p className="font-display text-lg font-bold leading-snug text-[var(--color-ink-cool)] sm:text-xl">
          {topicTitle ? (
            <>
              What you&apos;re learning: {topicTitle}
            </>
          ) : (
            "Start here"
          )}
        </p>
        <p className="mt-2 text-base leading-relaxed text-[var(--color-ink-cool-muted)]">
          Read each <strong className="font-semibold text-[var(--color-ink-cool)]">Part</strong> in order. When you
          see <strong className="font-semibold text-[var(--color-ink-cool)]">Let&apos;s solve one</strong>, follow
          every step before moving on.
        </p>
      </div>

      {lessonBlocks.map((block, i) => (
        <LessonPart key={i} block={block} index={i} />
      ))}

      {studyBlock && <StudyPlanCard block={studyBlock} />}
      {challengeBlock && <ChallengeCard block={challengeBlock} />}
      {extraCallouts.map((b, i) =>
        b.callout ? (
          <FriendlyCallout key={i} label={b.callout.label} text={b.callout.text} />
        ) : null
      )}
    </div>
  );
}

function LessonPart({ block, index }: { block: WalkthroughBlock; index: number }) {
  const color = partColor(index);

  return (
    <article
      className={[
        "rounded-2xl border border-[rgba(26,26,46,0.1)] bg-white p-5 shadow-[0_2px_10px_rgba(26,26,46,0.06)] sm:p-6",
        "border-l-4",
        color.stripe,
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={[
            "inline-flex rounded-full px-3 py-1 font-display text-sm font-bold",
            color.badge,
          ].join(" ")}
        >
          Part {index + 1}
        </span>
        {block.heading && (
          <h3 className="min-w-0 flex-1 font-display text-xl font-bold leading-snug text-[var(--color-ink-cool)] sm:text-[1.35rem]">
            {block.heading}
          </h3>
        )}
      </div>

      {block.paragraphs && block.paragraphs.length > 0 && (
        <div className="mt-4 grid gap-3">
          {block.paragraphs.map((para, j) => (
            <p
              key={j}
              className="text-[1.0625rem] leading-[1.8] text-[var(--color-ink-cool)] [&:not(:first-child)]:rounded-xl [&:not(:first-child)]:bg-[var(--color-bg)] [&:not(:first-child)]:px-4 [&:not(:first-child)]:py-3"
            >
              {para}
            </p>
          ))}
        </div>
      )}

      {block.steps && block.steps.length > 0 && (
        <div className="mt-5">
          <p className="mb-3 font-display text-base font-bold text-[var(--color-brand-500)]">Do this:</p>
          <ol className="grid gap-2.5">
            {block.steps.map((step, k) => (
              <li
                key={k}
                className="flex items-start gap-3 rounded-xl bg-[var(--color-bg)] px-4 py-3.5 border border-[rgba(26,26,46,0.06)]"
              >
                <span
                  aria-hidden
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--color-brand-500)] font-display text-sm font-bold text-white"
                >
                  {k + 1}
                </span>
                <span className="pt-0.5 text-[1.0625rem] leading-relaxed text-[var(--color-ink-cool)]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {block.example && <WorkedExample example={block.example} />}
      {block.callout && <FriendlyCallout label={block.callout.label} text={block.callout.text} />}
    </article>
  );
}

function WorkedExample({
  example,
}: {
  example: NonNullable<WalkthroughBlock["example"]>;
}) {
  return (
    <figure className="mt-5 overflow-hidden rounded-2xl border-2 border-[#2A4BCB]/20 bg-[#F7F9FF]">
      <figcaption className="flex items-center gap-2 bg-[var(--color-brand-500)] px-4 py-2.5 text-white">
        <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-white/20">
          <LightbulbIcon />
        </span>
        <span className="font-display text-base font-bold">Let&apos;s solve one together</span>
      </figcaption>
      <div className="grid gap-4 p-4 sm:p-5">
        <div className="rounded-xl bg-white px-4 py-3.5 shadow-sm border border-[rgba(26,26,46,0.08)]">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-ink-cool-soft)]">The problem</p>
          <p className="mt-1.5 font-display text-lg font-bold leading-snug text-[var(--color-ink-cool)]">
            {example.problem}
          </p>
        </div>
        <div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-[var(--color-brand-500)]">
            How to solve it
          </p>
          <ol className="grid gap-2">
            {example.solution.map((line, m) => (
              <li
                key={m}
                className="flex items-start gap-3 rounded-lg bg-white/80 px-3 py-2.5 text-[1rem] leading-relaxed text-[var(--color-ink-cool)]"
              >
                <span
                  aria-hidden
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[var(--color-brand-500)] font-display text-xs font-bold text-white"
                >
                  {m + 1}
                </span>
                <span className="pt-0.5">{line}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </figure>
  );
}

function FriendlyCallout({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-5 flex gap-3 rounded-2xl bg-[#FFF8F0] px-4 py-4 ring-2 ring-[#F47B16]/20 sm:px-5">
      <span
        aria-hidden
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-accent-500)] text-white"
      >
        <TipIcon />
      </span>
      <div className="min-w-0">
        <p className="font-display text-base font-bold text-[#C45A10]">{friendlyCalloutLabel(label)}</p>
        <p className="mt-1.5 text-[1.0625rem] leading-relaxed text-[var(--color-ink-cool)]">{text}</p>
      </div>
    </div>
  );
}

function StudyPlanCard({ block }: { block: WalkthroughBlock }) {
  return (
    <article className="rounded-2xl border-2 border-[#3D9B6A]/30 bg-[#E8F5EE] p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#3D9B6A] text-white"
        >
          <ChecklistIcon />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold text-[#1B7A4A] sm:text-xl">
            Your game plan on this site
          </p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-[#2d5c42]">
            Do these four things in order. Same steps on every topic.
          </p>
          {block.steps && (
            <ol className="mt-4 grid gap-2">
              {block.steps.map((step, k) => (
                <li
                  key={k}
                  className="flex items-start gap-2.5 rounded-xl bg-white/70 px-3.5 py-3 text-[1rem] leading-relaxed text-[var(--color-ink-cool)]"
                >
                  <span className="font-display font-bold text-[#3D9B6A]">{k + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </article>
  );
}

function ChallengeCard({ block }: { block: WalkthroughBlock }) {
  return (
    <article className="rounded-2xl border-2 border-[#F47B16]/35 bg-[var(--color-accent-50)] p-5 sm:p-6">
      <p className="font-display text-lg font-bold text-[#C45A10] sm:text-xl">
        Challenge yourself
      </p>
      {block.paragraphs?.map((para, j) => (
        <p key={j} className="mt-3 text-[1.0625rem] leading-[1.75] text-[var(--color-ink-cool)]">
          {para}
        </p>
      ))}
      {block.callout && (
        <div className="mt-4">
          <FriendlyCallout label={block.callout.label} text={block.callout.text} />
        </div>
      )}
    </article>
  );
}

function LightbulbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2z" />
    </svg>
  );
}

function TipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17H8v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
      <path d="M9 21h6" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}
