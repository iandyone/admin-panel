import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "next/link.js": "next/link",
      "next/navigation.js": "next/navigation",
    },
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/signup",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
