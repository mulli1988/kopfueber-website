import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import Contact from "@/lib/db/models/Contact";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") return null;
  return session;
}

export async function PATCH(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  const { id, read } = await req.json();
  await connectToDatabase();
  await Contact.findByIdAndUpdate(id, { read });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  const { id } = await req.json();
  await connectToDatabase();
  await Contact.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
