import type { WalkthroughBlock } from "../data/units";

/**
 * Renders a topic walkthrough — a short, structured explainer made of
 * headings, paragraphs, ordered steps, worked examples, and callouts.
 */
export default function Walkthrough({ blocks }: { blocks: WalkthroughBlock[] }) {
  return (
    <div className="grid gap-8">
      {blocks.map((block, i) => (
        <div key={i} className="grid gap-3">
          {block.heading && (
            <h3 className="font-display font-semibold text-lg sm:text-xl text-[var(--color-ink)] leading-snug">
              {block.heading}
            </h3>
          )}

          {block.paragraphs?.map((para, j) => (
            <p key={j} className="body text-[var(--color-ink)] leading-relaxed">
              {para}
            </p>
          ))}

          {block.steps && block.steps.length > 0 && (
            <ol className="grid gap-2.5 mt-1">
              {block.steps.map((step, k) => (
                <li key={k} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 w-6 h-6 rounded-full bg-[var(--color-brand-500)] text-white grid place-items-center text-xs font-bold flex-shrink-0"
                  >
                    {k + 1}
                  </span>
                  <span className="text-[var(--color-ink)] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          )}

          {block.example && (
            <figure className="mt-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] overflow-hidden">
              <figcaption className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <span aria-hidden className="text-[var(--color-brand-600)]">
                  <PencilIcon />
                </span>
                <span className="caption font-semibold uppercase tracking-wider text-[var(--color-brand-700)]">
                  Worked example
                </span>
              </figcaption>
              <div className="p-4 grid gap-3">
                <p className="font-semibold text-[var(--color-ink)]">{block.example.problem}</p>
                <ol className="grid gap-1.5">
                  {block.example.solution.map((line, m) => (
                    <li
                      key={m}
                      className="flex items-start gap-2 small text-[var(--color-ink)] leading-relaxed"
                    >
                      <span aria-hidden className="text-[var(--color-brand-500)] mt-0.5">
                        →
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </figure>
          )}

          {block.callout && (
            <div className="mt-1 rounded-md p-3.5 sm:p-4 bg-[var(--color-accent-50)] border border-[var(--color-accent-100)]">
              <p className="caption font-semibold uppercase tracking-wider text-[var(--color-accent-700)]">
                {block.callout.label}
              </p>
              <p className="small text-[var(--color-ink)] mt-1 leading-relaxed">
                {block.callout.text}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}
