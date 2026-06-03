"use client";

import {
  TUTORING_TIERS,
  PRICING_DISCUSSION_NOTE,
  TIER_PRICING_EXPLAINER,
  type TutoringTierId,
} from "../data/pricing";

export function SelectField({
  id,
  label,
  required,
  optional,
  value,
  onChange,
  placeholder,
  options,
  error,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  options: readonly { value: string; label: string }[];
  error?: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-[var(--color-danger)]">*</span>}
        {optional && (
          <span className="ml-1 font-normal text-[var(--color-ink-soft)]">(optional)</span>
        )}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          className="select appearance-none pr-10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]"
        >
          <ChevronDown />
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} className="error-text mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

export function BookingPricingFields({
  tierId,
  onTier,
  compact = false,
}: {
  tierId: TutoringTierId;
  onTier: (id: TutoringTierId) => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "grid gap-0" : "grid gap-5"}>
      <SelectField
        id="tier"
        label="Tutoring tier (grade band)"
        required
        value={tierId}
        onChange={(v) => onTier(v as TutoringTierId)}
        placeholder="Select a tier"
        options={TUTORING_TIERS.map((tier) => ({
          value: tier.id,
          label: `${tier.tierLabel}, ${tier.label}`,
        }))}
      />
      {!compact && (
        <>
          <p className="small leading-relaxed text-[var(--color-ink-muted)]">{TIER_PRICING_EXPLAINER}</p>
          <p className="caption leading-relaxed text-[var(--color-ink-soft)]">{PRICING_DISCUSSION_NOTE}</p>
        </>
      )}
    </div>
  );
}

function ChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
