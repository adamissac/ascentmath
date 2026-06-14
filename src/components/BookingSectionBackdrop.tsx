"use client";

const RINGS = [0, 1, 2, 3] as const;

/**
 * Decorative backdrop for the book-a-session section: soft mesh, dot grid,
 * pulsing rings, and slow light bands — no floating math symbols.
 */
export default function BookingSectionBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="booking-mesh absolute inset-[-25%]" />

      <div className="booking-flow-band booking-flow-band--a" />
      <div className="booking-flow-band booking-flow-band--b" />

      <div className="absolute inset-0 dot-grid-soft booking-grid-breathe opacity-70" />

      <svg
        className="booking-rings absolute left-1/2 top-[38%] h-[min(88vw,520px)] w-[min(88vw,520px)] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 400 400"
        fill="none"
      >
        {RINGS.map((i) => (
          <circle
            key={i}
            cx="200"
            cy="200"
            r={72 + i * 36}
            className="booking-pulse-ring"
            style={{ animationDelay: `${i * 3.2}s` }}
          />
        ))}
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/90 to-transparent" />
    </div>
  );
}
