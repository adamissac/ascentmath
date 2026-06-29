import type { Metadata } from "next";
import { buildPageMetadata } from "../../lib/metadata";
import { SITE_BRAND_NAME } from "../../lib/site-brand";

export const metadata: Metadata = buildPageMetadata({
  title: "Sign up",
  description: `Create an ${SITE_BRAND_NAME} account.`,
  path: "/signup",
  index: false,
});

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
