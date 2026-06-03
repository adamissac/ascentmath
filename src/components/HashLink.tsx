"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { smoothScrollToHashWhenReady, stashPendingHash } from "../lib/scroll-to-hash";

type HashLinkProps = ComponentProps<typeof Link>;

function parseHref(href: HashLinkProps["href"]) {
  if (typeof href === "string") {
    const hashIndex = href.indexOf("#");
    const pathPart = hashIndex >= 0 ? href.slice(0, hashIndex) || "/" : href;
    const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : "";
    return { pathPart, hash };
  }

  if (href && typeof href === "object") {
    const pathPart = href.pathname ?? "/";
    const rawHash = "hash" in href && typeof href.hash === "string" ? href.hash : "";
    const hash = rawHash.replace(/^#/, "");
    return { pathPart, hash };
  }

  return { pathPart: "/", hash: "" };
}

/** In-app link that smooth-scrolls to a hash on the current or target page. */
export default function HashLink({ href, onClick, ...rest }: HashLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { pathPart, hash } = parseHref(href);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !hash) return;

    e.preventDefault();

    if (pathPart === pathname) {
      requestAnimationFrame(() => smoothScrollToHashWhenReady(hash));
      return;
    }

    stashPendingHash(hash);
    router.push(pathPart, { scroll: false });
  };

  return <Link href={href} scroll={false} onClick={handleClick} {...rest} />;
}
