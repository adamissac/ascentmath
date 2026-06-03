"use client";

/** Expandable Q&A card for dark (ink) bands — matches the book page FAQ style. */
export default function FaqAccordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
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
