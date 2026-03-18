import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import stripe from "@/lib/stripe/client";
import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
    }

    const { productId, mode } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "Produkt-ID fehlt." }, { status: 400 });
    }

    await connectToDatabase();
    const product = await Product.findById(productId);
    if (!product || !product.published) {
      return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    // Abo-Modus für Subscription
    if (mode === "subscription") {
      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer_email: session.user.email!,
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: { name: "Kopfüber Abo — Monatliche Grafiken" },
              unit_amount: product.price,
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId: session.user.id,
          productId: productId,
          type: "subscription",
        },
        success_url: `${baseUrl}/account?success=1`,
        cancel_url:  `${baseUrl}/shop/${product.slug}`,
      });

      return NextResponse.json({ url: checkoutSession.url });
    }

    // Einmalkauf
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: session.user.email!,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.title,
              images: product.images.length > 0 ? [product.images[0]] : [],
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId:    session.user.id,
        productId: productId,
        type:      "one_time",
      },
      success_url: `${baseUrl}/account?success=1`,
      cancel_url:  `${baseUrl}/shop/${product.slug}`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Serverfehler." }, { status: 500 });
  }
}
