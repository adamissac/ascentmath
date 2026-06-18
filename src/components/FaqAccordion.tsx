"use client";

/** Expandable Q&A — light cards on study paths, dark styling on ink bands. */
export default function FaqAccordion({
  question,
  answer,
  variant = "dark",
}: {
  question: string;
  answer: string;
  variant?: "dark" | "light";
}) {
  if (variant === "light") {
    return (
      <details className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)] transition-[border-color,box-shadow] hover:border-[var(--color-brand-200)] hover:shadow-[var(--shadow-card-hover)]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
          <span className="font-semibold text-[var(--color-ink)]">{question}</span>
          <span
            aria-hidden
            className="grid size-7 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] transition-[transform,background,border-color] group-open:rotate-45 group-open:border-[var(--color-brand-200)] group-open:bg-[var(--color-brand-50)] group-open:text-[var(--color-brand-700)]"
          >
            +
          </span>
        </summary>
        <p className="small mt-3 leading-relaxed text-[var(--color-ink-muted)]">{answer}</p>
      </details>
    );
  }

  return (
    <details className="group rounded-lg border border-white/15 bg-white/5 p-5 hover:bg-white/[0.08]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <span className="font-semibold text-white">{question}</span>
        <span
          aria-hidden
          className="shrink-0 text-white/60 transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="small mt-3 leading-relaxed text-white/75">{answer}</p>
    </details>
  );
}
