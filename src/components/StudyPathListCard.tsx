import type { ReactNode } from "react";
import Link from "next/link";
import { UnitSymbol } from "./UnitSymbol";

export type StudyPathListCardPill = string;

type Props = {
  href: string;
  ariaLabel: string;
  title: string;
  description: string;
  pills: StudyPathListCardPill[];
  badge?: string;
  /** Light cards on cream bg, or compact rows on brand blue band */
  variant?: "light" | "brand";
  index?: number;
  symbol?: string;
  gradeGlyph?: string;
};

export default function StudyPathListCard({
  href,
  ariaLabel,
  title,
  description,
  pills,
  badge,
  variant = "light",
  index,
  symbol,
  gradeGlyph,
}: Props) {
  const isBrand = variant === "brand";
  const metaLine = isBrand && pills.length > 0 ? pills.join(" · ") : null;

  const cardClass = isBrand
    ? [
        "group flex items-center gap-3.5 rounded-xl border border-white/12 bg-white/[0.08] px-4 py-3.5 no-underline sm:gap-4 sm:px-5 sm:py-4",
        "transition-[border-color,background-color] duration-200 ease-out",
        "hover:border-white/22 hover:bg-white/[0.12]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60",
      ].join(" ")
    : [
        "group relative flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 no-underline shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:gap-5 sm:p-6",
        "transition-[border-color,box-shadow,transform] duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-[var(--color-brand-200)] hover:shadow-[var(--shadow-card-hover)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]",
      ].join(" ");

  return (
    <Link href={href} className={cardClass} aria-label={ariaLabel}>
      <div className="flex shrink-0 items-center">
        {gradeGlyph ? (
          <span
            aria-hidden
            className={[
              "grid size-10 place-items-center rounded-lg font-display text-lg font-bold sm:size-11 sm:text-xl",
              isBrand
                ? "bg-white/10 text-[var(--color-accent-300)]"
                : "bg-[var(--color-brand-50)] text-[var(--color-brand-600)] transition-colors group-hover:bg-[var(--color-brand-600)] group-hover:text-white",
            ].join(" ")}
          >
            {gradeGlyph}
          </span>
        ) : symbol ? (
          <>
            {typeof index === "number" && (
              <span
                aria-hidden
                className="hidden w-9 text-center font-display text-sm font-bold tabular-nums text-[var(--color-brand-600)] transition-colors group-hover:text-[var(--color-brand-700)] sm:block"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <UnitSymbol symbol={symbol} size="md" className="group-hover:bg-[var(--color-brand-100)]" />
          </>
        ) : typeof index === "number" ? (
          <span
            aria-hidden
            className="grid size-10 place-items-center rounded-full bg-[var(--color-brand-500)] font-display text-sm font-bold text-white"
          >
            {index + 1}
          </span>
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span
            className={[
              "font-display font-semibold leading-snug",
              isBrand
                ? "text-base text-white sm:text-lg"
                : "text-lg text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand-700)] sm:text-xl",
            ].join(" ")}
          >
            {title}
          </span>
          {badge && !isBrand && (
            <span className="caption rounded bg-[var(--color-brand-50)] px-2 py-0.5 font-semibold uppercase tracking-wider text-[var(--color-brand-600)]">
              {badge}
            </span>
          )}
        </div>

        {metaLine && (
          <p className="mt-0.5 text-xs font-medium text-[var(--color-accent-300)]">{metaLine}</p>
        )}

        <p
          className={
            isBrand
              ? "mt-1 line-clamp-1 text-sm leading-snug text-white/60"
              : "small mt-2 line-clamp-2 leading-relaxed text-[var(--color-ink-muted)]"
          }
        >
          {description}
        </p>

        {!isBrand && pills.length > 0 && (
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0" aria-label="Contents">
            {pills.map((pill) => (
              <Pill key={pill}>{pill}</Pill>
            ))}
          </ul>
        )}
      </div>

      {isBrand ? (
        <span
          aria-hidden
          className="shrink-0 text-lg font-semibold text-white/40 transition-colors group-hover:text-[var(--color-accent-300)]"
        >
          →
        </span>
      ) : (
        <span
          aria-hidden
          className={[
            "grid size-10 shrink-0 place-items-center self-end rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink-muted)] sm:self-center",
            "transition-[background,border-color,color,transform] duration-200 group-hover:translate-x-0.5 group-hover:border-[var(--color-brand-600)] group-hover:bg-[var(--color-brand-600)] group-hover:text-white",
          ].join(" ")}
        >
          <ArrowIcon />
        </span>
      )}
    </Link>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <li>
      <span className="inline-flex items-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 text-xs font-medium text-[var(--color-ink-muted)]">
        {children}
      </span>
    </li>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}
