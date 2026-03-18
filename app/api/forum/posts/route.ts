import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import ForumPost from "@/lib/db/models/ForumPost";
import ForumThread from "@/lib/db/models/ForumThread";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  const { threadId, content } = await req.json();
  if (!threadId || !content?.trim()) {
    return NextResponse.json({ error: "Inhalt fehlt." }, { status: 400 });
  }

  await connectToDatabase();

  const thread = await ForumThread.findById(threadId);
  if (!thread) return NextResponse.json({ error: "Thread nicht gefunden." }, { status: 404 });
  if (thread.locked) return NextResponse.json({ error: "Thread ist gesperrt." }, { status: 403 });

  const post = await ForumPost.create({
    threadId: new mongoose.Types.ObjectId(threadId),
    authorId: new mongoose.Types.ObjectId(session.user.id),
    content: content.trim(),
    isFirstPost: false,
  });

  await ForumThread.findByIdAndUpdate(threadId, {
    $inc: { replyCount: 1 },
    lastReplyAt: new Date(),
  });

  return NextResponse.json(post, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }

  const { postId } = await req.json();
  await connectToDatabase();
  await ForumPost.findByIdAndDelete(postId);
  return NextResponse.json({ success: true });
}
