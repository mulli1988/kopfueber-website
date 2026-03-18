import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { connectToDatabase } from "@/lib/db/mongodb";
import BlogPost from "@/lib/db/models/BlogPost";
import Badge from "@/components/ui/Badge";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const post = await BlogPost.findOne({ slug, published: true }).lean();
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.coverImage ? { images: [post.coverImage] } : {},
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const post = await BlogPost.findOne({ slug, published: true }).lean();
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Back */}
      <Link href="/blog" className="text-sm font-semibold text-muted-foreground hover:text-foreground no-underline mb-8 inline-block">
        ← Zurück zum Blog
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag: string) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className="font-display text-4xl sm:text-5xl font-black leading-tight mb-4">
        {post.title}
      </h1>

      {/* Date */}
      <p className="text-sm text-muted-foreground mb-8">
        {post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("de-DE", {
              day: "numeric", month: "long", year: "numeric",
            })
          : ""}
      </p>

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative w-full aspect-video rounded-[var(--radius-xl)] overflow-hidden border-2 border-dark mb-10">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none
        prose-headings:font-display prose-headings:font-black
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-xl prose-img:border-2 prose-img:border-dark">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
