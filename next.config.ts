import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://va.vercel-scripts.com",
  "frame-src https://challenges.cloudflare.com",
  "img-src 'self' https: data: blob:",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://challenges.cloudflare.com https://vitals.vercel-insights.com",
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
      {
        source: "/:path*",
        has: [{ type: "host", value: "adamsalphabet.com" }],
        destination: "https://www.joinascentmath.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.adamsalphabet.com" }],
        destination: "https://www.joinascentmath.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "joinascentmath.com" }],
        destination: "https://www.joinascentmath.com/:path*",
        permanent: true,
      },
      { source: "/newLogo.png", destination: "/ascent-logo.png", permanent: true },
      { source: "/book", destination: "/#book-session", permanent: true },
      { source: "/about", destination: "/#credentials", permanent: true },
      { source: "/login", destination: "/#book-session", permanent: false },
      { source: "/pricing", destination: "/#what-we-teach", permanent: true },
      { source: "/parents", destination: "/#study-paths", permanent: true },
      { source: "/tutoring", destination: "/#what-we-teach", permanent: true },
      ...legacyUnitRedirects,
    ];
  },
};

export default nextConfig;
