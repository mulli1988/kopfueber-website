export const dynamic = "force-dynamic";

import Link from "next/link";
import { connectToDatabase } from "@/lib/db/mongodb";
import ForumCategory from "@/lib/db/models/ForumCategory";
import ForumThread from "@/lib/db/models/ForumThread";

export const metadata = { title: "Forum — Kopfüber Community" };

export default async function ForumPage() {
  await connectToDatabase();

  const categories = await ForumCategory.find().sort({ order: 1 }).lean();

  const threadCounts = await ForumThread.aggregate([
    { $group: { _id: "$categorySlug", count: { $sum: 1 } } },
  ]);
  const countMap: Record<string, number> = Object.fromEntries(
    threadCounts.map((t) => [t._id, t.count])
  );

  const kitaCategories = categories.filter((c) => c.section === "kita");
  const elternCategories = categories.filter((c) => c.section === "eltern");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-[#81ABAD] mb-3">
          Community
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-[#222222] mb-4">
          Das Kopfüber-Forum
        </h1>
        <p className="text-lg text-[#555555] leading-relaxed max-w-xl mx-auto">
          Tauscht euch aus, stellt Fragen und teilt Ideen — mit Erzieherinnen
          und Eltern aus ganz Deutschland.
        </p>
        <p className="text-sm text-[#81ABAD] font-semibold mt-3">
          Du musst eingeloggt sein, um Beiträge zu schreiben.{" "}
          <Link href="/login" className="underline">
            Jetzt einloggen →
          </Link>
        </p>
      </div>

      {/* Kita-Bereich */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#81ABAD] flex items-center justify-center text-white text-lg">
            🏫
          </div>
          <div>
            <h2 className="font-display text-2xl font-black text-[#222222]">
              Für Kitas &amp; Erzieher
            </h2>
            <p className="text-sm text-[#555555]">
              Pädagogischer Austausch, Ideen und Ressourcen
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {kitaCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/forum/${cat.slug}`}
              className="no-underline group"
            >
              <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-5 flex items-center justify-between gap-4 hover:border-[#81ABAD] hover:shadow-md transition-all">
                <div>
                  <p className="font-bold text-[#222222] group-hover:text-[#81ABAD] transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-sm text-[#555555] mt-0.5">{cat.description}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-xs font-semibold text-[#81ABAD] bg-[#F0F8F8] px-3 py-1 rounded-full">
                    {countMap[cat.slug] ?? 0} Threads
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {kitaCategories.length === 0 && (
            <p className="text-[#555555] text-sm">Noch keine Kategorien vorhanden.</p>
          )}
        </div>
      </section>

      {/* Eltern-Bereich */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#D68876] flex items-center justify-center text-white text-lg">
            👨‍👩‍👧
          </div>
          <div>
            <h2 className="font-display text-2xl font-black text-[#222222]">
              Für Eltern &amp; Familien
            </h2>
            <p className="text-sm text-[#555555]">
              Familienalltag, Erziehung und Freizeitideen
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {elternCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/forum/${cat.slug}`}
              className="no-underline group"
            >
              <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-5 flex items-center justify-between gap-4 hover:border-[#D68876] hover:shadow-md transition-all">
                <div>
                  <p className="font-bold text-[#222222] group-hover:text-[#D68876] transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-sm text-[#555555] mt-0.5">{cat.description}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-xs font-semibold text-[#D68876] bg-[#FFF5F2] px-3 py-1 rounded-full">
                    {countMap[cat.slug] ?? 0} Threads
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {elternCategories.length === 0 && (
            <p className="text-[#555555] text-sm">Noch keine Kategorien vorhanden.</p>
          )}
        </div>
      </section>
    </div>
  );
}
