import type { Metadata, Viewport } from "next";
import { Inter, Lexend } from "next/font/google";
import AuthProvider from "../components/AuthProvider";
import HashScrollHandler from "../components/HashScrollHandler";
import Navbar from "../components/Navbar";
import ConditionalFooter from "../components/ConditionalFooter";
import { SITE_POSITIONING } from "../data/site-copy";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adamsalphabet.com"),
  title: {
    default: "Adam's Alphabet - Math Tutor (K-6 through College)",
    template: "%s · Adam's Alphabet",
  },
  description: SITE_POSITIONING,
  keywords: [
    "math tutor",
    "math tutoring",
    "SAT math tutor",
    "AP pre-calculus tutor",
    "AP calculus tutor",
    "linear algebra tutor",
    "multivariable calculus tutor",
    "Atlanta math tutor",
  ],
  openGraph: {
    title: "Adam's Alphabet - Math Tutor (K-6 through College)",
    description: SITE_POSITIONING,
    type: "website",
    siteName: "Adam's Alphabet",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#FBFAF7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${lexend.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <a href="#main" className="skip-link">Skip to main content</a>
        <AuthProvider>
          <HashScrollHandler />
          <Navbar />
          <main id="main" className="flex-1 pt-[4.25rem]">{children}</main>
          <ConditionalFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
