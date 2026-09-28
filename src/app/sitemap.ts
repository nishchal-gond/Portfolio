import type { MetadataRoute } from "next";
import { config } from "@/data/config";
import projects from "@/data/projects";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const posts = getPosts();
  const page = (
    path: string,
    priority: number,
    changeFrequency: "monthly" | "yearly" = "monthly"
  ) => ({ url: `${config.site}${path}`, lastModified, changeFrequency, priority });

  return [
    page("", 1),
    page("/about", 0.8),
    page("/projects", 0.8),
    ...projects.map((p) => page(`/projects/${p.id}`, 0.7)),
    ...(posts.length > 0 ? [page("/blog", 0.7)] : []),
    ...posts.map((p) => ({
      url: `${config.site}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    page("/contact", 0.5, "yearly"),
  ];
}
