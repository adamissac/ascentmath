"use client";

import { useUnitProgress, type ProgressItem } from "../hooks/useUnitProgress";

/**
 * Lets a learner mark a single topic complete. Progress is stored per unit,
 * so the unit's topic index reflects this immediately.
 */
export default function TopicCompleteToggle({
  unitId,
  topicId,
  items,
}: {
  unitId: string;
  topicId: string;
  items: ProgressItem[];
}) {
  const { hydrated, toggle, isComplete } = useUnitProgress(unitId, items);
  const done = hydrated && isComplete(topicId);

  return (
    <button
      type="button"
      onClick={() => toggle(topicId)}
      aria-pressed={done}
      className={[
        "inline-flex items-center gap-2 min-h-[44px] px-4 rounded-lg font-semibold text-sm transition-colors",
        done
          ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-200)]"
          : "bg-[var(--color-brand-600)] text-white border border-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)]",
      ].join(" ")}
    >
      <span
        aria-hidden
        className={[
          "w-5 h-5 grid place-items-center rounded-full border transition-colors flex-shrink-0",
          done
            ? "bg-[var(--color-brand-500)] border-[var(--color-brand-500)] text-white"
            : "border-white/60 text-transparent",
        ].join(" ")}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {done ? "Topic complete" : "Mark topic complete"}
    </button>
  );
}
