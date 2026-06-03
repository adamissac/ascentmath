"use client";

import { useMemo, useState } from "react";

export type QuizQuestion = {
  id: string;
  prompt: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  answer: string | boolean;
  explanation: string;
  difficulty?: "easy" | "medium" | "hard";
};

type Props = {
  title?: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
};

function normalize(v: string | boolean) {
  return String(v).trim().toLowerCase();
}

const DIFFICULTY = {
  easy: { label: "Easy", tone: "pill pill-success" },
  medium: { label: "Medium", tone: "pill pill-warning" },
  hard: { label: "Hard", tone: "pill pill-danger" },
} as const;

export default function Quiz({ title = "Check yourself", questions, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const total = questions.length;
  const score = useMemo(
    () => questions.filter((qq) => normalize(answers[qq.id] ?? "") === normalize(qq.answer)).length,
    [answers, questions]
  );

  if (total === 0) {
    return (
      <div className="card p-6 text-[var(--color-ink-muted)]">
        <p className="small">Quiz questions are not available for this topic yet.</p>
      </div>
    );
  }

  const q = questions[index];
  const current = answers[q.id] ?? "";
  const isCorrect = normalize(current) === normalize(q.answer);
  const isLast = index === total - 1;

  const select = (value: string) => {
    if (revealed[q.id]) return;
    setAnswers((a) => ({ ...a, [q.id]: value }));
  };

  const reveal = () => setRevealed((r) => ({ ...r, [q.id]: true }));

  const next = () => {
    if (isLast) {
      const finalScore = questions.filter(
        (qq) => normalize(answers[qq.id] ?? "") === normalize(qq.answer)
      ).length;
      setDone(true);
      onComplete?.(finalScore, total);
      return;
    }
    setIndex((i) => Math.min(total - 1, i + 1));
  };

  const restart = () => {
    setIndex(0);
    setAnswers({});
    setRevealed({});
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / total) * 100);
    const tone = pct >= 80 ? "success" : pct >= 60 ? "warning" : "danger";
    const message =
      pct >= 80 ? "Strong work - you have this!" : pct >= 60 ? "Good progress - try the misses again." : "Practice the ideas in the videos and try again.";
    return (
      <div className="card p-8 text-[var(--color-ink)]">
        <div className="flex flex-col items-center text-center">
          <span className={`pill pill-${tone}`}>{pct}% correct</span>
          <h3 className="h2 mt-4">You got {score} of {total}</h3>
          <p className="lede mt-2 max-w-md">{message}</p>
        </div>
        <ul className="mt-8 grid gap-3" role="list">
          {questions.map((qq, i) => {
            const userAns = answers[qq.id] ?? "";
            const ok = normalize(userAns) === normalize(qq.answer);
            return (
              <li
                key={qq.id}
                className={[
                  "p-4 rounded-lg border",
                  ok
                    ? "border-[#C8E1D2] bg-[#F2F9F4]"
                    : "border-[#F1C5C1] bg-[#FBF2F1]",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="caption font-semibold text-[var(--color-ink-muted)]">Q{i + 1}</span>
                  <span className={ok ? "pill pill-success" : "pill pill-danger"}>
                    {ok ? "Correct" : "Review"}
                  </span>
                </div>
                <p className="mt-2 small font-medium">{qq.prompt}</p>
                <p className="mt-2 caption text-[var(--color-ink-muted)]">
                  Your answer: <span className="text-[var(--color-ink)] font-medium">{userAns || "-"}</span>
                </p>
                <p className="caption text-[var(--color-ink-muted)]">
                  Correct: <span className="text-[var(--color-brand-700)] font-medium">{String(qq.answer)}</span>
                </p>
                <p className="mt-2 small text-[var(--color-ink-muted)]">{qq.explanation}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex justify-center">
          <button onClick={restart} className="btn btn-primary">Try again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-8 text-[var(--color-ink)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="caption font-semibold tracking-wider uppercase text-[var(--color-brand-600)]">{title}</p>
          <h3 className="h3 mt-1 text-[var(--color-ink)]">Question {index + 1} of {total}</h3>
        </div>
        {q.difficulty && (
          <span className={DIFFICULTY[q.difficulty].tone}>{DIFFICULTY[q.difficulty].label}</span>
        )}
      </div>

      <div className="mt-4">
        <div className="w-full h-1 rounded-full bg-[var(--color-surface-2)] overflow-hidden">
          <div
            className="h-1 bg-[var(--color-brand-500)] transition-[width] duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <p className="mt-6 text-lg font-medium leading-relaxed text-[var(--color-ink)]">{q.prompt}</p>

      <div className="mt-5 grid gap-2.5">
        {q.type === "multiple-choice" && q.options?.map((opt) => (
          <Option key={opt} label={opt} selected={current === opt} disabled={!!revealed[q.id]} onClick={() => select(opt)} />
        ))}
        {q.type === "true-false" && (
          <>
            <Option label="True" selected={current === "true"} disabled={!!revealed[q.id]} onClick={() => select("true")} />
            <Option label="False" selected={current === "false"} disabled={!!revealed[q.id]} onClick={() => select("false")} />
          </>
        )}
        {q.type === "short-answer" && (
          <input
            value={current}
            onChange={(e) => select(e.target.value)}
            className="input"
            placeholder="Type your answer..."
            disabled={!!revealed[q.id]}
          />
        )}
      </div>

      {revealed[q.id] && (
        <div
          className={[
            "mt-5 p-4 rounded-md border",
            isCorrect
              ? "border-[#C8E1D2] bg-[#F2F9F4] text-[var(--color-success)]"
              : "border-[#F1C5C1] bg-[#FBF2F1] text-[var(--color-danger)]",
          ].join(" ")}
        >
          <p className="font-semibold small">{isCorrect ? "Correct!" : "Not quite."}</p>
          <p className="small mt-1 text-[var(--color-ink)]">{q.explanation}</p>
          {!isCorrect && (
            <p className="small mt-1 text-[var(--color-ink-muted)]">
              Answer: <span className="text-[var(--color-ink)] font-medium">{String(q.answer)}</span>
            </p>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="btn btn-ghost w-full sm:w-auto"
        >
          ← Previous
        </button>
        <div className="flex gap-2 w-full sm:w-auto">
          {!revealed[q.id] ? (
            <button
              type="button"
              onClick={reveal}
              disabled={!current}
              className="btn btn-outline flex-1 sm:flex-none"
            >
              Check
            </button>
          ) : (
            <button type="button" onClick={next} className="btn btn-primary flex-1 sm:flex-none">
              {isLast ? "Finish quiz" : "Next →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Option({
  label,
  selected,
  disabled,
  onClick,
}: {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={[
        "w-full text-left p-4 rounded-md border-2 transition-colors min-h-[44px]",
        selected
          ? "border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-ink)]"
          : "border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]",
        disabled ? "opacity-70 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
