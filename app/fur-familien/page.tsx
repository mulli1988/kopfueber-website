export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import ProductCard from "@/components/shop/ProductCard";
import KitaSubcategoryFilter from "@/components/shop/KitaSubcategoryFilter";
import { FAMILIE_SUBCATEGORIES } from "@/lib/utils/categories";

export const metadata = {
  title: "Für Familien",
  description: "Druckfertige Materialien für den Familienalltag: Lernmaterial, Basteln, Ratgeber und mehr.",
};

interface PageProps {
  searchParams: Promise<{ sub?: string }>;
}

async function getFamilieProducts(sub?: string) {
  await connectToDatabase();
  const filter: Record<string, unknown> = { published: true, category: "Für Familien" };
  if (sub) filter.subcategory = sub;
  return Product.find(filter).sort({ createdAt: -1 }).lean();
}

export default async function FurFamilienPage({ searchParams }: PageProps) {
  const { sub } = await searchParams;
  const products = await getFamilieProducts(sub);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="text-center py-10 mb-2">
          <h1 className="font-display text-5xl sm:text-6xl font-black text-[#ebcf7c] mb-4">
            Für Familien
          </h1>
          <p className="text-xl font-bold text-[#222222]">
            Druckfertige Materialien für den Familienalltag mit Kindern
          </p>
        </div>

        {/* Unterkategorie-Filter */}
        <div className="mb-8">
          <Suspense>
            <KitaSubcategoryFilter subcategories={FAMILIE_SUBCATEGORIES} active={sub} basePath="/fur-familien" />
          </Suspense>
        </div>

        {/* Aktive Unterkategorie-Überschrift */}
        {sub && (
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold">{sub}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {products.length} {products.length === 1 ? "Produkt" : "Produkte"}
            </p>
          </div>
        )}

        {!sub && products.length > 0 && (
          <p className="text-sm text-muted-foreground mb-6 font-semibold">
            {products.length} {products.length === 1 ? "Produkt" : "Produkte"} insgesamt
          </p>
        )}

        {/* Produkte */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-display text-xl font-bold mb-2">Noch keine Produkte in dieser Kategorie</p>
            <p className="text-muted-foreground">Schau bald wieder vorbei!</p>
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
