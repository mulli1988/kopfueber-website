export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/shop/ProductCard";
import ContactForm from "@/components/home/ContactForm";
import { connectToDatabase } from "@/lib/db/mongodb";
import Product from "@/lib/db/models/Product";
import BlogPost from "@/lib/db/models/BlogPost";

async function getLatestProducts() {
  await connectToDatabase();
  return Product.find({ published: true }).sort({ createdAt: -1 }).limit(3).lean();
}

async function getLatestBlogPost() {
  await connectToDatabase();
  return BlogPost.findOne({ published: true }).sort({ publishedAt: -1 }).lean();
}

export default async function HomePage() {
  const [products, latestPost] = await Promise.all([
    getLatestProducts(),
    getLatestBlogPost(),
  ]);

  return (
    <div>

      {/* Hero Banner */}
      <section className="bg-white">
        <Image
          src="/banner.jpg"
          alt="Kopfüber — Liebevoll gestaltete Materialien zum Ausdrucken für Kita & Zuhause"
          width={3000}
          height={750}
          className="w-full h-auto"
          priority
        />
      </section>

      {/* Pastell-Navigationsleiste */}
      <div className="flex">
        <Link href="/shop" className="flex-1 bg-[#FDDDD4] hover:brightness-95 transition-all no-underline py-3 text-center text-sm font-bold text-[#222222] uppercase tracking-widest">
          Shop
        </Link>
        <Link href="/shop?category=F%C3%BCr%20Kinderg%C3%A4rten" className="flex-1 bg-[#C5E0E0] hover:brightness-95 transition-all no-underline py-3 text-center text-sm font-bold text-[#222222] uppercase tracking-widest">
          Für Kitas
        </Link>
        <Link href="/shop?category=F%C3%BCr%20Familien" className="flex-1 bg-[#FFF8E8] hover:brightness-95 transition-all no-underline py-3 text-center text-sm font-bold text-[#222222] uppercase tracking-widest">
          Für Familien
        </Link>
        <Link href="/blog" className="flex-1 bg-[#EBF5EB] hover:brightness-95 transition-all no-underline py-3 text-center text-sm font-bold text-[#222222] uppercase tracking-widest">
          Blog
        </Link>
        <Link href="/forum" className="flex-1 bg-[#FFF0EB] hover:brightness-95 transition-all no-underline py-3 text-center text-sm font-bold text-[#222222] uppercase tracking-widest">
          Forum
        </Link>
      </div>

      {/* Neuheiten */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-4xl font-black text-[#222222]">Neuheiten</h2>
            <p className="text-[#555555] mt-1">Die neuesten Materialien aus dem Shop</p>
          </div>
          <Link href="/shop" className="text-[#81ABAD] font-bold hover:underline text-sm">
            Alle ansehen →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 border-4 border-dashed border-[#F0DDD8] rounded-3xl">
            <p className="text-[#555555]">Produkte folgen in Kürze!</p>
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
      </section>

      {/* Letzter Blogbeitrag */}
      {latestPost && (
        <section className="bg-[#FFF5F2] py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-4xl font-black text-[#222222]">Aus dem Blog</h2>
                <p className="text-[#555555] mt-1">Tipps & Inspiration für Kita und Zuhause</p>
              </div>
              <Link href="/blog" className="text-[#81ABAD] font-bold hover:underline text-sm">
                Alle Beiträge →
              </Link>
            </div>
            <Link href={`/blog/${latestPost.slug}`} className="no-underline group">
              <div className="bg-white rounded-3xl border-2 border-[#F0DDD8] overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-all hover:-translate-y-1">
                {latestPost.coverImage && (
                  <div className="relative w-full sm:w-72 h-48 sm:h-auto flex-shrink-0">
                    <Image src={latestPost.coverImage} alt={latestPost.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-8 flex flex-col justify-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#81ABAD] mb-2">
                    {latestPost.publishedAt
                      ? new Date(latestPost.publishedAt).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })
                      : "Neuer Beitrag"}
                  </p>
                  <h3 className="font-display text-2xl font-black text-[#222222] mb-3 group-hover:text-[#81ABAD] transition-colors">
                    {latestPost.title}
                  </h3>
                  <p className="text-[#555555] leading-relaxed mb-4">{latestPost.excerpt}</p>
                  <span className="text-[#D68876] font-bold text-sm">Weiterlesen →</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Über mich */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl font-black text-[#222222] mb-4">
            Materialien mit Herzblut gemacht.
          </h2>
          <p className="text-[#555555] leading-relaxed mb-6 text-lg">
            Hinter Kopfüber steckt Julia Flagmeyer — und die Überzeugung,
            dass liebevoll gestaltete Materialien den Kita-Alltag schöner machen.
            Alles direkt ausdruckbar. Sofort einsatzbereit.
          </p>
          <Link href="/about">
            <Button size="lg" variant="outline">Meine Geschichte →</Button>
          </Link>
        </div>
      </section>

      {/* Kontaktformular */}
      <section className="bg-[#FFF5F2] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl font-black text-[#222222] mb-2">Individuelle Anfrage?</h2>
            <p className="text-[#555555]">
              Du brauchst etwas Besonderes oder hast eine Frage? Schreib mir einfach!
            </p>
          </div>
          <div className="bg-white rounded-3xl border-2 border-[#F0DDD8] p-8">
            <ContactForm />
          </div>
        </div>
      </section>

    </div>
  );
}
