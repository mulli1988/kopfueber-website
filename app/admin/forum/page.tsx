import { connectToDatabase } from "@/lib/db/mongodb";
import ForumThread from "@/lib/db/models/ForumThread";
import ForumCategory from "@/lib/db/models/ForumCategory";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ForumModerationButtons from "@/components/admin/ForumModerationButtons";
import ForumCategoryFormButton from "@/components/admin/ForumCategoryFormButton";

export const metadata = { title: "Admin — Forum" };

export default async function AdminForumPage() {
  await connectToDatabase();
  const [threads, categories] = await Promise.all([
    ForumThread.find().sort({ createdAt: -1 }).lean(),
    ForumCategory.find().sort({ order: 1 }).lean(),
  ]);

  return (
    <div>
      <h1 className="font-display text-4xl font-black mb-8">Forum</h1>

      {/* Kategorien */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h2 className="font-display text-xl font-bold">Kategorien</h2>
        <ForumCategoryFormButton />
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Badge key={cat.slug} variant="secondary">{cat.name}</Badge>
        ))}
        {categories.length === 0 && (
          <p className="text-muted-foreground text-sm">Noch keine Kategorien — erstelle die erste!</p>
        )}
      </div>

      {/* Threads */}
      <h2 className="font-display text-xl font-bold mb-4">Alle Threads</h2>
      {threads.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-muted-foreground">Noch keine Threads.</p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b-2 border-dark">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Thread</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Kategorie</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Antworten</th>
                <th className="text-right px-4 py-3 font-semibold">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {threads.map((thread, i) => (
                <tr key={thread._id.toString()} className={i % 2 === 0 ? "bg-surface" : "bg-muted/40"}>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{thread.title}</p>
                    <div className="flex gap-1 mt-1">
                      {thread.pinned && <Badge variant="accent" className="text-[10px]">📌</Badge>}
                      {thread.locked && <Badge variant="muted" className="text-[10px]">🔒</Badge>}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{thread.categorySlug}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{thread.replyCount}</td>
                  <td className="px-4 py-3 text-right">
                    <ForumModerationButtons
                      threadId={thread._id.toString()}
                      pinned={thread.pinned}
                      locked={thread.locked}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
