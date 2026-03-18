import { connectToDatabase } from "@/lib/db/mongodb";
import Order from "@/lib/db/models/Order";
import User from "@/lib/db/models/User";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils/formatCurrency";

export const metadata = { title: "Admin — Bestellungen" };

export default async function AdminOrdersPage() {
  await connectToDatabase();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  const userIds = [...new Set(orders.map((o) => o.userId.toString()))];
  const users = await User.find({ _id: { $in: userIds } }).lean();
  const userMap = Object.fromEntries(users.map((u) => [u._id.toString(), u.email]));

  const total = orders.reduce((sum, o) => sum + (o.status === "paid" ? o.totalAmount : 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-display text-4xl font-black">Bestellungen</h1>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Gesamtumsatz</p>
          <p className="font-display text-2xl font-black text-primary">{formatPrice(total)}</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <Card className="text-center py-16">
          <p className="text-4xl mb-3">📦</p>
          <p className="font-display text-xl font-bold">Noch keine Bestellungen</p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b-2 border-dark">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">ID</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Kunde</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Datum</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Betrag</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order._id.toString()} className={i % 2 === 0 ? "bg-surface" : "bg-muted/40"}>
                  <td className="px-4 py-3 font-mono text-xs">
                    #{order._id.toString().slice(-8).toUpperCase()}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground text-xs">
                    {userMap[order.userId.toString()] ?? "—"}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={order.status === "paid" ? "secondary" : "muted"}>
                      {order.status === "paid" ? "Bezahlt" : order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-bold">{formatPrice(order.totalAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
