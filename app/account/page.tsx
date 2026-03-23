export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
import { formatPrice } from "@/lib/utils/formatCurrency";
import DownloadButton from "@/components/account/DownloadButton";
import CancelSubscriptionButton from "@/components/account/CancelSubscriptionButton";

export const metadata = { title: "Mein Konto — Kopfüber" };

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectToDatabase();

  const user = await User.findById(session.user.id).lean();
  if (!user) redirect("/login");

  const orders = await Order.find({ userId: session.user.id, status: "paid" })
    .sort({ createdAt: -1 })
    .lean();

  const purchasedProducts = await Product.find({
    _id: { $in: user.purchases },
  }).lean();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

      {/* Begrüßung */}
      <div className="bg-[#FFF5F2] rounded-3xl border-2 border-[#F0DDD8] p-8 mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[#81ABAD] mb-2">
          Mein Konto
        </p>
        <h1 className="font-display text-4xl font-black text-[#222222] mb-1">
          Hallo, {user.name}!
        </h1>
        <p className="text-[#888] text-sm">{user.email}</p>
      </div>

      {/* Downloads */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-black text-[#222222] mb-5">
          Meine Downloads
        </h2>
        {purchasedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-8 text-center">
            <p className="text-[#555555] mb-4">
              Du hast noch keine digitalen Produkte gekauft.
            </p>
            <Link
              href="/fur-kitas"
              className="inline-block bg-[#81ABAD] text-white font-bold text-sm px-5 py-3 rounded-2xl hover:bg-[#5D8F91] transition-colors no-underline"
            >
              Jetzt stöbern →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {purchasedProducts.map((product) => (
              <div
                key={product._id.toString()}
                className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-5 flex items-center justify-between gap-4 flex-wrap"
              >
                <div>
                  <p className="font-bold text-[#222222]">{product.title}</p>
                  <p className="text-sm text-[#888] mt-0.5">
                    {formatPrice(product.price)}
                  </p>
                </div>
                {product.downloadFile && (
                  <DownloadButton productId={product._id.toString()} />
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Abo-Status */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-black text-[#222222] mb-5">
          Abo-Status
        </h2>
        <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-6 flex items-center justify-between gap-4 flex-wrap">
          {user.subscriptionStatus === "active" ? (
            <>
              <div>
                <span className="inline-block text-xs font-bold bg-[#81ABAD] text-white rounded-full px-3 py-1 mb-2">
                  Aktiv
                </span>
                <p className="font-bold text-[#222222]">Kopfüber Monats-Abo</p>
                {user.subscriptionEnd && (
                  <p className="text-sm text-[#888] mt-0.5">
                    Verlängert am{" "}
                    {new Date(user.subscriptionEnd).toLocaleDateString("de-DE")}
                  </p>
                )}
              </div>
              <CancelSubscriptionButton />
            </>
          ) : (
            <>
              <div>
                <span className="inline-block text-xs font-bold bg-[#F0DDD8] text-[#888] rounded-full px-3 py-1 mb-2">
                  Kein Abo
                </span>
                <p className="text-[#555555]">Du hast kein aktives Abo.</p>
              </div>
              <Link
                href="/shop"
                className="text-sm font-semibold text-[#81ABAD] hover:underline no-underline"
              >
                Abo abschließen →
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Bestellhistorie */}
      <section>
        <h2 className="font-display text-2xl font-black text-[#222222] mb-5">
          Bestellhistorie
        </h2>
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-6 text-center text-[#888]">
            Noch keine Bestellungen vorhanden.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <div
                key={order._id.toString()}
                className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-5 flex items-center justify-between gap-4 flex-wrap"
              >
                <div>
                  <p className="text-xs text-[#888]">
                    {new Date(order.createdAt).toLocaleDateString("de-DE", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>
                  <p className="font-bold text-[#222222] mt-0.5">
                    Bestellung #{order._id.toString().slice(-6).toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block text-xs font-bold bg-[#EBF5EB] text-[#4A7A4A] rounded-full px-3 py-1 mb-1">
                    Bezahlt
                  </span>
                  <p className="font-bold text-[#81ABAD]">
                    {formatPrice(order.totalAmount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
