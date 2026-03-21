export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { connectToDatabase } from "@/lib/db/mongodb";
import ForumThread from "@/lib/db/models/ForumThread";
import ForumPost from "@/lib/db/models/ForumPost";
import ReplyForm from "@/components/forum/ReplyForm";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export default async function ForumThreadPage({ params }: Props) {
  const { category, slug } = await params;
  await connectToDatabase();

  const thread = await ForumThread.findOne({ categorySlug: category, slug }).lean();
  if (!thread) notFound();

  // replies = all posts except the first one (OP content is stored in thread.content)
  const replies = await ForumPost.find({ threadId: thread._id })
    .sort({ createdAt: 1 })
    .skip(1)
    .lean();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href={`/forum/${category}`}
        className="text-sm font-semibold text-[#81ABAD] hover:underline no-underline mb-6 inline-block"
      >
        ← Zurück zur Kategorie
      </Link>

      <div className="mb-8">
        <div className="flex gap-2 mb-3">
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
        <h1 className="font-display text-3xl sm:text-4xl font-black text-[#222222]">
          {thread.title}
        </h1>
        <p className="text-sm text-[#888] mt-2">
          {thread.replyCount} {thread.replyCount === 1 ? "Antwort" : "Antworten"} ·{" "}
          erstellt {new Date(thread.createdAt).toLocaleDateString("de-DE")}
        </p>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-4 mb-10">
        {/* OP — thread content */}
        <div className="bg-white rounded-2xl border-2 border-[#81ABAD] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#81ABAD] text-white flex items-center justify-center text-sm font-bold">
                {(thread.authorName ?? "?")[0].toUpperCase()}
              </div>
              <div>
                <span className="font-semibold text-sm text-[#222222]">{thread.authorName}</span>
                <span className="ml-2 text-xs bg-[#81ABAD] text-white rounded-full px-2 py-0.5 font-semibold">
                  OP
                </span>
              </div>
            </div>
            <span className="text-xs text-[#888]">
              {new Date(thread.createdAt).toLocaleDateString("de-DE", {
                day: "numeric", month: "short", year: "numeric",
              })}
            </span>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-[#333]">
            {thread.content}
          </p>
        </div>

        {/* Replies */}
        {replies.map((post) => (
          <div
            key={post._id.toString()}
            className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D68876] text-white flex items-center justify-center text-sm font-bold">
                  {(post.authorName ?? "?")[0].toUpperCase()}
                </div>
                <span className="font-semibold text-sm text-[#222222]">{post.authorName}</span>
              </div>
              <span className="text-xs text-[#888]">
                {new Date(post.createdAt).toLocaleDateString("de-DE", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </span>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-[#333]">
              {post.content}
            </p>
          </div>
        ))}
      </div>

      {/* Reply form */}
      {!thread.locked && (
        <ReplyForm threadId={thread._id.toString()} />
      )}
    </div>
  );
}
