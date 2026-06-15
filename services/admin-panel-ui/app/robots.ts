import type { MetadataRoute } from "next";

const INDEXING_ENABLED = process.env.ENABLE_SEARCH_INDEXING === "true";

function getSiteUrl(): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.SITE_URL ??
    "http://localhost:3000";

  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  if (!INDEXING_ENABLED) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/signin"],
      disallow: ["/api/", "/dashboard", "/orders", "/users", "/deactivated"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
