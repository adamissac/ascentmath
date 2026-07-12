"use client";

import { useEffect, useRef } from "react";

export type FloatingMathVariant = "home" | "compass" | "grade";

type Motion = "rise" | "fall" | "drift" | "diagonal";

type Placement = "full" | "margins";

type VariantConfig = {
  symbols: string[];
  ink: string;
  accent: string;
  accentRate: number;
  counts: [number, number, number];
  opacity: [number, number, number];
  speed: [number, number];
  size: [number, number];
  wobble: [number, number];
  driftX: [number, number];
  rotSpeed: [number, number];
  motion: Motion;
  placement: Placement;
  vignette: string;
};

const VARIANTS: Record<FloatingMathVariant, VariantConfig> = {
  home: {
    symbols: ["π", "√", "Σ", "θ", "x²", "≠", "∫", "÷", "≤", "%", "+", "−", "α", "β", "Δ", "λ", "φ", "≈", "∑", "°", "½", "∂", "∞"],
    ink: "#1a1a2e",
    accent: "#C58F28",
    accentRate: 0.18,
    counts: [32, 48, 58],
    opacity: [0.11, 0.2, 0.3],
    speed: [0.3, 0.7],
    size: [14, 46],
    wobble: [0.4, 1.5],
    driftX: [-0.1, 0.1],
    rotSpeed: [-0.004, 0.004],
    motion: "rise",
    placement: "full",
    vignette: "hero-canvas-vignette--warm",
  },
  compass: {
    symbols: ["→", "←", "△", "▽", "?", "%", "+", "−", "≈", "·", "○", "□", "½", "°"],
    ink: "#1a1a2e",
    accent: "#C58F28",
    accentRate: 0.1,
    counts: [16, 24, 30],
    opacity: [0.06, 0.11, 0.18],
    speed: [0.18, 0.38],
    size: [11, 28],
    wobble: [0.2, 0.7],
    driftX: [-0.05, 0.05],
    rotSpeed: [0, 0],
    motion: "fall",
    placement: "margins",
    vignette: "hero-canvas-vignette--paper",
  },
  grade: {
    symbols: ["π", "√", "Σ", "θ", "x²", "+", "−", "÷", "=", "∞", "λ", "φ", "°", "½"],
    ink: "#1a1a2e",
    accent: "#C58F28",
    accentRate: 0.1,
    counts: [16, 24, 30],
    opacity: [0.05, 0.1, 0.16],
    speed: [0.15, 0.32],
    size: [12, 32],
    wobble: [0.35, 1],
    driftX: [-0.06, 0.06],
    rotSpeed: [-0.002, 0.002],
    motion: "rise",
    placement: "margins",
    vignette: "hero-canvas-vignette--paper",
  },
};

type Particle = {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  speed: number;
  phase: number;
  wobbleAmp: number;
  char: string;
  rotation: number;
  rotSpeed: number;
  driftX: number;
  accent: boolean;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function countFor(width: number, counts: [number, number, number]) {
  if (width < 480) return counts[0];
  if (width < 900) return counts[1];
  return counts[2];
}

/** Spread across the full hero (landing page). */
function fullPosition(width: number, height: number, motion: Motion, edge: "start" | "random") {
  const pad = 8;
  let x = rand(pad, Math.max(pad + 1, width - pad));
  let y: number;

  if (edge === "start") {
    if (motion === "fall") y = rand(-90, -pad);
    else if (motion === "drift") {
      y = rand(pad, height - pad);
      x = rand(-80, -8);
    } else y = height + rand(pad, 90);
  } else {
    y = rand(pad, height - pad);
  }

  return { x, y };
}

/** Keep symbols in margins so hero copy stays readable. */
function marginPosition(width: number, height: number, motion: Motion, edge: "start" | "random") {
  const pad = 8;
  const side = Math.random() < 0.5 ? "left" : "right";
  const x =
    side === "left"
      ? rand(pad, width * 0.2)
      : rand(width * 0.8, Math.max(width * 0.8 + 1, width - pad));

  let y: number;
  if (edge === "start") {
    if (motion === "fall") y = rand(-90, -pad);
    else if (motion === "drift") y = rand(pad, height - pad);
    else y = height + rand(pad, 90);
  } else {
    const band = Math.random();
    if (band < 0.35) y = rand(pad, height * 0.22);
    else if (band < 0.7) y = rand(height * 0.78, height - pad);
    else y = rand(pad, height - pad);
  }

  return { x, y };
}

function fadeAlpha(y: number, height: number, base: number, motion: Motion) {
  const edge = height * 0.08;
  if (motion === "fall") {
    if (y > height - edge) return base * ((height - y) / edge);
    return base;
  }
  if (motion === "drift") return base;
  if (y > height - edge) return base * ((height - y) / edge);
  if (y < edge) return base * (y / edge);
  return base;
}

function spawn(
  cfg: VariantConfig,
  width: number,
  height: number,
  edge: "start" | "random",
): Particle {
  const highlight = Math.random() < cfg.accentRate;
  const position =
    cfg.placement === "full" ? fullPosition : marginPosition;
  const { x, y } = position(width, height, cfg.motion, edge);

  return {
    x,
    y,
    size: rand(cfg.size[0], cfg.size[1]),
    baseOpacity: highlight ? rand(cfg.opacity[1], cfg.opacity[2]) : rand(cfg.opacity[0], cfg.opacity[1]),
    speed: rand(cfg.speed[0], cfg.speed[1]),
    phase: rand(0, Math.PI * 2),
    wobbleAmp: rand(cfg.wobble[0], cfg.wobble[1]),
    char: cfg.symbols[Math.floor(Math.random() * cfg.symbols.length)]!,
    rotation: rand(0, Math.PI * 2),
    rotSpeed: rand(cfg.rotSpeed[0], cfg.rotSpeed[1]),
    driftX: rand(cfg.driftX[0], cfg.driftX[1]),
    accent: highlight,
  };
}

function respawn(cfg: VariantConfig, p: Particle, width: number, height: number) {
  Object.assign(p, spawn(cfg, width, height, "start"));
}

function clampToMargins(p: Particle, width: number, height: number) {
  const pad = 6;
  if (p.x > width * 0.28 && p.x < width * 0.72) {
    p.x = p.x < width / 2 ? width * 0.2 : width * 0.8;
  }
  if (p.x < pad) p.x = pad;
  if (p.x > width - pad) p.x = width - pad;
  if (p.y < pad) p.y = pad;
  if (p.y > height - pad) p.y = height - pad;
}

type FloatingMathCanvasProps = {
  variant: FloatingMathVariant;
  className?: string;
};

export default function FloatingMathCanvas({
  variant,
  className = "",
}: FloatingMathCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cfgMeta = VARIANTS[variant];
  const vignetteClass = cfgMeta.vignette;
  const wrapClass =
    cfgMeta.placement === "margins"
      ? "hero-canvas-wrap hero-canvas-wrap--margins"
      : "hero-canvas-wrap";

  useEffect(() => {
    const cfg = VARIANTS[variant];
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fonts = new Map<number, string>();

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frameId = 0;
    let time = 0;
    let lastFrame = performance.now();
    let running = false;
    let layoutAttempts = 0;

    const font = (size: number) => {
      const key = Math.round(size);
      let f = fonts.get(key);
      if (!f) {
        f = `700 ${key}px Georgia, "Times New Roman", serif`;
        fonts.set(key, f);
      }
      return f;
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return false;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = countFor(width, cfg.counts);
      if (particles.length !== target) {
        particles = Array.from({ length: target }, () =>
          spawn(cfg, width, height, "random"),
        );
      }
      return true;
    };

    const draw = () => {
      if (width < 1 || height < 1) return;
      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const p of particles) {
        const wobble = Math.sin(time * 0.004 + p.phase) * p.wobbleAmp;
        const drawX = p.x + wobble;
        const alpha = fadeAlpha(p.y, height, p.baseOpacity, cfg.motion);
        if (alpha < 0.01) continue;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.accent ? cfg.accent : cfg.ink;
        ctx.save();
        ctx.translate(drawX, p.y);
        if (p.rotSpeed !== 0) ctx.rotate(p.rotation);
        ctx.font = font(p.size);
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    const step = (p: Particle, delta: number) => {
      const wobbleX = Math.sin(time * 0.003 + p.phase) * 0.04;

      switch (cfg.motion) {
        case "fall":
          p.y += p.speed * delta;
          p.x += (p.driftX + wobbleX * 0.5) * delta;
          if (p.y > height + p.size + 16) respawn(cfg, p, width, height);
          break;
        case "drift":
          p.x += (p.driftX + wobbleX) * delta * 1.4;
          p.y += Math.sin(time * 0.002 + p.phase) * 0.03 * delta;
          if (p.x < -50) {
            Object.assign(p, spawn(cfg, width, height, "start"));
            p.x = width + rand(8, 40);
          } else if (p.x > width + 50) {
            Object.assign(p, spawn(cfg, width, height, "start"));
            p.x = rand(-40, -8);
          }
          break;
        case "diagonal":
          p.y -= p.speed * 0.65 * delta;
          p.x += (p.driftX + wobbleX * 0.35) * delta;
          if (p.y < -p.size - 12) respawn(cfg, p, width, height);
          if (p.x < -50) p.x = width * 0.82;
          break;
        case "rise":
        default:
          p.y -= p.speed * delta;
          p.x += (p.driftX + wobbleX) * delta;
          if (p.y < -p.size - 12) respawn(cfg, p, width, height);
          if (cfg.placement === "full") {
            if (p.x < -40) p.x = width + 30;
            if (p.x > width + 40) p.x = -30;
          } else {
            if (p.x < -40) p.x = width * 0.18;
            if (p.x > width + 40) p.x = width * 0.82;
          }
          break;
      }

      if (cfg.placement === "margins") clampToMargins(p, width, height);
      if (p.rotSpeed !== 0) p.rotation += p.rotSpeed * delta;
    };

    const tick = (now: number) => {
      if (!running) return;
      frameId = requestAnimationFrame(tick);

      const elapsed = now - lastFrame;
      if (elapsed < 1000 / 30) return;
      lastFrame = now;

      if (!reduced) {
        const delta = Math.min(32, elapsed) / 16.667;
        time += delta;
        for (const p of particles) step(p, delta);
      }

      draw();
    };

    const ensureLayout = () => {
      if (resize()) {
        draw();
        return;
      }
      if (layoutAttempts < 12) {
        layoutAttempts += 1;
        requestAnimationFrame(ensureLayout);
      }
    };

    const start = () => {
      if (running) return;
      ensureLayout();
      if (reduced) return;
      running = true;
      lastFrame = performance.now();
      frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const visObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.05) start();
        else stop();
      },
      { threshold: [0, 0.05, 0.15], rootMargin: "0px" },
    );

    ensureLayout();
    visObs.observe(wrap);

    const ro = new ResizeObserver(() => {
      if (resize()) draw();
    });
    ro.observe(wrap);
    const onWindowResize = () => {
      if (resize()) draw();
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      stop();
      window.removeEventListener("resize", onWindowResize);
      ro.disconnect();
      visObs.disconnect();
    };
  }, [variant]);

  return (
    <div
      ref={wrapRef}
      className={[wrapClass, className].filter(Boolean).join(" ")}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className={vignetteClass} />
    </div>
  );
}
