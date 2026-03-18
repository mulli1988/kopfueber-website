export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db/mongodb";
import ForumCategory from "@/lib/db/models/ForumCategory";
import ForumThread from "@/lib/db/models/ForumThread";
import User from "@/lib/db/models/User";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import NewThreadButton from "@/components/forum/NewThreadButton";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function ForumCategoryPage({ params }: Props) {
  const { category } = await params;
  await connectToDatabase();

  const cat = await ForumCategory.findOne({ slug: category }).lean();
  if (!cat) notFound();

  const threads = await ForumThread.find({ categorySlug: category })
    .sort({ pinned: -1, lastReplyAt: -1 })
    .lean();

  const authorIds = [...new Set(threads.map((t) => t.authorId.toString()))];
  const authors = await User.find({ _id: { $in: authorIds } }).lean();
  const authorMap = Object.fromEntries(authors.map((a) => [a._id.toString(), a.name]));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/forum" className="text-sm font-semibold text-muted-foreground hover:text-foreground no-underline mb-6 inline-block">
        ← Zurück zum Forum
      </Link>

      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-4xl font-black">{cat.name}</h1>
          <p className="text-muted-foreground mt-1">{cat.description}</p>
        </div>
        <NewThreadButton categorySlug={cat.slug} />
      </div>

      {threads.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-muted-foreground">Noch keine Threads — sei der Erste!</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {threads.map((thread) => (
            <Link
              key={thread._id.toString()}
              href={`/forum/${category}/${thread.slug}`}
              className="no-underline block group"
            >
              <Card hover className="flex items-center justify-between gap-4 flex-wrap py-4">
                <div className="flex items-start gap-3">
                  {thread.pinned && <Badge variant="accent">📌</Badge>}
                  {thread.locked && <Badge variant="muted">🔒</Badge>}
                  <div>
                    <p className="font-semibold group-hover:text-primary transition-colors">
                      {thread.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      von {authorMap[thread.authorId.toString()] ?? "Unbekannt"} ·{" "}
                      {new Date(thread.createdAt).toLocaleDateString("de-DE")}
                    </p>
                  </div>
                </div>
                <Badge variant="muted">{thread.replyCount} Antworten</Badge>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
