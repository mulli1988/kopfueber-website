export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/shop/ProductCard";
import ContactForm from "@/components/home/ContactForm";
import WaitlistForm from "@/components/home/WaitlistForm";
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

      {/* Hero */}
      <section className="bg-[#FFF5F2] py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#81ABAD] mb-3">
            Von einer Erzieherin — mit Herz und Praxis-Know-how
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-[#222222] leading-tight mb-4">
            E-Books, Ratgeber & druckfertige Materialien für Kitas & Familien
          </h1>
          <p className="text-lg text-[#555555] leading-relaxed">
            Kein Design-Aufwand, kein langes Suchen — einfach herunterladen, ausdrucken und loslegen.
          </p>
        </div>
      </section>

      {/* Trust-Bar */}
      <div className="bg-white border-y border-[#F0DDD8] py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[#555555] font-medium">
          <span>✓ Von einer Kindergartenleiterin mit 15 Jahren Erfahrung</span>
          <span>✓ Sofort druckbereit — kein Design-Aufwand</span>
          <span>✓ Für Kita-Alltag & Familien</span>
        </div>
      </div>

      {/* Neuheiten */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl font-black text-[#924d44]">Jetzt neu im Shop</h2>
          <p className="text-[#555555] mt-1">Die neuesten Materialien aus dem Shop</p>
          <Link href="/shop" className="text-[#81ABAD] font-bold hover:underline text-sm inline-block mt-2">
            Alle ansehen →
          </Link>
        </div>

        {products.length === 0 ? (
          <WaitlistForm />
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
            <div className="text-center mb-8">
              <h2 className="font-display text-4xl font-black text-[#924d44]">Neuste Blogbeiträge</h2>
              <p className="text-[#555555] mt-1">Tipps & Inspiration für Kita und Zuhause</p>
              <Link href="/blog" className="text-[#81ABAD] font-bold hover:underline text-sm inline-block mt-2">
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
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#D68876] shadow-md">
              <Image
                src="/julia.jpg"
                alt="Julia Flagmeyer"
                width={224}
                height={224}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#81ABAD] mb-2">Über mich</p>
            <h2 className="font-display text-4xl font-black text-[#222222] mb-4">
              Hey, ich bin Julia!
            </h2>
            <p className="text-[#555555] leading-relaxed mb-6 text-lg">
              Mit 15 Jahren als Erzieherin und 7 Jahren als Kindergartenleiterin weiß ich, was
              im Kita-Alltag wirklich gebraucht wird. Alles, was du sonst stundenlang selbst
              gestaltest, bekommst du hier sofort — fertig, schön und direkt einsetzbar.
            </p>
            <Link href="/about">
              <Button size="lg" variant="outline">Mehr über mich</Button>
            </Link>
          </div>
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
