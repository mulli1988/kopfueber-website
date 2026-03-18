import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import ForumCategory from "@/lib/db/models/ForumCategory";

export async function GET() {
  await connectToDatabase();
  const categories = await ForumCategory.find().sort({ order: 1 }).lean();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }
  const { name, slug, description } = await req.json();
  await connectToDatabase();
  const cat = await ForumCategory.create({ name, slug, description });
  return NextResponse.json(cat, { status: 201 });
}
