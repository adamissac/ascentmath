import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/metadata";
import { SITE_BRAND_NAME } from "../../lib/site-brand";

export const metadata: Metadata = buildPageMetadata({
  title: "Forgot password",
  description: `Reset your ${SITE_BRAND_NAME} account password.`,
  path: "/forgot-password",
  index: false,
});

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
