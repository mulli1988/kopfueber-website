import { NextResponse } from "next/server";
import Stripe from "stripe";
import stripe from "@/lib/stripe/client";
import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Order from "@/lib/db/models/Order";
import Subscription from "@/lib/db/models/Subscription";
import mongoose from "mongoose";

// Next.js body parsing muss deaktiviert sein — Stripe braucht den raw body
export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  const body      = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook-Signatur fehlt." }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Ungültige Webhook-Signatur." }, { status: 400 });
  }

  await connectToDatabase();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { userId, productId, type } = session.metadata ?? {};

      if (type === "one_time" && userId && productId) {
        // Order anlegen
        await Order.create({
          userId:                new mongoose.Types.ObjectId(userId),
          products:              [new mongoose.Types.ObjectId(productId)],
          totalAmount:           session.amount_total ?? 0,
          stripePaymentIntentId: session.payment_intent as string,
          status:                "paid",
        });

        // Produkt zur purchases-Liste des Users hinzufügen
        await User.findByIdAndUpdate(userId, {
          $addToSet: { purchases: new mongoose.Types.ObjectId(productId) },
        });
      }

      if (type === "subscription" && userId) {
        await User.findByIdAndUpdate(userId, {
          stripeCustomerId:   session.customer as string,
          subscriptionStatus: "active",
        });
      }
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId: sub.id },
        {
          status:            sub.status,
          currentPeriodEnd:  new Date((sub as any).current_period_end * 1000),
          cancelAtPeriodEnd: sub.cancel_at_period_end,
        }
      );

      // User-Status synchronisieren
      const dbSub = await Subscription.findOne({ stripeSubscriptionId: sub.id });
      if (dbSub) {
        await User.findByIdAndUpdate(dbSub.userId, {
          subscriptionStatus: sub.status === "active" ? "active" :
                              sub.status === "past_due" ? "past_due" : "cancelled",
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
