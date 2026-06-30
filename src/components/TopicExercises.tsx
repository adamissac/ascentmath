"use client";

import { useMemo, useState } from "react";
import type { PracticeExercise } from "../data/units";

function normalizeAnswer(value: string) {
  return value
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function answersMatch(student: string, expected: string) {
  const a = normalizeAnswer(student);
  const b = normalizeAnswer(expected);
  if (!a) return false;
  if (a === b) return true;
  if (b.includes(a) || a.includes(b)) return true;
  const numA = parseFloat(a.replace(/[^\d.-]/g, ""));
  const numB = parseFloat(b.replace(/[^\d.-]/g, ""));
  if (!Number.isNaN(numA) && !Number.isNaN(numB) && numA === numB) return true;
  return false;
}

export default function TopicExercises({
  title,
  exercises,
}: {
  title: string;
  exercises: PracticeExercise[];
}) {
  return (
    <div className="lesson-exercise-list">
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
  const [work, setWork] = useState("");
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);

  const correct = useMemo(
    () => checked && answersMatch(answer, exercise.answer),
    [checked, answer, exercise.answer]
  );

  const reset = () => {
    setWork("");
    setAnswer("");
    setChecked(false);
    setShowHint(false);
    setStepIndex(-1);
  };

  const check = () => {
    setChecked(true);
    if (!answersMatch(answer, exercise.answer)) setShowHint(true);
  };

  const revealNextStep = () => {
    setStepIndex((i) => Math.min(exercise.steps.length - 1, i + 1));
  };

  return (
    <article className="lesson-workbench">
      <header className="lesson-workbench__head">
        <p className="lesson-workbench__label">Exercise {index + 1}</p>
        <p className="lesson-workbench__prompt">{exercise.problem}</p>
      </header>

      <div
        className={[
          "lesson-workbench__panel",
          checked && correct ? "lesson-workbench__panel--ok" : "",
          checked && !correct ? "lesson-workbench__panel--miss" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <label className="lesson-workbench__field-label" htmlFor={`work-${exercise.id}`}>
          Your work (optional: show steps, notes, or a sketch)
        </label>
        <textarea
          id={`work-${exercise.id}`}
          className="lesson-workbench__textarea"
          rows={4}
          value={work}
          onChange={(e) => setWork(e.target.value)}
          placeholder="Write your steps here before checking the answer…"
        />

        <label className="lesson-workbench__field-label" htmlFor={`answer-${exercise.id}`}>
          Your answer
        </label>
        <input
          id={`answer-${exercise.id}`}
          className={[
            "lesson-workbench__input",
            checked && correct ? "lesson-workbench__input--ok" : "",
            checked && !correct ? "lesson-workbench__input--miss" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setChecked(false);
          }}
          placeholder="Type your final answer"
          onKeyDown={(e) => {
            if (e.key === "Enter") check();
          }}
        />

        <div className="lesson-workbench__actions">
          <button type="button" className="btn btn-primary btn-sm" onClick={check}>
            Check my answer
          </button>
          <button type="button" className="btn btn-outline btn-sm" onClick={reset}>
            Reset
          </button>
        </div>

        {checked && (
          <p
            className={[
              "lesson-workbench__verdict",
              correct ? "lesson-workbench__verdict--ok" : "lesson-workbench__verdict--miss",
            ].join(" ")}
            role="status"
          >
            {correct
              ? "✓ Correct. Nice work. Compare your steps to the official solution below."
              : "✗ Not quite yet. Use a hint or reveal the solution one step at a time."}
          </p>
        )}

        {showHint && exercise.hint && !correct && (
          <p className="lesson-workbench__hint">
            <span className="font-semibold">Hint:</span> {exercise.hint}
          </p>
        )}
      </div>

      <div className="lesson-workbench__solution">
        <div className="lesson-workbench__solution-head">
          <p className="lesson-workbench__solution-title">Step-by-step solution</p>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={revealNextStep}
            disabled={stepIndex >= exercise.steps.length - 1}
          >
            {stepIndex < 0 ? "Reveal step 1" : "Next step"}
          </button>
        </div>

        <ol className="lesson-step-cards lesson-step-cards--compact">
          {exercise.steps.map((step, i) => (
            <li
              key={i}
              className={[
                "lesson-step-cards__item",
                i <= stepIndex ? "lesson-step-cards__item--visible" : "lesson-step-cards__item--hidden",
              ].join(" ")}
            >
              <span className="lesson-step-cards__num">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        {stepIndex >= exercise.steps.length - 1 && (
          <p className="lesson-workbench__final">
            Final answer: <strong>{exercise.answer}</strong>
          </p>
        )}
      </div>

      <p className="lesson-workbench__footer">
        Stuck on {topicTitle}? Re-read the lesson section above, then try this exercise again without
        peeking.
      </p>
    </article>
  );
}
