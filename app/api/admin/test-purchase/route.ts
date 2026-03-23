import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Product from "@/lib/db/models/Product";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Nicht erlaubt." }, { status: 403 });
  }

  const { userEmail, productId } = await req.json();
  if (!userEmail || !productId) {
    return NextResponse.json({ error: "E-Mail und Produkt erforderlich." }, { status: 400 });
  }

  await connectToDatabase();

  const user = await User.findOne({ email: userEmail.toLowerCase().trim() });
  if (!user) {
    return NextResponse.json({ error: "Nutzer nicht gefunden." }, { status: 404 });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
  }

  const productObjId = new mongoose.Types.ObjectId(productId);
  const alreadyOwned = user.purchases.some(
    (id: mongoose.Types.ObjectId) => id.toString() === productId
  );

  if (!alreadyOwned) {
    await User.findByIdAndUpdate(user._id, {
      $push: { purchases: productObjId },
    });
  }

  return NextResponse.json({ ok: true, userName: user.name, productTitle: product.title });
}
