"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { GRADES } from "../data/units";

type Step = 1 | 2 | 3;

const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-base text-[var(--color-ink)] shadow-sm focus:border-[var(--color-brand-400)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]/20";

export default function TopicStartFinder() {
  const [step, setStep] = useState<Step>(1);
  const [gradeSlug, setGradeSlug] = useState<string | null>(null);
  const [unitSlug, setUnitSlug] = useState<string | null>(null);

  const grade = useMemo(() => GRADES.find((g) => g.slug === gradeSlug), [gradeSlug]);
  const unit = useMemo(
    () => grade?.units.find((u) => u.slug === unitSlug),
    [grade, unitSlug],
  );
  const firstTopic = unit?.topics[0];

  const pickGrade = useCallback((slug: string) => {
    setGradeSlug(slug);
    setUnitSlug(null);
    setStep(2);
  }, []);

  const pickUnit = useCallback((slug: string) => {
    setUnitSlug(slug);
    setStep(3);
  }, []);

  const reset = useCallback(() => {
    setStep(1);
    setGradeSlug(null);
    setUnitSlug(null);
  }, []);

  return (
    <div className="find-start-wizard">
      <div className="flex items-center justify-between gap-3">
        <p className="caption font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-600)]">
          3 quick steps
        </p>
        {step > 1 ? (
          <button type="button" onClick={reset} className="caption font-semibold text-[var(--color-brand-600)] hover:underline">
            Start over
          </button>
        ) : null}
      </div>

      <div className="mt-4 flex gap-1.5" aria-label="Progress" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step}>
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={[
              "h-1 flex-1 rounded-full transition-colors duration-150",
              step >= n ? "bg-[var(--color-brand-500)]" : "bg-[var(--color-border)]",
            ].join(" ")}
          />
        ))}
      </div>

      {grade && step > 1 ? (
        <p className="small mt-4 text-[var(--color-ink-muted)]">
          <span className="font-semibold text-[var(--color-ink)]">{grade.title}</span>
          {unit && step === 3 ? (
            <>
              {" "}
              · Unit {unit.number}: {unit.title}
            </>
          ) : null}
        </p>
      ) : null}

      {step === 1 && (
        <fieldset className="mt-6 border-0 p-0">
          <legend className="font-display text-lg font-bold text-[var(--color-ink-cool)]">
            What grade are you in?
          </legend>
          <div className="mt-4 grid grid-cols-1 gap-2 min-[380px]:grid-cols-3 sm:gap-3">
            {GRADES.map((g) => (
              <button
                key={g.slug}
                type="button"
                onClick={() => pickGrade(g.slug)}
                className={[
                  "min-h-[44px] rounded-xl border px-3 py-3 text-center transition-colors duration-150",
                  gradeSlug === g.slug
                    ? "border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-brand-200)] hover:bg-[var(--color-brand-50)]",
                ].join(" ")}
              >
                <span className="block font-display text-lg font-bold">{g.title.replace("Grade ", "")}</span>
                <span className="mt-0.5 block text-[0.6875rem] font-medium text-[var(--color-ink-muted)]">
                  {g.units.length} units
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && grade && (
        <div className="mt-6">
          <label htmlFor="find-start-unit" className="font-display text-lg font-bold text-[var(--color-ink-cool)]">
            What is your class working on?
          </label>
          <p className="small mt-2 text-[var(--color-ink-muted)]">
            Pick the unit that best matches your class right now.
          </p>
          <select
            id="find-start-unit"
            value={unitSlug ?? ""}
            onChange={(e) => {
              if (e.target.value) pickUnit(e.target.value);
            }}
            className={`${inputClass} mt-4`}
          >
            <option value="" disabled>
              Choose a unit…
            </option>
            {grade.units.map((u) => (
              <option key={u.slug} value={u.slug}>
                Unit {u.number}: {u.title}
              </option>
            ))}
          </select>
          {unitSlug && unit ? (
            <p className="small mt-3 leading-relaxed text-[var(--color-ink-muted)]">{unit.short}</p>
          ) : null}
          <button type="button" onClick={() => setStep(1)} className="btn btn-ghost btn-sm mt-5">
            ← Change grade
          </button>
        </div>
      )}

      {step === 3 && grade && unit && (
        <div className="mt-6">
          <h2 className="font-display text-lg font-bold text-[var(--color-ink-cool)]">
            Your starting point
          </h2>
          <p className="small mt-2 text-[var(--color-ink-muted)]">
            Jump into the first topic, or open the full unit to browse every lesson.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {firstTopic ? (
              <Link
                href={`/mathematics/${grade.slug}/${unit.slug}/${firstTopic.slug}`}
                className="find-start-result find-start-result--primary no-underline"
              >
                <span className="caption font-semibold uppercase tracking-[0.12em] text-[var(--color-brand-600)]">
                  Start here
                </span>
                <span className="mt-2 block font-semibold text-[var(--color-ink)]">{firstTopic.title}</span>
                <span className="mt-1 block small text-[var(--color-ink-muted)]">{firstTopic.summary}</span>
              </Link>
            ) : null}
            <Link
              href={`/mathematics/${grade.slug}/${unit.slug}`}
              className="find-start-result no-underline"
            >
              <span className="caption font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">
                Full unit
              </span>
              <span className="mt-2 block font-semibold text-[var(--color-ink)]">
                All topics in Unit {unit.number}
              </span>
              <span className="mt-1 block small text-[var(--color-ink-muted)]">
                {unit.topics.length} topics · pick any lesson
              </span>
            </Link>
          </div>

          <button type="button" onClick={() => setStep(2)} className="btn btn-ghost btn-sm mt-5">
            ← Pick a different unit
          </button>
        </div>
      )}
    </div>
  );
}
