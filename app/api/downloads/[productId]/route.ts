import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Product from "@/lib/db/models/Product";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;

  // 1. Eingeloggt?
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  await connectToDatabase();

  // 2. Produkt laden
  const product = await Product.findById(productId);
  if (!product || !product.downloadFile) {
    return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
  }

  // 3. Zugriffsprüfung: gekauft ODER aktives Abo
  const user = await User.findById(session.user.id);
  if (!user) {
    return NextResponse.json({ error: "Benutzer nicht gefunden." }, { status: 404 });
  }

  const hasPurchased = user.purchases.some(
    (id: { toString(): string }) => id.toString() === productId
  );
  const hasActiveSubscription =
    user.subscriptionStatus === "active" && product.includedInSubscription;

  if (!hasPurchased && !hasActiveSubscription) {
    return NextResponse.json({ error: "Kein Zugriff." }, { status: 403 });
  }

  // 4. Direkt zur Uploadthing-URL weiterleiten
  // Uploadthing-URLs sind bereits sichere, nicht-öffentlich-indexierbare Links
  return NextResponse.redirect(product.downloadFile);
}
