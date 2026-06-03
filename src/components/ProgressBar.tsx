"use client";

type Props = {
  value: number;
  label?: string;
  size?: "sm" | "md";
  showValue?: boolean;
  tone?: "brand" | "accent";
};

export default function ProgressBar({
  value,
  label,
  size = "md",
  showValue = true,
  tone = "brand",
}: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const height = size === "sm" ? "h-1.5" : "h-2.5";
  const fill =
    tone === "brand"
      ? "bg-[var(--color-brand-500)]"
      : "bg-[var(--color-accent-500)]";

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="small font-medium text-[var(--color-ink)]">{label}</span>}
          {showValue && (
            <span className="caption font-semibold text-[var(--color-ink-muted)]">{pct}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full ${height} rounded-full bg-[var(--color-surface-2)] overflow-hidden`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={label || "Progress"}
      >
        <div
          className={`${height} ${fill} rounded-full transition-[width] duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
