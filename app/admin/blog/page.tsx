export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/db/mongodb";
import BlogPost from "@/lib/db/models/BlogPost";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import BlogFormButton from "@/components/admin/BlogFormButton";
import BlogDeleteButton from "@/components/admin/BlogDeleteButton";

export const metadata = { title: "Admin — Blog" };

export default async function AdminBlogPage() {
  await connectToDatabase();
  const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-display text-4xl font-black">Blog</h1>
        <BlogFormButton />
      </div>

      {posts.length === 0 ? (
        <Card className="text-center py-16">
          <p className="text-4xl mb-3">✍️</p>
          <p className="font-display text-xl font-bold mb-2">Noch keine Beiträge</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <Card key={post._id.toString()} className="flex items-center justify-between gap-4 flex-wrap py-4">
              <div>
                <p className="font-semibold">{post.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("de-DE")
                    : "Nicht veröffentlicht"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={post.published ? "secondary" : "muted"}>
                  {post.published ? "Live" : "Entwurf"}
                </Badge>
                <BlogFormButton post={{
                  _id: post._id.toString(),
                  title: post.title,
                  excerpt: post.excerpt,
                  content: post.content,
                  tags: post.tags,
                  published: post.published,
                  coverImage: post.coverImage,
                }} />
                <BlogDeleteButton postId={post._id.toString()} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
