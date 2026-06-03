"use client";

import { useState } from "react";
import type { PracticeExercise } from "../data/units";

const DIFFICULTY = {
  easy: "pill pill-success",
  medium: "pill pill-warning",
  hard: "pill pill-danger",
} as const;

export default function TopicExercises({
  title,
  exercises,
}: {
  title: string;
  exercises: PracticeExercise[];
}) {
  return (
    <div className="grid gap-4">
      {exercises.map((ex, index) => (
        <ExerciseCard key={ex.id} exercise={ex} index={index} topicTitle={title} />
      ))}
    </div>
  );
}

function ExerciseCard({
  exercise,
  index,
  topicTitle,
}: {
  exercise: PracticeExercise;
  index: number;
  topicTitle: string;
}) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const tone = exercise.difficulty ? DIFFICULTY[exercise.difficulty] : "pill pill-brand";

  return (
    <article className="rounded-xl border border-[var(--color-border)] bg-white overflow-hidden shadow-sm">
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3">
        <span className="font-display text-sm font-bold text-[var(--color-brand-700)]">
          Problem {index + 1}
        </span>
        {exercise.difficulty && (
          <span className={tone}>{exercise.difficulty}</span>
        )}
      </div>

      <div className="p-4 sm:p-5 grid gap-4">
        <p className="font-semibold text-[var(--color-ink)] leading-relaxed">{exercise.problem}</p>

        <div className="flex flex-wrap gap-2">
          {exercise.hint && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setShowHint((v) => !v)}
              aria-expanded={showHint}
            >
              {showHint ? "Hide hint" : "Show hint"}
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setShowSolution((v) => !v)}
            aria-expanded={showSolution}
          >
            {showSolution ? "Hide solution" : "Show solution"}
          </button>
        </div>

        {showHint && exercise.hint && (
          <p className="rounded-lg border border-[var(--color-accent-100)] bg-[var(--color-accent-50)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink)]">
            <span className="font-semibold text-[var(--color-accent-700)]">Hint: </span>
            {exercise.hint}
          </p>
        )}

        {showSolution && (
          <figure className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] overflow-hidden">
            <figcaption className="px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <span className="caption font-semibold uppercase tracking-wider text-[var(--color-brand-700)]">
                Worked solution
              </span>
            </figcaption>
            <div className="p-4 grid gap-3">
              <ol className="grid gap-2">
                {exercise.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-ink)]">
                    <span className="mt-0.5 font-bold text-[var(--color-brand-600)]">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="text-sm">
                <span className="font-semibold text-[var(--color-ink)]">Answer: </span>
                <span className="font-display font-bold text-[var(--color-brand-700)]">{exercise.answer}</span>
              </p>
            </div>
          </figure>
        )}

        <p className="caption text-[var(--color-ink-soft)]">
          Try on paper first, then check your work. Revisit the {topicTitle} walkthrough if you get stuck.
        </p>
      </div>
    </article>
  );
}
