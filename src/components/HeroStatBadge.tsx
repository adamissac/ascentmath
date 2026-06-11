"use client";

export default function HeroStatBadge({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <li className="flex flex-col items-center justify-center rounded-lg border border-[#2A4BCB]/18 bg-[#F7F9FF] px-2 py-2.5 text-center sm:py-3">
      <span className="font-display text-lg font-bold leading-none tabular-nums text-[var(--color-brand-500)] sm:text-xl">
        {value}
      </span>
      <span className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-cool-muted)]">
        {label}
      </span>
    </li>
  );
}
