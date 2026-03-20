import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import mongoose from "mongoose";

const WaitlistSchema = new mongoose.Schema({
  name:      String,
  email:     { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Waitlist = mongoose.models.Waitlist || mongoose.model("Waitlist", WaitlistSchema);

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "E-Mail ist erforderlich" }, { status: 400 });
    }
    await connectToDatabase();
    await Waitlist.create({ name, email });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
