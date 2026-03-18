import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import { slugify } from "@/lib/utils/slugify";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") return null;
  return session;
}

export async function POST(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });

  const data = await req.json();
  await connectToDatabase();

  const slug = slugify(data.title);
  const product = await Product.create({ ...data, slug });
  return NextResponse.json(product, { status: 201 });
}

export async function PUT(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });

  const { _id, ...data } = await req.json();
  await connectToDatabase();
  const product = await Product.findByIdAndUpdate(_id, data, { new: true });
  return NextResponse.json(product);
}

export async function DELETE(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });

  const { id } = await req.json();
  await connectToDatabase();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
