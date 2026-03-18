import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { connectToDatabase } from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils/formatCurrency";
import DownloadButton from "@/components/account/DownloadButton";
import CancelSubscriptionButton from "@/components/account/CancelSubscriptionButton";

export const metadata = { title: "Mein Konto" };

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectToDatabase();

  const user = await User.findById(session.user.id).lean();
  if (!user) redirect("/login");

  // Bestellungen mit Produktdetails
  const orders = await Order.find({ userId: session.user.id, status: "paid" })
    .sort({ createdAt: -1 })
    .lean();

  // Gekaufte Produkte
  const purchasedProducts = await Product.find({
    _id: { $in: user.purchases },
  }).lean();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-5xl font-black mb-10">Mein Konto</h1>

      {/* Begrüßung */}
      <Card className="mb-8 bg-accent border-dark">
        <p className="font-display text-2xl font-bold">Hallo, {user.name}! 👋</p>
        <p className="text-muted-foreground mt-1">{user.email}</p>
      </Card>

      {/* Abo-Status */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold mb-4">Abo</h2>
        <Card>
          {user.subscriptionStatus === "active" ? (
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <Badge variant="secondary" className="mb-2">Aktiv</Badge>
                <p className="font-semibold">Kopfüber Monats-Abo</p>
                {user.subscriptionEnd && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Verlängert am {new Date(user.subscriptionEnd).toLocaleDateString("de-DE")}
                  </p>
                )}
              </div>
              <CancelSubscriptionButton />
            </div>
          ) : (
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <Badge variant="muted" className="mb-2">Kein Abo</Badge>
                <p className="text-muted-foreground">Du hast kein aktives Abo.</p>
              </div>
              <a
                href="/shop?category=Abo"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Abo abschließen →
              </a>
            </div>
          )}
        </Card>
      </section>

      {/* Downloads */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold mb-4">Meine Downloads</h2>
        {purchasedProducts.length === 0 ? (
          <Card>
            <p className="text-muted-foreground">
              Du hast noch keine digitalen Produkte gekauft.{" "}
              <a href="/shop" className="text-primary font-semibold hover:underline">
                Zum Shop →
              </a>
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {purchasedProducts.map((product) => (
              <Card key={product._id.toString()} className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                </div>
                {product.downloadFile && (
                  <DownloadButton productId={product._id.toString()} />
                )}
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Bestellhistorie */}
      <section>
        <h2 className="font-display text-2xl font-bold mb-4">Bestellhistorie</h2>
        {orders.length === 0 ? (
          <Card>
            <p className="text-muted-foreground">Noch keine Bestellungen.</p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <Card key={order._id.toString()} className="flex items-center justify-between gap-4 flex-wrap py-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("de-DE")}
                  </p>
                  <p className="font-semibold mt-0.5">Bestellung #{order._id.toString().slice(-6).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">Bezahlt</Badge>
                  <p className="font-bold text-primary mt-1">{formatPrice(order.totalAmount)}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
