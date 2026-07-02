import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.gstatic.com https://apis.google.com https://va.vercel-scripts.com https://www.googletagmanager.com",
  "frame-src https://www.youtube.com https://challenges.cloudflare.com https://accounts.google.com https://*.firebaseapp.com",
  "img-src 'self' https: data: blob:",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com https://challenges.cloudflare.com https://vitals.vercel-insights.com",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
      { protocol: "https", hostname: "drive.google.com", pathname: "/**" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    const legacyUnitRedirects = Array.from({ length: 7 }, (_, i) => ({
      source: `/mathematics/unit-${i + 1}`,
      destination: `/mathematics/grade-6/unit-${i + 1}`,
      permanent: true,
    }));

    return [
      { source: "/book", destination: "/#book-session", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/login", destination: "/signup", permanent: false },
      { source: "/pricing", destination: "/#what-we-teach", permanent: true },
      { source: "/parents", destination: "/#study-paths", permanent: true },
      { source: "/tutoring", destination: "/#what-we-teach", permanent: true },
      ...legacyUnitRedirects,
    ];
  },
};

export default nextConfig;
