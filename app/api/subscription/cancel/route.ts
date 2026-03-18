import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import Subscription from "@/lib/db/models/Subscription";
import stripe from "@/lib/stripe/client";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });

  await connectToDatabase();
  const sub = await Subscription.findOne({ userId: session.user.id, status: "active" });
  if (!sub) return NextResponse.json({ error: "Kein aktives Abo." }, { status: 404 });

  await stripe.subscriptions.update(sub.stripeSubscriptionId, {
    cancel_at_period_end: true,
  });

  await sub.updateOne({ cancelAtPeriodEnd: true });

  return NextResponse.json({ success: true });
}
