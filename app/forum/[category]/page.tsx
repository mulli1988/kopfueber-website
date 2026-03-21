export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db/mongodb";
import ForumCategory from "@/lib/db/models/ForumCategory";
import ForumThread from "@/lib/db/models/ForumThread";
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/forum"
        className="text-sm font-semibold text-[#81ABAD] hover:underline no-underline mb-6 inline-block"
      >
        ← Zurück zum Forum
      </Link>

      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-4xl font-black text-[#222222]">{cat.name}</h1>
          <p className="text-[#555555] mt-1">{cat.description}</p>
        </div>
        <NewThreadButton categorySlug={cat.slug} />
      </div>

      {threads.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-12 text-center">
          <p className="text-[#555555]">Noch keine Beiträge — sei die Erste!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {threads.map((thread) => (
            <Link
              key={thread._id.toString()}
              href={`/forum/${category}/${thread.slug}`}
              className="no-underline block group"
            >
              <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-5 flex items-center justify-between gap-4 flex-wrap hover:border-[#81ABAD] hover:shadow-md transition-all">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
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
                    <p className="font-bold text-[#222222] group-hover:text-[#81ABAD] transition-colors mt-1">
                      {thread.title}
                    </p>
                    <p className="text-xs text-[#888] mt-1">
                      von {thread.authorName} ·{" "}
                      {new Date(thread.createdAt).toLocaleDateString("de-DE")}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#81ABAD] bg-[#F0F8F8] px-3 py-1 rounded-full flex-shrink-0">
                  {thread.replyCount} Antworten
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
