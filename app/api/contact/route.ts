import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Contact from "@/lib/db/models/Contact";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Alle Felder sind erforderlich" }, { status: 400 });
    }
    await connectToDatabase();
    await Contact.create({ name, email, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
