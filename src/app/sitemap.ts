import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/utils/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  try {
    const response = await fetch(`${baseUrl}/api/content`, { 
      cache: "no-store" 
    });
    const data = await response.json();

    if (data.success && data.data) {
      const contentRoutes = data.data.map((item: { _id: string; type: string; updatedAt: string }) => {
        const path = item.type === "movie" ? "movie" : "series";
        return {
          url: `${baseUrl}/${path}/${item._id}`,
          lastModified: new Date(item.updatedAt || Date.now()),
          changeFrequency: "weekly",
          priority: 0.8,
        };
      });

      return [...staticRoutes, ...contentRoutes];
    }
  } catch (error) {
    console.log("Sitemap: Could not fetch dynamic content, using static routes only");
  }

  return staticRoutes;
}
