"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import { useUnitProgress, type ProgressItem } from "../hooks/useUnitProgress";
import type { Grade, Unit, Topic } from "../data/units";

type Props = {
  grade: Grade;
  unit: Unit;
  topic?: Topic;
  breadcrumbs: Crumb[];
  title: string;
  lessonMeta: string;
  description: string;
  estimatedMinutes?: number;
  headerActions?: ReactNode;
  children: ReactNode;
  nextHref?: string;
  nextLabel?: string;
  backHref: string;
  backLabel: string;
};

export default function LessonShell({
  grade,
  unit,
  topic,
  breadcrumbs,
  title,
  lessonMeta,
  description,
  estimatedMinutes,
  headerActions,
  children,
  nextHref,
  nextLabel,
  backHref,
  backLabel,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const progressItems: ProgressItem[] = unit.topics.map((t) => ({ id: t.id, label: t.title }));
  const { hydrated, isComplete, completedCount, total } = useUnitProgress(unit.id, progressItems);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setSidebarOpen(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const unitBase = `/mathematics/${grade.slug}/${unit.slug}`;
  const gradeHref = `/mathematics/${grade.slug}`;

  return (
    <div className="lesson-page">
      <div
        className={[
          "lesson-layout",
          sidebarOpen ? "" : "lesson-layout--sidebar-collapsed",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <aside
          className={[
            "lesson-sidebar",
            sidebarOpen ? "lesson-sidebar--open" : "lesson-sidebar--collapsed",
          ].join(" ")}
          aria-label={`Topics in Unit ${unit.number}`}
        >
          <div className="lesson-sidebar__head">
            <div className="min-w-0 flex-1">
              <p className="lesson-sidebar__unit-label">Unit {unit.number} · {grade.title}</p>
              <h2 className="lesson-sidebar__unit-title">{unit.title}</h2>
            </div>
            <button
              type="button"
              className="lesson-sidebar__toggle"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-expanded={sidebarOpen}
              aria-label={sidebarOpen ? "Hide lesson menu" : "Show lesson menu"}
            >
              {sidebarOpen ? "‹" : "›"}
            </button>
          </div>

          <ol className="lesson-sidebar__list">
            {unit.topics.map((t, i) => {
              const active = topic?.id === t.id;
              const done = hydrated && isComplete(t.id);
              return (
                <li key={t.id}>
                  <Link
                    href={`${unitBase}/${t.slug}`}
                    className={[
                      "lesson-sidebar__link",
                      active ? "lesson-sidebar__link--active" : "",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="lesson-sidebar__index" aria-hidden>
                      {done ? "✓" : `${i + 1}.`}
                    </span>
                    <span className="lesson-sidebar__link-title">{t.title}</span>
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="lesson-sidebar__foot">
            {hydrated && total > 0 && (
              <p className="lesson-sidebar__progress">
                {completedCount} of {total} topic{total === 1 ? "" : "s"} marked done
              </p>
            )}
            <div className="lesson-sidebar__links">
              <Link href={unitBase} className="lesson-sidebar__foot-link">
                Unit overview
              </Link>
              <Link href={gradeHref} className="lesson-sidebar__foot-link">
                {grade.title} units
              </Link>
            </div>
          </div>
        </aside>

        <main className="lesson-main">
          <div className="lesson-main__inner">
            <Breadcrumbs items={breadcrumbs} />

            <header className="lesson-header">
              <p className="lesson-header__meta">{lessonMeta}</p>
              <h1 className="lesson-header__title">{title}</h1>

              <div className="lesson-overview-card">
                <h2 className="lesson-overview-card__heading">Overview</h2>
                <p className="lesson-overview-card__text">{description}</p>
                {estimatedMinutes != null && (
                  <p className="lesson-overview-card__badge">~{estimatedMinutes} min</p>
                )}
              </div>

              <div className="lesson-header__actions">
                {nextHref && nextLabel && (
                  <Link href={nextHref} className="btn btn-primary btn-sm lesson-header__next">
                    {nextLabel}
                  </Link>
                )}
                <Link href={backHref} className="btn btn-outline btn-sm">
                  {backLabel}
                </Link>
              </div>

              {headerActions && (
                <div className="lesson-header__tools">{headerActions}</div>
              )}
            </header>

            <div className="lesson-content">{children}</div>
          </div>

          {nextHref && (
            <div className="lesson-bottom-nav">
              <Link href={nextHref} className="lesson-bottom-nav__link">
                Next →
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
