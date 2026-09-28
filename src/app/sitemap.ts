import type { MetadataRoute } from "next";
import { config } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: config.site, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${config.site}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${config.site}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${config.site}/contact`, lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
