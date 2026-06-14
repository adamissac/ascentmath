"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const AUTH_PATHS = new Set(["/signup", "/forgot-password"]);

export default function ConditionalFooter() {
  const pathname = usePathname();
  if (AUTH_PATHS.has(pathname)) return null;
  return <Footer />;
}
