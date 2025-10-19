import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "farmui.vercel.app",
      },
      {
        protocol: "https",
        hostname: "www.launchuicomponents.com",
      },
    ],
  },
};

export default nextConfig;
