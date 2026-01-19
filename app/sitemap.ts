import { MetadataRoute } from "next";
import { sanity } from "@/lib/sanity.client";
import { POSTS_QUERY } from "@/lib/sanity.queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanity.fetch(POSTS_QUERY);

  return [
    {
      url: "https://ashishnamdeo.com",
      lastModified: new Date(),
    },
    {
      url: "https://ashishnamdeo.com/blog",
      lastModified: new Date(),
    },
    {
      url: "https://ashishnamdeo.com/resume.pdf",
      lastModified: new Date(),
    },
    ...posts.map((post: any) => ({
      url: `https://ashishnamdeo.com/blog/${post.slug}`,
      lastModified: post.publishedAt
        ? new Date(post.publishedAt)
        : new Date(),
    })),
  ];
}
