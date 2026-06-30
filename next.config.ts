import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { hostname: "avatar.vercel.sh" },
      { hostname: "images.unsplash.com" },
      { hostname: "ui.shadcn.com" },
      { hostname: "github.com" },
    ],
  },
  experimental: {
    turbopack: {
      root: __dirname,
    },
  },
};

export default nextConfig;
