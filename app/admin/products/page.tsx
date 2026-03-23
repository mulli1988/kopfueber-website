export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import { formatPrice } from "@/lib/utils/formatCurrency";
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
        <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-12 text-center">
          <p className="font-display text-xl font-bold mb-2 text-[#222]">Noch keine Produkte</p>
          <p className="text-[#888]">Erstelle dein erstes Produkt!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((p) => (
            <div
              key={p._id.toString()}
              className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-4 flex items-center justify-between gap-3 flex-wrap"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${
                    p.published
                      ? "bg-[#EBF5EB] text-[#4A7A4A]"
                      : "bg-[#F5F5F5] text-[#888]"
                  }`}>
                    {p.published ? "Veröffentlicht" : "Entwurf"}
                  </span>
                  {p.downloadFile && (
                    <span className="text-xs text-[#888]">Digitaler Download</span>
                  )}
                </div>
                <p className="font-bold text-[#222] truncate">{p.title}</p>
                <p className="text-xs text-[#888] mt-0.5">
                  {p.category} · {formatPrice(p.price)}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <ProductFormButton product={{
                  _id: p._id.toString(),
                  title: p.title,
                  slug: p.slug,
                  description: p.description,
                  price: p.price,
                  category: p.category,
                  categories: p.categories,
                  subcategory: p.subcategory,
                  tags: p.tags,
                  featured: p.featured,
                  published: p.published,
                  includedInSubscription: p.includedInSubscription,
                  images: p.images,
                  videoUrl: p.videoUrl,
                  downloadFile: p.downloadFile,
                }} />
                <ProductDeleteButton productId={p._id.toString()} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
