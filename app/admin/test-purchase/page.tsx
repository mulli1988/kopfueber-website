export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import TestPurchaseForm from "@/components/admin/TestPurchaseForm";

export const metadata = { title: "Admin — Testkauf" };

export default async function TestPurchasePage() {
  await connectToDatabase();
  const products = await Product.find({ published: true }).sort({ title: 1 }).lean();

  const serialized = products.map((p) => ({
    _id: p._id.toString(),
    title: p.title,
    price: p.price,
  }));

  return (
    <div>
      <h1 className="font-display text-4xl font-black mb-2">Testkauf</h1>
      <p className="text-[#888] mb-8">
        Trage einen Kauf manuell ein — zum Testen von Downloads und dem Konto-Portal.
        Dies ersetzt später den automatischen Stripe-Webhook.
      </p>

      <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-6 max-w-lg">
        <TestPurchaseForm products={serialized} />
      </div>

      <div className="mt-6 bg-[#FFF5F2] rounded-2xl border-2 border-[#F0DDD8] p-5 max-w-lg">
        <p className="text-sm font-semibold text-[#924d44] mb-1">So testest du:</p>
        <ol className="text-sm text-[#555] space-y-1 list-decimal list-inside">
          <li>Gib deine eigene E-Mail ein (mit der du eingeloggt bist)</li>
          <li>Wähle ein Produkt mit einer hochgeladenen Download-Datei</li>
          <li>Klick auf &quot;Kauf eintragen&quot;</li>
          <li>Geh auf &quot;Konto ansehen&quot; und teste den Download-Button</li>
        </ol>
      </div>
    </div>
  );
}
