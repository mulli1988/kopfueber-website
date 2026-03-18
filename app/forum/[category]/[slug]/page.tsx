export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { connectToDatabase } from "@/lib/db/mongodb";
import ForumThread from "@/lib/db/models/ForumThread";
import ForumPost from "@/lib/db/models/ForumPost";
import User from "@/lib/db/models/User";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ReplyForm from "@/components/forum/ReplyForm";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export default async function ForumThreadPage({ params }: Props) {
  const { category, slug } = await params;
  await connectToDatabase();

  const thread = await ForumThread.findOne({ categorySlug: category, slug }).lean();
  if (!thread) notFound();

  const posts = await ForumPost.find({ threadId: thread._id })
    .sort({ createdAt: 1 })
    .lean();

  const authorIds = [...new Set(posts.map((p) => p.authorId.toString()))];
  const authors = await User.find({ _id: { $in: authorIds } }).lean();
  const authorMap = Object.fromEntries(authors.map((a) => [a._id.toString(), a.name]));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href={`/forum/${category}`}
        className="text-sm font-semibold text-muted-foreground hover:text-foreground no-underline mb-6 inline-block"
      >
        ← Zurück zur Kategorie
      </Link>

      <div className="mb-8">
        <div className="flex gap-2 mb-3">
          {thread.pinned && <Badge variant="accent">📌 Angepinnt</Badge>}
          {thread.locked && <Badge variant="muted">🔒 Gesperrt</Badge>}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black">{thread.title}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          {thread.replyCount} Antworten · erstellt {new Date(thread.createdAt).toLocaleDateString("de-DE")}
        </p>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-4 mb-10">
        {posts.map((post, i) => (
          <Card
            key={post._id.toString()}
            className={i === 0 ? "border-primary" : ""}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                  {(authorMap[post.authorId.toString()] ?? "?")[0].toUpperCase()}
                </div>
                <span className="font-semibold text-sm">
                  {authorMap[post.authorId.toString()] ?? "Unbekannt"}
                </span>
                {i === 0 && <Badge variant="primary">OP</Badge>}
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("de-DE", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </span>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
          </Card>
        ))}
      </div>

      {/* Reply form */}
      {!thread.locked && (
        <ReplyForm threadId={thread._id.toString()} />
      )}
    </div>
  );
}
