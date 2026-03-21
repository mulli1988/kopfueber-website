export const dynamic = "force-dynamic";

import Link from "next/link";
import { connectToDatabase } from "@/lib/db/mongodb";
import ForumThread from "@/lib/db/models/ForumThread";
import ForumCategory from "@/lib/db/models/ForumCategory";
import ForumModerationButtons from "@/components/admin/ForumModerationButtons";

export const metadata = { title: "Admin — Forum" };

export default async function AdminForumPage() {
  await connectToDatabase();
  const [threads, categories] = await Promise.all([
    ForumThread.find().sort({ createdAt: -1 }).lean(),
    ForumCategory.find().sort({ order: 1 }).lean(),
  ]);

  const categoryNameMap = Object.fromEntries(categories.map((c) => [c.slug, c.name]));

  return (
    <div>
      <h1 className="font-display text-4xl font-black mb-2">Forum-Moderation</h1>
      <p className="text-[#888] mb-8">
        Hier siehst du alle Beiträge aus dem Forum. Du kannst Beiträge{" "}
        <strong>anpinnen</strong> (erscheinen ganz oben in der Kategorie),{" "}
        <strong>sperren</strong> (niemand kann mehr antworten) oder{" "}
        <strong>löschen</strong>.
      </p>

      {/* Kategorien-Übersicht */}
      <div className="mb-10">
        <h2 className="font-display text-xl font-bold mb-4">Kategorien</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/forum/${cat.slug}`}
              target="_blank"
              className="no-underline bg-white rounded-xl border-2 border-[#F0DDD8] px-4 py-3 hover:border-[#81ABAD] transition-all"
            >
              <p className="font-semibold text-[#222] text-sm">{cat.name}</p>
              <p className="text-xs text-[#888] mt-0.5">
                {cat.section === "kita" ? "Kitas & Erzieher" : "Eltern & Familien"} · {threads.filter(t => t.categorySlug === cat.slug).length} Threads
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Threads */}
      <h2 className="font-display text-xl font-bold mb-4">
        Alle Beiträge{" "}
        <span className="text-[#888] font-normal text-base">({threads.length})</span>
      </h2>

      {threads.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-12 text-center text-[#888]">
          Noch keine Beiträge im Forum.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {threads.map((thread) => (
            <div
              key={thread._id.toString()}
              className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-4 flex items-center justify-between gap-4 flex-wrap"
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {thread.pinned && (
                    <span className="text-xs bg-[#FFF5F2] text-[#D68876] border border-[#F0DDD8] rounded-full px-2 py-0.5 font-semibold">
                      Angepinnt
                    </span>
                  )}
                  {thread.locked && (
                    <span className="text-xs bg-[#F5F5F5] text-[#888] border border-[#ddd] rounded-full px-2 py-0.5 font-semibold">
                      Gesperrt
                    </span>
                  )}
                </div>
                <p className="font-semibold text-[#222] text-sm">{thread.title}</p>
                <p className="text-xs text-[#888] mt-0.5">
                  {categoryNameMap[thread.categorySlug] ?? thread.categorySlug} ·{" "}
                  von {thread.authorName} ·{" "}
                  {thread.replyCount} Antworten ·{" "}
                  {new Date(thread.createdAt).toLocaleDateString("de-DE")}
                </p>
              </div>
              <ForumModerationButtons
                threadId={thread._id.toString()}
                pinned={thread.pinned}
                locked={thread.locked}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
