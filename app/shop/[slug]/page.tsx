import { notFound } from "next/navigation";
import Image from "next/image";
import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import { formatPrice } from "@/lib/utils/formatCurrency";
import Badge from "@/components/ui/Badge";
import BuyButton from "@/components/shop/BuyButton";
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
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full bg-muted border-2 border-dark rounded-[var(--radius-xl)] overflow-hidden">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">🖼</div>
            )}
          </div>
          {/* Weitere Bilder */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((img: string, i: number) => (
                <div key={i} className="relative aspect-square bg-muted border-2 border-dark rounded-[var(--radius-md)] overflow-hidden">
                  <Image src={img} alt={`${product.title} ${i + 2}`} fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
          )}
        </div>

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
