import type { NextConfig } from "next";

const apiHostname = process.env.NEXT_PUBLIC_API_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ["images.unsplash.com"],
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "www.kallidus.com" },
      ...(apiHostname ? [{ hostname: apiHostname }] : []),
      { hostname: "randomuser.me" },
      { hostname: "api.clarivive.co.uk" },
      { hostname: "127.0.0.1" },
      { hostname: "localhost" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
