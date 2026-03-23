export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import ProductCard from "@/components/shop/ProductCard";
import KitaSubcategoryFilter from "@/components/shop/KitaSubcategoryFilter";
import { KITA_SUBCATEGORIES } from "@/lib/utils/categories";

export const metadata = {
  title: "Für Kitas",
  description: "Druckfertige Vorlagen und Materialien für den Kita-Alltag: Elternarbeit, Portfolios, Basteln und mehr.",
};

interface PageProps {
  searchParams: Promise<{ sub?: string }>;
}

async function getKitaProducts(sub?: string) {
  await connectToDatabase();
  const base = { $or: [{ category: "Für Kindergärten" }, { categories: "Für Kindergärten" }] };
  const filter = sub
    ? { $and: [base, { published: true, subcategory: sub }] }
    : { ...base, published: true };
  return Product.find(filter).sort({ createdAt: -1 }).lean();
}

function lastItemClass(total: number): string {
  const mobileFull = total % 2 !== 0;
  const desktopFull = total % 3 === 1;
  if (mobileFull && desktopFull) return "col-span-2 lg:col-span-3";
  if (mobileFull) return "col-span-2 lg:col-span-1";
  if (desktopFull) return "lg:col-span-3";
  return "";
}

export default async function FurKitasPage({ searchParams }: PageProps) {
  const { sub } = await searchParams;
  const products = await getKitaProducts(sub);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="text-center py-10 mb-2">
          <h1 className="font-display text-5xl sm:text-6xl font-black text-[#4A8F8F] mb-4">
            Für Kitas &amp; Erzieher
          </h1>
          <p className="text-xl font-bold text-[#222222]">
            Druckfertige Vorlagen und Materialien für den Kindergarten-Alltag
          </p>
        </div>

        {/* Unterkategorie-Filter */}
        <div className="mb-8">
          <Suspense>
            <KitaSubcategoryFilter subcategories={KITA_SUBCATEGORIES} active={sub} basePath="/fur-kitas" />
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
            {products.map((p, i) => (
              <ProductCard
                key={p._id.toString()}
                className={i === products.length - 1 ? lastItemClass(products.length) : ""}
                product={{
                  _id:          p._id.toString(),
                  title:        p.title,
                  slug:         p.slug,
                  price:        p.price,
                  images:       p.images,
                  category:     "Für Kitas",
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
