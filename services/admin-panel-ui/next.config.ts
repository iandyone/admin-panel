import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "next/link.js": "next/link",
      "next/navigation.js": "next/navigation",
    },
  },
  experimental: {
    authInterrupts: true
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/signin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
