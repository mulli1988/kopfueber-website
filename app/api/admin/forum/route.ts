import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import ForumThread from "@/lib/db/models/ForumThread";
import ForumCategory from "@/lib/db/models/ForumCategory";
import { slugify } from "@/lib/utils/slugify";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") return null;
  return session;
}

// Thread sperren/anpinnen
export async function PUT(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  const { threadId, pinned, locked } = await req.json();
  await connectToDatabase();
  const thread = await ForumThread.findByIdAndUpdate(threadId, { pinned, locked }, { new: true });
  return NextResponse.json(thread);
}

// Thread löschen
export async function DELETE(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  const { threadId } = await req.json();
  await connectToDatabase();
  await ForumThread.findByIdAndDelete(threadId);
  return NextResponse.json({ success: true });
}

// Kategorie erstellen
export async function POST(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  const { name, description } = await req.json();
  await connectToDatabase();
  const cat = await ForumCategory.create({ name, slug: slugify(name), description });
  return NextResponse.json(cat, { status: 201 });
}
