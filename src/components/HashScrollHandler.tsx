"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  shouldResetHomeOnReload,
  smoothScrollToHashWhenReady,
  takePendingHash,
} from "../lib/scroll-to-hash";

function HashScrollHandlerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handledSectionRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      // Full refresh only (once) — open at the hero, not the last #section.
      if (shouldResetHomeOnReload()) {
        takePendingHash();
        const hadDeepLink =
          window.location.hash.length > 1 || searchParams.has("section");
        if (hadDeepLink) {
          window.history.replaceState(null, "", "/");
        }
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }

      const section = searchParams.get("section");
      if (section) {
        if (handledSectionRef.current !== section) {
          handledSectionRef.current = section;
          const hash = `#${encodeURIComponent(section)}`;
          if (window.location.hash !== hash || window.location.search.includes("section=")) {
            window.history.replaceState(null, "", `/${hash}`);
          }
        }
        return smoothScrollToHashWhenReady(section);
      }

      handledSectionRef.current = null;
    }

    const pending = takePendingHash();
    if (pending) {
      return smoothScrollToHashWhenReady(pending);
    }

    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    const rawId = decodeURIComponent(hash.slice(1));
    const id = rawId === "what-i-teach" ? "what-we-teach" : rawId;
    if (id !== rawId) {
      window.history.replaceState(null, "", `/#${id}`);
    }
    return smoothScrollToHashWhenReady(id);
  }, [pathname, searchParams]);

  return null;
}

/** Smooth-scroll to #id after client navigation (App Router often skips hash scroll). */
export default function HashScrollHandler() {
  return (
    <Suspense fallback={null}>
      <HashScrollHandlerInner />
    </Suspense>
  );
}
