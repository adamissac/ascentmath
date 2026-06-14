import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  async redirects() {
    return [
      { source: "/book", destination: "/#book-session", permanent: false },
      { source: "/about", destination: "/", permanent: true },
      { source: "/login", destination: "/signup", permanent: false },
      { source: "/pricing", destination: "/#what-i-teach", permanent: true },
      { source: "/parents", destination: "/#study-paths", permanent: true },
      { source: "/tutoring", destination: "/#what-i-teach", permanent: false },
    ];
  },
};

export default nextConfig;
