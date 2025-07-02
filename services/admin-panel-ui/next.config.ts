import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "next/link.js": "next/link",
      "next/navigation.js": "next/navigation",
    },
  },
};

export default nextConfig;
