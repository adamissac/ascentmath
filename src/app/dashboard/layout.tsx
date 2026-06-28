import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/metadata";
import { SITE_BRAND_NAME } from "../../lib/site-brand";

export const metadata: Metadata = buildPageMetadata({
  title: "Dashboard",
  description: `Your ${SITE_BRAND_NAME} learning dashboard.`,
  path: "/dashboard",
  index: false,
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
