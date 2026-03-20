export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import { formatPrice } from "@/lib/utils/formatCurrency";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ProductFormButton from "@/components/admin/ProductFormButton";
import ProductDeleteButton from "@/components/admin/ProductDeleteButton";

export const metadata = { title: "Admin — Produkte" };

export default async function AdminProductsPage() {
  await connectToDatabase();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-display text-4xl font-black">Produkte</h1>
        <ProductFormButton />
      </div>

      {products.length === 0 ? (
        <Card className="text-center py-16">
          <p className="font-display text-xl font-bold mb-2">Noch keine Produkte</p>
          <p className="text-muted-foreground">Erstelle dein erstes Produkt!</p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b-2 border-dark">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Titel</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Kategorie</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Preis</th>
                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p._id.toString()} className={i % 2 === 0 ? "bg-surface" : "bg-muted/40"}>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{p.title}</p>
                    {p.downloadFile && (
                      <p className="text-xs text-muted-foreground">📥 Digitaler Download</p>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 hidden md:table-cell font-semibold">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Badge variant={p.published ? "secondary" : "muted"}>
                      {p.published ? "Veröffentlicht" : "Entwurf"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <ProductFormButton product={{
                        _id: p._id.toString(),
                        title: p.title,
                        slug: p.slug,
                        description: p.description,
                        price: p.price,
                        category: p.category,
                        subcategory: p.subcategory,
                        tags: p.tags,
                        featured: p.featured,
                        published: p.published,
                        includedInSubscription: p.includedInSubscription,
                        images: p.images,
                        downloadFile: p.downloadFile,
                      }} />
                      <ProductDeleteButton productId={p._id.toString()} />
                    </div>
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
