"use client";

import Image from "next/image";
import MathBackdrop from "./MathBackdrop";
import { UnitSymbol } from "./UnitSymbol";

type Stat = { value: string; label: string };

/**
 * Decorative panel - logo, unit icons, and math backdrop to fill empty
 * column space on heroes and long scrolling sections.
 */
export default function VisualPanel({
  title,
  subtitle,
  icon,
  unitSymbols,
  stats,
  variant = "default",
  className = "",
}: {
  title?: string;
  subtitle?: string;
  /** Math symbol for unit heroes */
  icon?: string;
  /** Unit symbol grid for library / hub pages */
  unitSymbols?: string[];
  stats?: Stat[];
  variant?: "default" | "brand" | "compact";
  className?: string;
}) {
  const isBrand = variant === "brand";
  const isCompact = variant === "compact";

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border",
        isBrand
          ? "border-[var(--color-brand-500)] bg-[var(--color-brand-700)] text-white"
          : "border-[var(--color-border)] bg-[var(--color-surface)]",
        isCompact ? "p-5 sm:p-6" : "p-6 sm:p-8",
        "shadow-[var(--shadow-card)]",
        className,
      ].join(" ")}
    >
      <MathBackdrop
        variant={isBrand ? "brand" : "paper"}
        density="medium"
        fadeEdges
        watermark={!isCompact}
        className="absolute inset-0"
      />

      <div className="relative z-[1] flex flex-col items-center text-center">
        {icon ? (
          <UnitSymbol symbol={icon} size="lg" brand={isBrand} className="mb-4 rounded-2xl" />
        ) : (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4">
            <Image
              src="/newLogo.png"
              alt=""
              fill
              sizes="96px"
              className="object-contain drop-shadow-sm"
            />
          </div>
        )}

        {title && (
          <p
            className={[
              "font-display font-bold leading-snug",
              isCompact ? "text-lg" : "text-xl sm:text-2xl",
              isBrand ? "text-white" : "text-[var(--color-ink)]",
            ].join(" ")}
          >
            {title}
          </p>
        )}
        {subtitle && (
          <p
            className={[
              "small mt-2 max-w-[28ch] leading-relaxed",
              isBrand ? "text-white/80" : "text-[var(--color-ink-muted)]",
            ].join(" ")}
          >
            {subtitle}
          </p>
        )}

        {unitSymbols && unitSymbols.length > 0 && (
          <div
            aria-hidden
            className="mt-5 grid grid-cols-4 gap-2 w-full max-w-[220px]"
          >
            {unitSymbols.map((symbol, i) => (
              <UnitSymbol
                key={i}
                symbol={symbol}
                size="sm"
                brand={isBrand}
                className="aspect-square w-full h-auto min-h-[2.5rem] text-sm"
              />
            ))}
          </div>
        )}

        {stats && stats.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-3 w-full max-w-xs">
            {stats.map((s) => (
              <div
                key={s.label}
                className={[
                  "rounded-lg px-3 py-2.5 text-center border",
                  isBrand
                    ? "bg-white/10 border-white/15"
                    : "bg-[var(--color-bg)] border-[var(--color-border)]",
                ].join(" ")}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd
                  className={[
                    "font-display font-bold text-lg tabular-nums",
                    isBrand ? "text-white" : "text-[var(--color-brand-700)]",
                  ].join(" ")}
                >
                  {s.value}
                </dd>
                <dd
                  className={[
                    "caption mt-0.5",
                    isBrand ? "text-white/70" : "text-[var(--color-ink-muted)]",
                  ].join(" ")}
                >
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
