import { MetadataRoute } from "next";
import { sanity } from "@/lib/sanity.client";
import { POSTS_QUERY } from "@/lib/sanity.queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanity.fetch(POSTS_QUERY);
  const SITE_LAST_UPDATED = new Date("2026-01-21T00:00:00Z"); 
  const RESUME_LAST_UPDATED = new Date("2026-01-18T00:00:00Z");

  return [
    {
      url: "https://ashishnamdeo.com",
      lastModified: SITE_LAST_UPDATED,
    },

    // Landing page section URLs (same page, different routes)
    {
      url: "https://ashishnamdeo.com/about",
      lastModified: SITE_LAST_UPDATED,
    },
    {
      url: "https://ashishnamdeo.com/projects",
      lastModified: SITE_LAST_UPDATED,
    },
    {
      url: "https://ashishnamdeo.com/skills",
      lastModified: SITE_LAST_UPDATED,
    },
    {
      url: "https://ashishnamdeo.com/experience",
      lastModified: SITE_LAST_UPDATED,
    },
    {
      url: "https://ashishnamdeo.com/contact",
      lastModified: SITE_LAST_UPDATED,
    },

    // Blog
    {
      url: "https://ashishnamdeo.com/blog",
      lastModified: new Date(),
    },

    // Resume
    {
      url: "https://ashishnamdeo.com/resume.pdf",
      lastModified: RESUME_LAST_UPDATED,
    },

    // Blog posts from Sanity
    ...posts.map((post: any) => ({
      url: `https://ashishnamdeo.com/blog/${post.slug}`,
      lastModified: post.publishedAt
        ? new Date(post.publishedAt)
        : new Date(),
    })),
  ];
}
