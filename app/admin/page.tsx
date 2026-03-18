import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import Order from "@/lib/db/models/Order";
import User from "@/lib/db/models/User";
import BlogPost from "@/lib/db/models/BlogPost";
import ForumThread from "@/lib/db/models/ForumThread";
import Card from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils/formatCurrency";
import Link from "next/link";

export const metadata = { title: "Admin — Dashboard" };

export default async function AdminDashboard() {
  await connectToDatabase();

  const [
    productCount,
    orderCount,
    userCount,
    blogCount,
    threadCount,
    orders,
  ] = await Promise.all([
    Product.countDocuments({ published: true }),
    Order.countDocuments({ status: "paid" }),
    User.countDocuments({ role: "user" }),
    BlogPost.countDocuments({ published: true }),
    ForumThread.countDocuments(),
    Order.find({ status: "paid" }).sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  const revenue = await Order.aggregate([
    { $match: { status: "paid" } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  const totalRevenue = revenue[0]?.total ?? 0;

  const stats = [
    { label: "Umsatz gesamt",   value: formatPrice(totalRevenue), icon: "💰", href: "/admin/orders" },
    { label: "Bestellungen",    value: orderCount,                icon: "📦", href: "/admin/orders" },
    { label: "Produkte",        value: productCount,              icon: "🖼",  href: "/admin/products" },
    { label: "Nutzer",          value: userCount,                 icon: "👤", href: "#" },
    { label: "Blog-Beiträge",   value: blogCount,                 icon: "✍️", href: "/admin/blog" },
    { label: "Forum-Threads",   value: threadCount,               icon: "💬", href: "/admin/forum" },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl font-black mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value, icon, href }) => (
          <Link key={label} href={href} className="no-underline">
            <Card hover className="py-5">
              <p className="text-2xl mb-1">{icon}</p>
              <p className="text-2xl font-black font-display">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Letzte Bestellungen */}
      <h2 className="font-display text-2xl font-bold mb-4">Letzte Bestellungen</h2>
      {orders.length === 0 ? (
        <Card>
          <p className="text-muted-foreground">Noch keine Bestellungen.</p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b-2 border-dark">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Bestell-ID</th>
                <th className="text-left px-4 py-3 font-semibold">Datum</th>
                <th className="text-right px-4 py-3 font-semibold">Betrag</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order._id.toString()} className={i % 2 === 0 ? "bg-surface" : "bg-muted/40"}>
                  <td className="px-4 py-3 font-mono text-xs">
                    #{order._id.toString().slice(-8).toUpperCase()}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-primary">
                    {formatPrice(order.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
