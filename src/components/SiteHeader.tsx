"use client";

import { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import SiteAnnouncement from "./SiteAnnouncement";

/** Fixed stack: announcement on top, navbar below. Syncs --site-header-offset for layout + scroll. */
export default function SiteHeader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;

    const sync = () => {
      const height = ref.current?.offsetHeight ?? 68;
      root.style.setProperty("--site-header-offset", `${height}px`);
    };

    sync();

    const target = ref.current;
    if (!target) return;

    const ro = new ResizeObserver(sync);
    ro.observe(target);
    window.addEventListener("resize", sync);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
      root.style.removeProperty("--site-header-offset");
    };
  }, []);

  return (
    <div ref={ref} className="site-header fixed top-0 left-0 right-0 z-50 w-full">
      <SiteAnnouncement />
      <Navbar />
    </div>
  );
}
