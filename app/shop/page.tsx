import { Suspense } from "react";
import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import ProductCard from "@/components/shop/ProductCard";
import CategoryFilter from "@/components/shop/CategoryFilter";

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export const metadata = {
  title: "Shop",
  description: "Alle Drucke & digitalen Grafiken im Kopfüber-Shop.",
};

async function getProducts(category?: string) {
  await connectToDatabase();
  const filter: Record<string, unknown> = { published: true };
  if (category) filter.category = category;
  const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
  return products;
}

async function getCategories() {
  await connectToDatabase();
  const cats = await Product.distinct("category", { published: true });
  return cats as string[];
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(category),
    getCategories(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="font-display text-5xl font-black mb-2">Shop</h1>
        <p className="text-muted-foreground">
          {products.length} {products.length === 1 ? "Produkt" : "Produkte"}
          {category ? ` in "${category}"` : ""}
        </p>
      </div>

      <div className="mb-8">
        <Suspense>
          <CategoryFilter categories={categories} />
        </Suspense>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🎨</p>
          <p className="font-display text-2xl font-bold mb-2">Noch keine Produkte</p>
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
  );
}
