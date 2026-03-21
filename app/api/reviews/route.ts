import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import Review from "@/lib/db/models/Review";

export async function POST(req: Request) {
  const { name, rating, text } = await req.json();

  if (!name || !rating || !text) {
    return NextResponse.json({ error: "Alle Felder ausfüllen." }, { status: 400 });
  }
  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Ungültige Bewertung." }, { status: 400 });
  }

  await connectToDatabase();
  await Review.create({ name, rating, text });
  return NextResponse.json({ success: true }, { status: 201 });
}
