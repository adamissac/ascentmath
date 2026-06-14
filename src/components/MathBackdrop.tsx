"use client";

import type { CSSProperties, ReactNode } from "react";
import BackdropGlyphLayer from "./BackdropGlyphLayer";

/**
 * Decorative math-symbol + clipart wash for hero sections and empty space.
 * Purely visual (`aria-hidden`, no pointer events).
 */

export type BackdropVariant = "paper" | "muted" | "brand" | "dark" | "tracks";
export type BackdropDensity = "light" | "medium" | "dense";

type GlyphTint = "blue" | "orange" | "gray";

type Glyph = {
  ch: string;
  top: number;
  left: number;
  size: number;
  rot?: number;
  o?: number;
  font?: "display" | "sans";
  tint?: GlyphTint;
};

type Clip = {
  kind: "book" | "pencil" | "star" | "calc" | "ruler" | "cap" | "compass" | "abc";
  top: number;
  left: number;
  size: number;
  rot?: number;
  o?: number;
  accent?: boolean;
};

/** Keep decorative glyphs in the margins so they don't sit on top of copy. */
function edgeGlyphs(glyphs: Glyph[]): Glyph[] {
  return glyphs.filter(
    (g) => g.left <= 16 || g.left >= 84 || g.top <= 14 || g.top >= 86
  );
}

function edgeClips(clips: Clip[]): Clip[] {
  return clips.filter(
    (c) => c.left <= 14 || c.left >= 86 || c.top <= 16 || c.top >= 84
  );
}

const PAPER_GLYPHS: Record<BackdropDensity, Glyph[]> = {
  light: [
    { ch: "π", top: 8, left: 6, size: 3.2, rot: -8 },
    { ch: "√", top: 22, left: 92, size: 2.6, rot: 6 },
    { ch: "Σ", top: 55, left: 4, size: 2.4, rot: 4 },
    { ch: "θ", top: 78, left: 88, size: 2.2, rot: -6 },
    { ch: "x²", top: 40, left: 94, size: 1.8, rot: 8, font: "sans" },
    { ch: "≠", top: 90, left: 12, size: 2.0, rot: -4 },
  ],
  medium: [
    { ch: "π", top: 6, left: 5, size: 3.8, rot: -8 },
    { ch: "Σ", top: 12, left: 48, size: 2.6, rot: 4 },
    { ch: "∞", top: 18, left: 82, size: 2.2, rot: -10 },
    { ch: "∂", top: 24, left: 22, size: 2.4, rot: 8 },
    { ch: "θ", top: 32, left: 68, size: 2.6, rot: -4 },
    { ch: "√", top: 38, left: 10, size: 3.2, rot: 2 },
    { ch: "x²", top: 44, left: 52, size: 2.0, rot: 6, font: "sans" },
    { ch: "≠", top: 50, left: 90, size: 2.2, rot: -8 },
    { ch: "∫", top: 58, left: 28, size: 4.0, rot: -2 },
    { ch: "÷", top: 62, left: 72, size: 2.2, rot: 4 },
    { ch: "≤", top: 68, left: 8, size: 2.0, rot: -6 },
    { ch: "%", top: 72, left: 44, size: 2.2, rot: 8, font: "sans" },
    { ch: "+", top: 76, left: 86, size: 2.4, rot: -4 },
    { ch: "½", top: 82, left: 18, size: 2.0, rot: 6, font: "sans" },
    { ch: "α", top: 86, left: 58, size: 2.8, rot: -3 },
    { ch: "β", top: 92, left: 78, size: 2.2, rot: 5 },
    { ch: "Δ", top: 94, left: 38, size: 2.4, rot: -7 },
  ],
  dense: [
    { ch: "π", top: 4, left: 8, size: 4.2, rot: -6 },
    { ch: "Σ", top: 8, left: 42, size: 2.8, rot: 4 },
    { ch: "∞", top: 12, left: 78, size: 2.4, rot: -10 },
    { ch: "∂", top: 16, left: 18, size: 2.6, rot: 8 },
    { ch: "θ", top: 20, left: 62, size: 2.8, rot: -4 },
    { ch: "√", top: 24, left: 92, size: 3.4, rot: 2 },
    { ch: "x²", top: 28, left: 32, size: 2.2, rot: 6, font: "sans" },
    { ch: "≠", top: 32, left: 52, size: 2.4, rot: -8 },
    { ch: "∫", top: 36, left: 6, size: 4.8, rot: -2 },
    { ch: "÷", top: 40, left: 72, size: 2.4, rot: 4 },
    { ch: "≤", top: 44, left: 88, size: 2.2, rot: -6 },
    { ch: "%", top: 48, left: 24, size: 2.4, rot: 8, font: "sans" },
    { ch: "+", top: 52, left: 48, size: 2.6, rot: -4 },
    { ch: "−", top: 56, left: 68, size: 2.4, rot: 0 },
    { ch: "½", top: 60, left: 12, size: 2.2, rot: 6, font: "sans" },
    { ch: "α", top: 64, left: 82, size: 3.0, rot: -3 },
    { ch: "β", top: 68, left: 36, size: 2.4, rot: 5 },
    { ch: "Δ", top: 72, left: 58, size: 2.6, rot: -7 },
    { ch: "λ", top: 76, left: 4, size: 2.4, rot: 3 },
    { ch: "φ", top: 80, left: 94, size: 2.6, rot: -5 },
    { ch: "³", top: 84, left: 22, size: 2.0, rot: 8, font: "sans" },
    { ch: "≈", top: 88, left: 44, size: 2.2, rot: -4 },
    { ch: "∑", top: 92, left: 74, size: 2.8, rot: 6 },
    { ch: "°", top: 96, left: 14, size: 2.0, rot: -8, font: "sans" },
  ],
};

/** Low-opacity symbols scattered through the middle when contentSafe is on. */
const INTERIOR_GLYPHS: Glyph[] = [
  { ch: "π", top: 28, left: 38, size: 2.4, rot: -6, o: 0.35 },
  { ch: "Σ", top: 42, left: 58, size: 2.0, rot: 4, o: 0.3 },
  { ch: "x²", top: 52, left: 42, size: 1.6, rot: 8, font: "sans", o: 0.28 },
  { ch: "θ", top: 62, left: 55, size: 2.2, rot: -4, o: 0.32 },
  { ch: "÷", top: 36, left: 62, size: 1.8, rot: 6, o: 0.25 },
  { ch: "+", top: 48, left: 32, size: 2.0, rot: -8, o: 0.28 },
];

const INTERIOR_CLIPS: Clip[] = [
  { kind: "star", top: 32, left: 48, size: 22, rot: 10, accent: true, o: 0.12 },
  { kind: "book", top: 55, left: 35, size: 28, rot: -8, o: 0.1 },
  { kind: "pencil", top: 44, left: 62, size: 26, rot: -20, o: 0.1 },
];

const BRAND_GLYPHS: Record<BackdropDensity, Glyph[]> = {
  light: PAPER_GLYPHS.light,
  medium: PAPER_GLYPHS.medium,
  dense: PAPER_GLYPHS.dense.map((g) => ({ ...g, o: (g.o ?? 1) * 0.9 })),
};

/** Static mixed-color symbols for light sections below the hero (no animation). */
const TRACKS_GLYPHS: Record<BackdropDensity, Glyph[]> = {
  light: [
    { ch: "π", top: 10, left: 8, size: 2.8, rot: -6, tint: "blue" },
    { ch: "Σ", top: 18, left: 90, size: 2.4, rot: 4, tint: "gray" },
    { ch: "θ", top: 72, left: 6, size: 2.2, rot: -5, tint: "blue" },
    { ch: "÷", top: 82, left: 88, size: 2.0, rot: 6, tint: "orange" },
    { ch: "x²", top: 38, left: 92, size: 1.8, rot: 8, font: "sans", tint: "orange" },
    { ch: "λ", top: 48, left: 5, size: 2.4, rot: 3, tint: "gray" },
  ],
  medium: [
    { ch: "π", top: 8, left: 7, size: 3.0, rot: -6, tint: "blue" },
    { ch: "Σ", top: 14, left: 88, size: 2.6, rot: 4, tint: "gray" },
    { ch: "∞", top: 22, left: 12, size: 2.2, rot: -8, tint: "blue" },
    { ch: "θ", top: 30, left: 78, size: 2.4, rot: -4, tint: "orange" },
    { ch: "√", top: 58, left: 90, size: 2.8, rot: 2, tint: "blue" },
    { ch: "≠", top: 66, left: 8, size: 2.0, rot: -6, tint: "gray" },
    { ch: "∫", top: 74, left: 72, size: 3.2, rot: -2, tint: "orange" },
    { ch: "+", top: 86, left: 14, size: 2.2, rot: 4, tint: "blue" },
    { ch: "½", top: 92, left: 52, size: 1.9, rot: 6, font: "sans", tint: "gray" },
  ],
  dense: [
    { ch: "π", top: 6, left: 6, size: 3.2, rot: -6, tint: "blue" },
    { ch: "Σ", top: 12, left: 86, size: 2.6, rot: 4, tint: "gray" },
    { ch: "∞", top: 18, left: 10, size: 2.2, rot: -8, tint: "blue" },
    { ch: "θ", top: 26, left: 80, size: 2.4, rot: -4, tint: "orange" },
    { ch: "√", top: 34, left: 92, size: 2.8, rot: 2, tint: "blue" },
    { ch: "x²", top: 42, left: 6, size: 1.9, rot: 6, font: "sans", tint: "orange" },
    { ch: "≠", top: 50, left: 68, size: 2.0, rot: -6, tint: "gray" },
    { ch: "∫", top: 58, left: 8, size: 3.4, rot: -2, tint: "blue" },
    { ch: "÷", top: 64, left: 88, size: 2.1, rot: 4, tint: "orange" },
    { ch: "α", top: 72, left: 22, size: 2.6, rot: -3, tint: "gray" },
    { ch: "Δ", top: 80, left: 58, size: 2.4, rot: 5, tint: "blue" },
    { ch: "φ", top: 88, left: 78, size: 2.2, rot: -5, tint: "orange" },
  ],
};

const CLIPART: Record<BackdropDensity, Clip[]> = {
  light: [
    { kind: "book", top: 14, left: 88, size: 44, rot: -12 },
    { kind: "star", top: 72, left: 8, size: 28, rot: 8, accent: true },
    { kind: "pencil", top: 48, left: 6, size: 40, rot: -25 },
  ],
  medium: [
    { kind: "book", top: 10, left: 90, size: 48, rot: -12 },
    { kind: "star", top: 8, left: 72, size: 32, rot: 12, accent: true },
    { kind: "pencil", top: 42, left: 4, size: 44, rot: -28 },
    { kind: "calc", top: 58, left: 92, size: 40, rot: 8 },
    { kind: "ruler", top: 78, left: 6, size: 52, rot: -15 },
    { kind: "cap", top: 86, left: 82, size: 44, rot: 6 },
  ],
  dense: [
    { kind: "book", top: 8, left: 88, size: 52, rot: -12 },
    { kind: "star", top: 6, left: 68, size: 36, rot: 12, accent: true },
    { kind: "pencil", top: 22, left: 4, size: 48, rot: -28 },
    { kind: "calc", top: 34, left: 94, size: 44, rot: 8 },
    { kind: "ruler", top: 48, left: 8, size: 56, rot: -18 },
    { kind: "cap", top: 58, left: 78, size: 48, rot: 6 },
    { kind: "compass", top: 68, left: 92, size: 42, rot: -8 },
    { kind: "abc", top: 78, left: 4, size: 46, rot: 10 },
    { kind: "star", top: 88, left: 52, size: 24, rot: -6, accent: true },
    { kind: "book", top: 92, left: 86, size: 38, rot: 18 },
  ],
};

const VARIANT_STYLE: Record<
  BackdropVariant,
  { glyph: string; glyphOpacity: number; grid: string; watermark: string }
> = {
  paper: {
    glyph: "rgba(42, 75, 203, 0.55)",
    glyphOpacity: 0.14,
    grid: "rgba(42, 75, 203, 0.06)",
    watermark: "var(--color-brand-100)",
  },
  muted: {
    glyph: "rgba(90, 95, 104, 0.55)",
    glyphOpacity: 0.1,
    grid: "rgba(90, 95, 104, 0.04)",
    watermark: "rgba(90, 95, 104, 0.08)",
  },
  tracks: {
    glyph: "rgba(42, 75, 203, 0.55)",
    glyphOpacity: 0.11,
    grid: "rgba(42, 75, 203, 0.05)",
    watermark: "var(--color-brand-100)",
  },
  brand: {
    glyph: "rgba(255, 255, 255, 0.85)",
    glyphOpacity: 0.18,
    grid: "rgba(255, 255, 255, 0.08)",
    watermark: "rgba(255,255,255,0.12)",
  },
  dark: {
    glyph: "rgba(126, 151, 240, 0.9)",
    glyphOpacity: 0.14,
    grid: "rgba(255, 255, 255, 0.06)",
    watermark: "rgba(255,255,255,0.06)",
  },
};

export default function MathBackdrop({
  variant = "paper",
  density = "dense",
  clipart = true,
  watermark = true,
  fadeEdges = false,
  /** Push symbols to the outer edges so center text stays readable. */
  contentSafe = false,
  className = "",
}: {
  variant?: BackdropVariant;
  density?: BackdropDensity;
  clipart?: boolean;
  watermark?: boolean;
  /** Soft fade at top/bottom so symbols don't hard-cut section edges. */
  fadeEdges?: boolean;
  contentSafe?: boolean;
  className?: string;
}) {
  const palette = VARIANT_STYLE[variant];
  const baseGlyphs =
    variant === "tracks"
      ? TRACKS_GLYPHS[density]
      : variant === "brand" || variant === "dark"
        ? BRAND_GLYPHS[density]
        : PAPER_GLYPHS[density];
  const glyphs =
    variant === "tracks"
      ? edgeGlyphs(baseGlyphs)
      : contentSafe
        ? [...edgeGlyphs(baseGlyphs), ...INTERIOR_GLYPHS]
        : baseGlyphs;
  const baseClips = CLIPART[density];
  const clips = contentSafe
    ? [...edgeClips(baseClips), ...INTERIOR_CLIPS]
    : baseClips;
  const clipStroke =
    variant === "brand" || variant === "dark"
      ? "rgba(255,255,255,0.22)"
      : "rgba(42, 75, 203, 0.22)";
  const clipAccent = "var(--color-accent-500)";

  const watermarkLayers: {
    char: string;
    style: "center" | "corner-alpha" | "corner-a";
    opacity: number;
    color: string;
    fontSize: string;
  }[] = [];

  if (watermark && contentSafe) {
    watermarkLayers.push({
      char: "α",
      style: "center",
      opacity: 0.22,
      color: palette.watermark,
      fontSize: "min(12rem, 16vw)",
    });
  } else if (watermark && !contentSafe) {
    watermarkLayers.push({
      char: "α",
      style: "corner-alpha",
      opacity: variant === "brand" ? 0.55 : 0.45,
      color: palette.watermark,
      fontSize: "min(22rem, 28vw)",
    });
  }

  if (
    watermark &&
    (variant === "paper" || variant === "muted" || variant === "tracks") &&
    density !== "light" &&
    !contentSafe
  ) {
    watermarkLayers.push({
      char: "A",
      style: "corner-a",
      opacity: 0.35,
      color: "var(--color-accent-100)",
      fontSize: "min(14rem, 18vw)",
    });
  }

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${
        fadeEdges ? "[mask-image:linear-gradient(180deg,transparent,black_8%,black_88%,transparent)]" : ""
      } ${className}`}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${palette.grid} 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <BackdropGlyphLayer
        glyphs={glyphs}
        glyphColor={palette.glyph}
        defaultOpacity={palette.glyphOpacity}
        watermarks={watermarkLayers}
      />

      {/* SVG clipart */}
      {clipart &&
        clips.map((c, i) => (
          <ClipArt
            key={`c-${i}`}
            item={c}
            stroke={c.accent ? clipAccent : clipStroke}
            opacity={c.o ?? (c.accent ? 0.35 : 0.28)}
          />
        ))}
    </div>
  );
}

function ClipArt({
  item,
  stroke,
  opacity,
}: {
  item: Clip;
  stroke: string;
  opacity: number;
}) {
  const style: CSSProperties = {
    top: `${item.top}%`,
    left: `${item.left}%`,
    width: item.size,
    height: item.size,
    transform: `translate(-50%, -50%) rotate(${item.rot ?? 0}deg)`,
    opacity,
    color: stroke,
  };
  return (
    <span className="absolute grid place-items-center" style={style}>
      <ClipIcon kind={item.kind} />
    </span>
  );
}

function ClipIcon({ kind }: { kind: Clip["kind"] }) {
  const props = {
    width: "100%",
    height: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (kind) {
    case "book":
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="12" y1="6" x2="12" y2="14" />
        </svg>
      );
    case "pencil":
      return (
        <svg {...props}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      );
    case "star":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9" />
        </svg>
      );
    case "calc":
      return (
        <svg {...props}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="8" y2="10.01" />
          <line x1="12" y1="10" x2="12" y2="10.01" />
          <line x1="16" y1="10" x2="16" y2="10.01" />
          <line x1="8" y1="14" x2="8" y2="14.01" />
          <line x1="12" y1="14" x2="12" y2="14.01" />
          <line x1="16" y1="14" x2="16" y2="14.01" />
          <line x1="8" y1="18" x2="8" y2="18.01" />
          <line x1="12" y1="18" x2="16" y2="18" />
        </svg>
      );
    case "ruler":
      return (
        <svg {...props}>
          <path d="M2 12h20" />
          <path d="M2 12v-2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" />
          <path d="M6 12v4" />
          <path d="M10 12v4" />
          <path d="M14 12v4" />
          <path d="M18 12v4" />
        </svg>
      );
    case "cap":
      return (
        <svg {...props}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 2 9 2 12 0v-5" />
        </svg>
      );
    case "compass":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "abc":
      return (
        <svg {...props}>
          <path d="M4 18V6l4 8 4-8v12" />
          <path d="M16 12h4" />
          <path d="M18 6v12" />
        </svg>
      );
    default:
      return null;
  }
}

/** Wrapper for sections that need a decorated background. */
export function DecoratedSection({
  variant = "paper",
  density = "dense",
  className = "",
  children,
}: {
  variant?: BackdropVariant;
  density?: BackdropDensity;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <MathBackdrop variant={variant} density={density} />
      <div className="relative">{children}</div>
    </div>
  );
}
