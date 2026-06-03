import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: "/book", destination: "/?section=book-session", permanent: false },
      { source: "/pricing", destination: "/#tutoring-tiers", permanent: true },
      { source: "/parents", destination: "/?section=study-paths", permanent: true },
      { source: "/tutoring", destination: "/#what-i-teach", permanent: false },
    ];
  },
};

export default nextConfig;
