import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
       { hostname: "images.unsplash.com"},
    ],
    unoptimized: true,
  },
};

export default nextConfig;
