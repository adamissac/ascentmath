"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealVariant = "rise" | "up" | "up-lg" | "fade" | "left" | "right" | "scale" | "pop";

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  variant = "rise",
  stagger = false,
  threshold = 0.08,
  rootMargin = "0px 0px -8% 0px",
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  stagger?: boolean;
  threshold?: number;
  rootMargin?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || played) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPlayed(true);
      return;
    }

    const play = () => setPlayed(true);

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh && rect.bottom > 0) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [played, threshold, rootMargin]);

  const awaitClass = `reveal-await-${variant}`;

  const classes = [
    className,
    !played ? awaitClass : "",
    stagger ? "reveal-stagger" : "",
    played && !stagger ? `reveal-animate-${variant}` : "",
    played && stagger ? `reveal-stagger-animate-${variant}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const mergedStyle: CSSProperties = {
    ...style,
    ...(delay > 0 && !stagger && played
      ? ({ animationDelay: `${delay}ms` } as CSSProperties)
      : {}),
  };

  return (
    <Tag ref={ref as never} className={classes} style={mergedStyle}>
      {children}
    </Tag>
  );
}
