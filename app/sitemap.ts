import { MetadataRoute } from "next";

import { allDocs, allPosts } from "contentlayer/generated";

import { env } from "@/env.mjs";

const ALTERNATIVES = ["intercom", "zendesk", "freshdesk"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = env.NEXT_PUBLIC_APP_URL;

  // Static marketing pages
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/blog",
    "/docs",
    "/integrations",
    "/terms",
    "/privacy",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = allPosts
    .filter((post) => post.published !== false)
    .map((post) => ({
      url: `${siteUrl}${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // Documentation pages
  const docPages: MetadataRoute.Sitemap = allDocs
    .filter((doc) => doc.published !== false)
    .map((doc) => ({
      url: `${siteUrl}${doc.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  // Alternatives pages
  const alternativePages: MetadataRoute.Sitemap = ALTERNATIVES.map((slug) => ({
    url: `${siteUrl}/alternatives/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages, ...docPages, ...alternativePages];
}
