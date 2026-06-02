"use client";

import { useEffect, useRef } from "react";

const SYMBOLS = [
  "π", "√", "Σ", "θ", "x²", "≠", "∫", "÷", "≤", "%", "+", "−",
  "α", "β", "Δ", "λ", "φ", "≈", "∑", "°", "½", "∂", "∞", "³", "²",
  "×", "±", "→", "△", "□", "∝", "⊥", "∥",
];

const INK = "#1a1a2e";
const ACCENT = "#2A4BCB";

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

function spawn(width: number, height: number, fromBottom = true): Particle {
  const highlight = Math.random() < 0.18;
  return {
    x: rand(0, width),
    y: fromBottom ? height + rand(20, 110) : rand(0, height),
    size: rand(14, 46),
    baseOpacity: highlight ? rand(0.14, 0.26) : rand(0.08, 0.18),
    speed: rand(0.3, 0.7),
    phase: rand(0, Math.PI * 2),
    wobbleAmp: rand(0.4, 1.5),
    char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]!,
    rotation: rand(0, Math.PI * 2),
    rotSpeed: rand(-0.004, 0.004),
    driftX: rand(-0.1, 0.1),
    accent: highlight,
  };
}

function countFor(width: number) {
  if (width < 480) return 42;
  if (width < 900) return 64;
  return 82;
}

function fadeAlpha(y: number, height: number, base: number) {
  const edge = height * 0.1;
  if (y > height - edge) return base * ((height - y) / edge);
  if (y < edge) return base * (y / edge);
  return base;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      if (rect.width < 2 || rect.height < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = countFor(width);
      if (particles.length !== target) {
        particles = Array.from({ length: target }, () => spawn(width, height, false));
      }
    };

    const draw = () => {
      if (width < 1 || height < 1) return;
      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const p of particles) {
        const wobble = Math.sin(time * 0.004 + p.phase) * p.wobbleAmp;
        const drawX = p.x + wobble;
        const alpha = fadeAlpha(p.y, height, p.baseOpacity);
        if (alpha < 0.01) continue;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.accent ? ACCENT : INK;
        ctx.save();
        ctx.translate(drawX, p.y);
        ctx.rotate(p.rotation);
        ctx.font = font(p.size);
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
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
        for (const p of particles) {
          p.y -= p.speed * delta;
          p.x += (p.driftX + Math.sin(time * 0.003 + p.phase) * 0.04) * delta;
          p.rotation += p.rotSpeed * delta;
          if (p.x < -40) p.x = width + 30;
          if (p.x > width + 40) p.x = -30;
          if (p.y < -p.size - 12) Object.assign(p, spawn(width, height, true));
        }
      }

      draw();
    };

    const start = () => {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      resize();
      draw();
      frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const visObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );

    resize();
    draw();
    visObs.observe(wrap);

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(wrap);
    window.addEventListener("resize", resize);

    requestAnimationFrame(() => {
      resize();
      draw();
      start();
    });

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      ro.disconnect();
      visObs.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-canvas-wrap" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="hero-canvas-vignette" />
    </div>
  );
}
