export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import ProductCard from "@/components/shop/ProductCard";
import CategoryFilter from "@/components/shop/CategoryFilter";
import WaitlistForm from "@/components/home/WaitlistForm";

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export const metadata = {
  title: "Shop",
  description: "Alle Materialien auf einen Blick: Für Kindergärten, Tagesmütter, Erzieher und Familien. Einfach ausdrucken und loslegen.",
};

// Feste Kategorien mit Icons – spiegeln den Etsy-Shop wider
export const SHOP_CATEGORIES = [
  { name: "Für Kindergärten", color: "bg-[#C5E0E0]", border: "border-[#81ABAD]" },
  { name: "Für Familien",     color: "bg-[#FFF8E8]", border: "border-[#D4A855]" },
];

async function getProducts(category?: string) {
  await connectToDatabase();
  if (category) {
    return Product.find({
      published: true,
      $or: [{ category }, { categories: category }],
    }).sort({ createdAt: -1 }).lean();
  }
  return Product.find({ published: true }).sort({ createdAt: -1 }).lean();
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const products = await getProducts(category);

  const activeCategory = SHOP_CATEGORIES.find((c) => c.name === category);

  return (
    <div className="min-h-screen">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Kategorie-Karten */}
        <div className="mb-10">
          <h2 className="font-display text-2xl font-black mb-5">Was suchst du?</h2>
          <Suspense>
            <CategoryFilter categories={SHOP_CATEGORIES} activeCategory={category} />
          </Suspense>
        </div>

        {/* Aktive Kategorie-Kopfzeile */}
        {category && (
          <div className="flex items-center gap-3 mb-6">
            {activeCategory && (
              <span className={`px-4 py-2 rounded-2xl border-2 ${activeCategory.color} ${activeCategory.border}`} />
            )}
            <div>
              <h2 className="font-display text-3xl font-black">{category}</h2>
              <p className="text-muted-foreground text-sm">
                {products.length} {products.length === 1 ? "Produkt" : "Produkte"}
              </p>
            </div>
          </div>
        )}

        {!category && products.length > 0 && (
          <p className="text-muted-foreground mb-6 text-sm font-semibold">
            {products.length} Produkte insgesamt
          </p>
        )}

        {/* Produkt-Grid */}
        {products.length === 0 ? (
          <div className="py-8">
            <WaitlistForm />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p._id.toString()}
                product={{
                  _id:          p._id.toString(),
                  title:        p.title,
                  slug:         p.slug,
                  price:        p.price,
                  images:       p.images,
                  category:     category ?? p.category,
                  downloadFile: p.downloadFile,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
