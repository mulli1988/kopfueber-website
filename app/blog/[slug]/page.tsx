import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { connectToDatabase } from "@/lib/db/mongodb";
import BlogPost from "@/lib/db/models/BlogPost";
import Badge from "@/components/ui/Badge";
import BlogNewsletterForm from "@/components/blog/BlogNewsletterForm";
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/blog" className="text-sm font-semibold text-[#555555] hover:text-[#222222] no-underline mb-8 inline-block">
        ← Zurück zum Blog
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* Hauptinhalt */}
        <article className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-black leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-sm text-[#555555] mb-8">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("de-DE", {
                  day: "numeric", month: "long", year: "numeric",
                })
              : ""}
          </p>

          {post.coverImage && (
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-10">
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

          <div className="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:font-black
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl">
            <MDXRemote source={post.content} />
          </div>

          {/* Artikel-Footer: Produkt-Bridge + Newsletter */}
          <div className="mt-12 pt-10 border-t-2 border-[#F0DDD8] flex flex-col gap-6">
            <div className="bg-[#FFF5F2] rounded-3xl border-2 border-[#F0DDD8] p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#81ABAD] mb-2">Passende Materialien</p>
              <h3 className="font-display text-xl font-black text-[#222222] mb-2">
                Direkt loslegen?
              </h3>
              <p className="text-[#555555] text-sm leading-relaxed mb-4">
                Diese Materialien passen zum Thema dieses Artikels — sofort druckbereit, kein Design-Aufwand.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-[#81ABAD] text-white font-bold text-sm px-5 py-3 rounded-2xl hover:bg-[#5D8F91] transition-colors no-underline"
              >
                Materialien entdecken
              </Link>
            </div>

            <BlogNewsletterForm />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="sticky top-24 bg-[#FFF5F2] rounded-3xl border-2 border-[#F0DDD8] p-6 text-center">
            <Image
              src="/julia-blog.jpg"
              alt="Julia Flagmeyer"
              width={400}
              height={400}
              className="w-full h-auto rounded-2xl mb-4"
            />
            <h3 className="font-display text-xl font-black text-[#222222] mb-3">
              Hey, schön dass du da bist!
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed mb-4">
              Ich möchte mich von Herzen bei dir für deinen Besuch bedanken.
              Es freut mich, dass du hier bist und meine Beiträge liest. Ich hoffe,
              dass du hier wertvolle Informationen findest und inspirierende
              Geschichten liest. Dein Interesse bedeutet mir viel, und ich freue
              mich darauf, meine Gedanken und Erfahrungen zu teilen.
            </p>
            <p className="text-sm font-bold text-[#555555]">Viel Spaß beim Stöbern!</p>
            <p className="font-display text-lg font-bold text-[#D68876] mt-2">July</p>
          </div>
        </aside>

      </div>
    </div>
  );
}
