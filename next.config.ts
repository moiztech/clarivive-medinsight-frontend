import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ["images.unsplash.com"],
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "www.kallidus.com" },
      { hostname: process.env.NEXT_PUBLIC_API_BASE_URL as string },
      { hostname: "randomuser.me" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
