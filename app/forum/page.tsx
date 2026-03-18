export const dynamic = "force-dynamic";

import Link from "next/link";
import { connectToDatabase } from "@/lib/db/mongodb";
import ForumCategory from "@/lib/db/models/ForumCategory";
import ForumThread from "@/lib/db/models/ForumThread";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export const metadata = {
  title: "Forum",
  description: "Die Kopfüber Community — tausch dich aus, stell Fragen, teile deine Gedanken.",
};

export default async function ForumPage() {
  await connectToDatabase();
  const categories = await ForumCategory.find().sort({ order: 1 }).lean();

  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => {
      const threadCount = await ForumThread.countDocuments({ categorySlug: cat.slug });
      const latest = await ForumThread.findOne({ categorySlug: cat.slug })
        .sort({ lastReplyAt: -1 })
        .lean();
      return { ...cat, threadCount, latest };
    })
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="font-display text-5xl font-black mb-2">Community</h1>
        <p className="text-muted-foreground">Tausch dich aus, stell Fragen, teile deine Gedanken.</p>
      </div>

      {categoriesWithCounts.length === 0 ? (
        <Card className="text-center py-16">
          <p className="text-4xl mb-4">💬</p>
          <p className="font-display text-2xl font-bold mb-2">Noch keine Kategorien</p>
          <p className="text-muted-foreground">Das Forum wird bald eingerichtet.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {categoriesWithCounts.map((cat) => (
            <Link key={cat.slug} href={`/forum/${cat.slug}`} className="no-underline block group">
              <Card hover className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge variant="muted">{cat.threadCount} Threads</Badge>
                  {cat.latest && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Zuletzt: {new Date(cat.latest.lastReplyAt).toLocaleDateString("de-DE")}
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
