"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GRADES } from "../data/units";

type Step = 1 | 2 | 3;

export default function TopicStartFinder() {
  const [step, setStep] = useState<Step>(1);
  const [gradeSlug, setGradeSlug] = useState<string | null>(null);
  const [unitSlug, setUnitSlug] = useState<string | null>(null);

  const grade = useMemo(() => GRADES.find((g) => g.slug === gradeSlug), [gradeSlug]);
  const unit = useMemo(
    () => grade?.units.find((u) => u.slug === unitSlug),
    [grade, unitSlug]
  );

  const firstTopic = unit?.topics[0];

  function reset() {
    setStep(1);
    setGradeSlug(null);
    setUnitSlug(null);
  }

  return (
    <div className="card p-6 sm:p-8 bg-[var(--color-surface)]">
      <p className="eyebrow">Find your start</p>
      <h2 className="h2 mt-2">Not sure which unit to open?</h2>
      <p className="small text-[var(--color-ink-muted)] mt-2 max-w-xl leading-relaxed">
        Answer three quick questions and we&apos;ll point you to the right place in the library.
      </p>

      <ol className="mt-6 flex flex-wrap gap-2" aria-label="Progress">
        {[1, 2, 3].map((n) => (
          <li
            key={n}
            className={[
              "caption font-semibold px-2.5 py-1 rounded-full border",
              step >= n
                ? "bg-[var(--color-brand-50)] border-[var(--color-brand-200)] text-[var(--color-brand-700)]"
                : "border-[var(--color-border)] text-[var(--color-ink-soft)]",
            ].join(" ")}
          >
            Step {n}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <fieldset className="mt-6 grid gap-3">
          <legend className="font-semibold text-[var(--color-ink)]">What grade are you in?</legend>
          {GRADES.map((g) => (
            <label
              key={g.slug}
              className="flex items-center gap-3 p-4 rounded-lg border border-[var(--color-border)] cursor-pointer hover:border-[var(--color-brand-200)] hover:bg-[var(--color-brand-50)] has-[:checked]:border-[var(--color-brand-500)] has-[:checked]:bg-[var(--color-brand-50)]"
            >
              <input
                type="radio"
                name="grade"
                value={g.slug}
                checked={gradeSlug === g.slug}
                onChange={() => setGradeSlug(g.slug)}
                className="accent-[var(--color-brand-500)]"
              />
              <span>
                <span className="block font-semibold text-[var(--color-ink)]">{g.title}</span>
                <span className="block small text-[var(--color-ink-muted)] mt-0.5">{g.short}</span>
              </span>
            </label>
          ))}
          <button
            type="button"
            disabled={!gradeSlug}
            onClick={() => setStep(2)}
            className="btn btn-primary btn-sm mt-2 w-full sm:w-auto disabled:opacity-50"
          >
            Next →
          </button>
        </fieldset>
      )}

      {step === 2 && grade && (
        <fieldset className="mt-6 grid gap-3">
          <legend className="font-semibold text-[var(--color-ink)]">
            What is your class working on right now?
          </legend>
          {grade.units.map((u) => (
            <label
              key={u.slug}
              className="flex items-start gap-3 p-4 rounded-lg border border-[var(--color-border)] cursor-pointer hover:border-[var(--color-brand-200)] hover:bg-[var(--color-brand-50)] has-[:checked]:border-[var(--color-brand-500)] has-[:checked]:bg-[var(--color-brand-50)]"
            >
              <input
                type="radio"
                name="unit"
                value={u.slug}
                checked={unitSlug === u.slug}
                onChange={() => setUnitSlug(u.slug)}
                className="accent-[var(--color-brand-500)] mt-1"
              />
              <span>
                <span className="block font-semibold text-[var(--color-ink)]">
                  Unit {u.number}: {u.title}
                </span>
                <span className="block small text-[var(--color-ink-muted)] mt-0.5">{u.short}</span>
              </span>
            </label>
          ))}
          <div className="flex flex-wrap gap-2 mt-2">
            <button type="button" onClick={() => setStep(1)} className="btn btn-ghost btn-sm">
              ← Back
            </button>
            <button
              type="button"
              disabled={!unitSlug}
              onClick={() => setStep(3)}
              className="btn btn-primary btn-sm disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </fieldset>
      )}

      {step === 3 && grade && unit && (
        <div className="mt-6">
          <p className="font-semibold text-[var(--color-ink)]">
            Here&apos;s a good place to jump in
          </p>
          <p className="small text-[var(--color-ink-muted)] mt-2 leading-relaxed">
            Start with the first topic in this unit, or open the full unit to see every lesson.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {firstTopic && (
              <Link
                href={`/mathematics/${grade.slug}/${unit.slug}/${firstTopic.slug}`}
                className="card card-interactive p-5 no-underline"
              >
                <span className="caption text-[var(--color-brand-600)] font-semibold uppercase tracking-wider">
                  Start here
                </span>
                <span className="block font-semibold text-[var(--color-ink)] mt-2">{firstTopic.title}</span>
                <span className="block small text-[var(--color-ink-muted)] mt-1">{firstTopic.summary}</span>
              </Link>
            )}
            <Link
              href={`/mathematics/${grade.slug}/${unit.slug}`}
              className="card card-interactive p-5 no-underline"
            >
              <span className="caption text-[var(--color-ink-muted)] font-semibold uppercase tracking-wider">
                Full unit
              </span>
              <span className="block font-semibold text-[var(--color-ink)] mt-2">
                All topics in Unit {unit.number}
              </span>
              <span className="block small text-[var(--color-ink-muted)] mt-1">
                {unit.topics.length} topics · browse and pick any lesson
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            <button type="button" onClick={() => setStep(2)} className="btn btn-ghost btn-sm">
              ← Back
            </button>
            <button type="button" onClick={reset} className="btn btn-outline btn-sm">
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
