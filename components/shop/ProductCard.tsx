import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/formatCurrency";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface ProductCardProps {
  className?: string;
  product: {
    _id: string;
    title: string;
    slug: string;
    price: number;
    images: string[];
    category: string;
    extraCategories?: string[];
    downloadFile?: string;
  };
}

function displayCategory(cat: string) {
  return cat === "Für Kindergärten" || cat === "Für Kitas" ? "Kitas und Co." : cat;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const isDigital = !!product.downloadFile;

  return (
    <Link href={`/shop/${product.slug}`} className={`no-underline block${className ? ` ${className}` : ""}`}>
      <Card hover className="p-0 overflow-hidden h-full">
        <div className="relative w-full aspect-square bg-muted border-b-2 border-dark">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted" />
          )}
          {isDigital && (
            <span className="absolute top-3 right-3 bg-accent border border-dark text-dark text-xs font-bold px-2 py-1 rounded-full">
              Download
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-1 mb-2">
            <Badge variant="secondary">{displayCategory(product.category)}</Badge>
            {product.extraCategories?.map((cat) => (
              <Badge key={cat} variant="secondary">{displayCategory(cat)}</Badge>
            ))}
          </div>
          <h3 className="font-display text-lg font-bold leading-tight mb-2">{product.title}</h3>
          <p className="font-bold text-primary text-lg">{formatPrice(product.price)}</p>
        </div>
      </Card>
    </Link>
  );
}
