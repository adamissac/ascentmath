import type { Unit } from "../data/units";
import ResourceLinkCard from "./ResourceLinkCard";
import Card from "./Card";

type Props = {
  unit: Unit;
};

export default function UnitDetailsPanel({ unit: u }: Props) {
  const hasObjectives = (u.masteryOutcomes ?? u.objectives).length > 0;
  const hasVocab = (u.vocabulary?.length ?? 0) > 0;
  const hasStudyGuide = (u.studyGuide?.length ?? 0) > 0;
  const hasExtra = u.externalPractice.length > 0;

  if (!hasObjectives && !hasVocab && !hasStudyGuide && !hasExtra) return null;

  return (
    <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <summary className="cursor-pointer list-none px-5 py-4 font-display text-base font-semibold text-[var(--color-ink)] marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-3">
          About this unit
          <span
            aria-hidden
            className="text-[var(--color-ink-soft)] transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </span>
      </summary>

      <div className="space-y-8 border-t border-[var(--color-border)] px-5 py-5">
        {hasStudyGuide && u.studyGuide && (
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">How to work through it</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              {u.studyGuide.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {hasObjectives && (
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">You should be able to</h3>
            <ul className="mt-3 space-y-2">
              {(u.masteryOutcomes ?? u.objectives).map((o) => (
                <li key={o} className="flex gap-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  <span aria-hidden className="text-[var(--color-brand-500)]">
                    ·
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasVocab && u.vocabulary && (
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">Key words</h3>
            <dl className="mt-3 grid gap-2 sm:grid-cols-2">
              {u.vocabulary.map((v) => (
                <Card key={v.term} className="p-3">
                  <dt className="text-sm font-semibold text-[var(--color-ink)]">{v.term}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-[var(--color-ink-muted)]">{v.meaning}</dd>
                </Card>
              ))}
            </dl>
          </div>
        )}

        {hasExtra && (
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">Extra practice links</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {u.externalPractice.map((r) => (
                <ResourceLinkCard
                  key={r.href}
                  href={r.href}
                  title={r.title}
                  description={r.description}
                  source={r.source}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </details>
  );
}
