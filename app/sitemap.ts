export const dynamic = "force-dynamic";

import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import BlogPost from "@/lib/db/models/BlogPost";
import ForumThread from "@/lib/db/models/ForumThread";

const BASE_URL = process.env.NEXTAUTH_URL || "https://kopfueber.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectToDatabase();

  const [products, posts, threads] = await Promise.all([
    Product.find({ published: true }).select("slug updatedAt").lean(),
    BlogPost.find({ published: true }).select("slug publishedAt").lean(),
    ForumThread.find().select("slug categorySlug createdAt").lean(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,            lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/shop`,  lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/blog`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/forum`, lastModified: new Date(), changeFrequency: "daily",   priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/shop/${p.slug}`,
    lastModified: p.updatedAt ?? new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const forumRoutes: MetadataRoute.Sitemap = threads.map((t) => ({
    url: `${BASE_URL}/forum/${t.categorySlug}/${t.slug}`,
    lastModified: t.createdAt ?? new Date(),
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes, ...forumRoutes];
}
