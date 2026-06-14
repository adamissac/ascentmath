"use client";

import { useEffect, useRef } from "react";

export type BackdropGlyph = {
  ch: string;
  top: number;
  left: number;
  size: number;
  rot?: number;
  o?: number;
  font?: "display" | "sans";
  tint?: "blue" | "orange" | "gray";
};

type Props = {
  glyphs: BackdropGlyph[];
  glyphColor: string;
  defaultOpacity: number;
};

const TINT: Record<NonNullable<BackdropGlyph["tint"]>, { color: string; opacity: number }> = {
  blue: { color: "rgba(42, 75, 203, 0.7)", opacity: 0.12 },
  orange: { color: "rgba(244, 123, 22, 0.75)", opacity: 0.11 },
  gray: { color: "rgba(90, 95, 104, 0.65)", opacity: 0.1 },
};

/**
 * Renders decorative math glyphs on canvas so symbols never appear as DOM text
 * (avoids scraper leaks and screen-reader noise).
 */
export default function BackdropGlyphLayer({
  glyphs,
  glyphColor,
  defaultOpacity,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (const g of glyphs) {
        const tint = g.tint ? TINT[g.tint] : null;
        const x = (g.left / 100) * w;
        const y = (g.top / 100) * h;
        const sizePx = g.size * 16;
        const opacity = g.o ?? tint?.opacity ?? defaultOpacity;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(((g.rot ?? 0) * Math.PI) / 180);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = tint?.color ?? glyphColor;
        ctx.font = `700 ${sizePx}px ${g.font === "sans" ? "Inter, sans-serif" : "Georgia, serif"}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(g.ch, 0, 0);
        ctx.restore();
      }

      ctx.globalAlpha = 1;
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [glyphs, glyphColor, defaultOpacity]);

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
