import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";

const BASE_URL = "https://vrinthai.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/contact",
    "/blog",
    "/visa-thailande",
    "/permis-travail",
    "/logement",
    "/ou-vivre",
    "/ecoles",
    "/entreprendre",
    "/cout-vie",
    "/assurance-sante",
    "/retraite",
    "/permis-conduire",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
