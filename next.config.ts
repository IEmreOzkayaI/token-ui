import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
