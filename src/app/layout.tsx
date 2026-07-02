import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Lexend } from "next/font/google";
import AuthProvider from "../components/AuthProvider";
import HashScrollHandler from "../components/HashScrollHandler";
import Navbar from "../components/Navbar";
import SiteAnnouncement from "../components/SiteAnnouncement";
import ConditionalFooter from "../components/ConditionalFooter";
import { ROOT_METADATA } from "../lib/metadata";
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

export const metadata: Metadata = ROOT_METADATA;

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
          <div className="flex flex-1 flex-col pt-[4.25rem]">
            <SiteAnnouncement />
            <main id="main" className="flex-1">{children}</main>
          </div>
          <ConditionalFooter />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
