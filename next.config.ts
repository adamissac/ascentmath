import type { NextConfig } from "next";

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
];

const nextConfig: NextConfig = {
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
    return [
      { source: "/book", destination: "/#book-session", permanent: false },
      { source: "/about", destination: "/", permanent: true },
      { source: "/login", destination: "/signup", permanent: false },
      { source: "/pricing", destination: "/#what-we-teach", permanent: true },
      { source: "/parents", destination: "/#study-paths", permanent: true },
      { source: "/tutoring", destination: "/#what-we-teach", permanent: false },
    ];
  },
};

export default nextConfig;
