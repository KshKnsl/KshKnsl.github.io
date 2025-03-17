import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required for static export
  basePath: "/KshKnsl", // ✅ Change this to match your repository name
  images: {
    unoptimized: true, // Fixes image issues in static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "codeforces.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "leetcode.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
