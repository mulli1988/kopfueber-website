export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Image from "next/image";
import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import ProductCard from "@/components/shop/ProductCard";
import CategoryFilter from "@/components/shop/CategoryFilter";

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export const metadata = {
  title: "Shop",
  description: "Liebevoll gestaltete Materialien zum Ausdrucken für Kita & Zuhause.",
};

// Feste Kategorien mit Icons – spiegeln den Etsy-Shop wider
export const SHOP_CATEGORIES = [
  { name: "Für Kindergärten",  emoji: "🏫", color: "bg-[#C5E0E0]", border: "border-[#81ABAD]" },
  { name: "Für Familien",      emoji: "👨‍👩‍👧", color: "bg-[#FFF8E8]", border: "border-[#D4A855]" },
  { name: "Wandposter",        emoji: "🖼️",  color: "bg-[#FEF0D0]", border: "border-[#C9A84C]" },
  { name: "Weihnachten",       emoji: "🎄",  color: "bg-[#EBF5EB]", border: "border-[#6BA87A]" },
  { name: "English Collection",emoji: "🌍",  color: "bg-[#FFF0EB]", border: "border-[#C07B6B]" },
  { name: "Kurse und Ratgeber",emoji: "📚",  color: "bg-[#EDE8F5]", border: "border-[#9B8EC4]" },
];

async function getProducts(category?: string) {
  await connectToDatabase();
  const filter: Record<string, unknown> = { published: true };
  if (category) filter.category = category;
  return Product.find(filter).sort({ createdAt: -1 }).lean();
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
              <span className={`text-3xl px-4 py-2 rounded-2xl border-2 ${activeCategory.color} ${activeCategory.border}`}>
                {activeCategory.emoji}
              </span>
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
          <div className="text-center py-24 border-4 border-dashed border-muted rounded-[var(--radius-xl)]">

            <p className="font-display text-2xl font-bold mb-2">
              {category ? `Noch keine Produkte in "${category}"` : "Noch keine Produkte"}
            </p>
            <p className="text-muted-foreground">Schau bald wieder vorbei!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p._id.toString()}
                product={{
                  _id:          p._id.toString(),
                  title:        p.title,
                  slug:         p.slug,
                  price:        p.price,
                  images:       p.images,
                  category:     p.category,
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
