import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import ForumThread from "@/lib/db/models/ForumThread";
import ForumPost from "@/lib/db/models/ForumPost";
import { slugify } from "@/lib/utils/slugify";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const { categorySlug, title, content } = await req.json();
  if (!categorySlug || !title || !content) {
    return NextResponse.json({ error: "Alle Felder sind erforderlich." }, { status: 400 });
  }

  await connectToDatabase();

  const baseSlug = slugify(title);
  const count = await ForumThread.countDocuments({ categorySlug, slug: new RegExp(`^${baseSlug}`) });
  const slug = count > 0 ? `${baseSlug}-${count}` : baseSlug;

  const thread = await ForumThread.create({
    categorySlug,
    title,
    slug,
    authorId: new mongoose.Types.ObjectId(session.user.id),
    replyCount: 0,
  });

  await ForumPost.create({
    threadId: thread._id,
    authorId: new mongoose.Types.ObjectId(session.user.id),
    content,
    isFirstPost: true,
  });

  return NextResponse.json({ slug, categorySlug }, { status: 201 });
}
