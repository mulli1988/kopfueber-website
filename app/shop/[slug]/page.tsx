export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import { formatPrice } from "@/lib/utils/formatCurrency";
import Badge from "@/components/ui/Badge";
import BuyButton from "@/components/shop/BuyButton";
import ProductImageGallery from "@/components/shop/ProductImageGallery";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const product = await Product.findOne({ slug, published: true }).lean();
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const product = await Product.findOne({ slug, published: true }).lean();
  if (!product) notFound();

  const isDigital = !!product.downloadFile;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Bilder */}
        <ProductImageGallery images={product.images} title={product.title} />

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="secondary" className="mb-3">{product.category}</Badge>
            {isDigital && <Badge variant="accent" className="mb-3 ml-2">Digitaler Download</Badge>}
            <h1 className="font-display text-4xl font-black leading-tight mb-3">{product.title}</h1>
            <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag: string) => (
                <Badge key={tag} variant="muted">{tag}</Badge>
              ))}
            </div>
          )}

          <div className="border-t-2 border-border pt-6">
            <BuyButton productId={product._id.toString()} />
            {isDigital && (
              <p className="text-sm text-muted-foreground mt-3">
                ✓ Sofort nach dem Kauf zum Download verfügbar in deinem Konto
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
