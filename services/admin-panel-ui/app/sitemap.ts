import type { MetadataRoute } from "next";

const INDEXING_ENABLED = process.env.ENABLE_SEARCH_INDEXING === "true";

function getSiteUrl(): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.SITE_URL ??
    "http://localhost:3000";

  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXING_ENABLED) {
    return [];
  }

  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/signin`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
