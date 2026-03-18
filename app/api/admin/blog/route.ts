import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import BlogPost from "@/lib/db/models/BlogPost";
import { slugify } from "@/lib/utils/slugify";
import mongoose from "mongoose";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") return null;
  return session;
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });

  const data = await req.json();
  await connectToDatabase();
  const slug = slugify(data.title);
  const post = await BlogPost.create({
    ...data,
    slug,
    authorId: new mongoose.Types.ObjectId(session.user.id),
    publishedAt: data.published ? new Date() : undefined,
  });
  return NextResponse.json(post, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });

  const { _id, ...data } = await req.json();
  await connectToDatabase();
  if (data.published && !data.publishedAt) data.publishedAt = new Date();
  const post = await BlogPost.findByIdAndUpdate(_id, data, { new: true });
  return NextResponse.json(post);
}

export async function DELETE(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  const { id } = await req.json();
  await connectToDatabase();
  await BlogPost.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
