import Link from "next/link";
import Image from "next/image";
import { connectToDatabase } from "@/lib/db/mongodb";
import BlogPost from "@/lib/db/models/BlogPost";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export const metadata = {
  title: "Blog",
  description: "Neuigkeiten, Einblicke und Geschichten rund um Kopfüber.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  await connectToDatabase();
  const posts = await BlogPost.find({ published: true })
    .sort({ publishedAt: -1 })
    .lean();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-5xl font-black mb-2">Blog</h1>
      <p className="text-muted-foreground mb-10">Einblicke, Geschichten & Neuigkeiten.</p>

      {posts.length === 0 ? (
        <Card className="text-center py-16">
          <p className="text-4xl mb-4">✍️</p>
          <p className="font-display text-2xl font-bold mb-2">Noch keine Beiträge</p>
          <p className="text-muted-foreground">Schau bald wieder vorbei!</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link key={post._id.toString()} href={`/blog/${post.slug}`} className="no-underline block group">
              <Card hover className="p-0 overflow-hidden flex flex-col sm:flex-row">
                {post.coverImage && (
                  <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0 border-b-2 sm:border-b-0 sm:border-r-2 border-dark">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 256px"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="muted">{tag}</Badge>
                    ))}
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("de-DE", {
                          day: "numeric", month: "long", year: "numeric",
                        })
                      : ""}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
