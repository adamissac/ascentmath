"use client";

import ProgressBar from "./ProgressBar";
import { useUnitProgress, type ProgressItem } from "../hooks/useUnitProgress";

type Props = {
  unitId: string;
  unitTitle: string;
  items: ProgressItem[];
};

export default function UnitProgressPanel({ unitId, unitTitle, items }: Props) {
  const { hydrated, percent, completedCount, total, toggle, reset, isComplete } =
    useUnitProgress(unitId, items);

  return (
    <div
      className="rounded-2xl border border-[rgba(26,26,46,0.08)] bg-white/90 p-6 shadow-[0_2px_12px_rgba(26,26,46,0.04)]"
      aria-label={`Progress for ${unitTitle}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="h4">Your progress</h3>
        {hydrated && completedCount > 0 && (
          <button
            type="button"
            onClick={reset}
            className="caption text-[var(--color-ink-muted)] hover:text-[var(--color-danger)] underline-offset-2 hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      <div className="mt-4">
        <ProgressBar
          value={percent}
          label={`${completedCount} of ${total} done`}
          size="sm"
        />
      </div>

      <ul className="mt-5 flex flex-col gap-1.5" role="list">
        {items.map((item) => {
          const done = hydrated && isComplete(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className={[
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                  done
                    ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
                    : "hover:bg-[var(--color-surface-2)] text-[var(--color-ink)]",
                ].join(" ")}
                aria-pressed={done}
              >
                <span
                  aria-hidden
                  className={[
                    "w-5 h-5 grid place-items-center rounded-full border transition-colors flex-shrink-0",
                    done
                      ? "bg-[var(--color-brand-500)] border-[var(--color-brand-500)] text-white"
                      : "border-[var(--color-border-strong)] text-transparent",
                  ].join(" ")}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className={`small ${done ? "line-through opacity-80" : ""}`}>
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {hydrated && percent === 100 && (
        <div className="mt-5 p-3 rounded-md bg-[var(--color-brand-50)] border border-[var(--color-brand-100)]">
          <p className="small font-semibold text-[var(--color-brand-700)]">
            Nice work - you finished {unitTitle}!
          </p>
          <p className="caption text-[var(--color-brand-600)] mt-1">
            Try the quiz at the bottom of the page to lock it in.
          </p>
        </div>
      )}
    </div>
  );
}
