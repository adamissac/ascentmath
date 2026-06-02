/**
 * Math-style unit glyph - replaces emoji icons with typographic symbols.
 */

const BOX: Record<"sm" | "md" | "lg", string> = {
  sm: "w-10 h-10 text-base",
  md: "w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl",
  lg: "w-24 h-24 sm:w-28 sm:h-28 text-3xl sm:text-4xl",
};

export function UnitSymbol({
  symbol,
  size = "md",
  className = "",
  brand = false,
}: {
  symbol: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** White-on-blue variant for brand panels */
  brand?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={[
        "rounded-lg grid place-items-center font-display font-bold leading-none tabular-nums",
        BOX[size],
        brand
          ? "bg-white/10 border border-white/20 text-white"
          : "bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] text-[var(--color-brand-700)]",
        className,
      ].join(" ")}
    >
      {symbol}
    </span>
  );
}

export function DocSymbol({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={[
        "inline-grid place-items-center w-12 h-12 rounded-lg",
        "bg-[var(--color-brand-50)] border border-[var(--color-brand-100)]",
        "text-[var(--color-brand-700)]",
        className,
      ].join(" ")}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    </span>
  );
}
