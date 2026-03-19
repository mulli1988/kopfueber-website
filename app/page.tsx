import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

const CATEGORIES = [
  { name: "Für Kindergärten", emoji: "🏫", bg: "#E8F4F4", border: "#5B9EA0", desc: "Portfolio-Vorlagen, Lernmaterial, Morgenkreis & mehr" },
  { name: "Für Familien",     emoji: "🌈", bg: "#FFF0EB", border: "#C07B6B", desc: "Wochenpläne, Spiele & Beschäftigung für Zuhause" },
  { name: "Wandposter",       emoji: "🖼️", bg: "#FFF8E8", border: "#D4A855", desc: "Schöne Poster zum Ausdrucken & Aufhängen" },
  { name: "Weihnachten",      emoji: "🎄", bg: "#EBF5EB", border: "#6BA87A", desc: "Adventskalender, Spiele & festliche Vorlagen" },
  { name: "English Collection", emoji: "🌍", bg: "#E8F4F4", border: "#5B9EA0", desc: "Bilingual materials for multilingual families" },
  { name: "Kurse und Ratgeber", emoji: "📚", bg: "#FFF0EB", border: "#C07B6B", desc: "Wissen & Inspiration für Pädagog:innen" },
];

export default function HomePage() {
  return (
    <div>

      {/* Hero Banner */}
      <section className="bg-white">
        <div className="w-full">
          <Image
            src="/banner.jpg"
            alt="Kopfüber — Liebevoll gestaltete Materialien zum Ausdrucken für Kita & Zuhause"
            width={3000}
            height={750}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="flex flex-wrap gap-3 justify-center py-8 px-4">
          <Link href="/shop">
            <Button size="lg">Zum Shop →</Button>
          </Link>
          <Link href={`/shop?category=${encodeURIComponent("Für Kindergärten")}`}>
            <Button size="lg" variant="outline">🏫 Für Kitas</Button>
          </Link>
        </div>
      </section>

      {/* Pastell-Streifen */}
      <div className="flex h-3">
        <div className="flex-1 bg-[#FDDDD4]" />
        <div className="flex-1 bg-[#FFF8E8]" />
        <div className="flex-1 bg-[#C5E0E0]" />
        <div className="flex-1 bg-[#EBF5EB]" />
        <div className="flex-1 bg-[#FFF0EB]" />
      </div>

      {/* Kategorien */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-black text-[#3D3535] mb-2">Was findest du hier?</h2>
          <p className="text-[#8A7070]">Alle Materialien zum Sofort-Ausdrucken — mit Liebe gestaltet</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="no-underline group"
            >
              <div
                className="rounded-3xl p-6 border-2 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: cat.bg, borderColor: cat.border }}
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-display text-xl font-black mb-1 text-[#3D3535] group-hover:text-[#5B9EA0] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-[#8A7070] leading-snug">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/shop" className="text-[#5B9EA0] font-bold hover:underline">
            Alle Produkte ansehen →
          </Link>
        </div>
      </section>

      {/* Über mich */}
      <section className="bg-[#FFF5F2] py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-4xl mb-4">💛</p>
          <h2 className="font-display text-4xl font-black text-[#3D3535] mb-4">
            Materialien mit Herzblut gemacht.
          </h2>
          <p className="text-[#8A7070] leading-relaxed mb-6 text-lg">
            Hinter Kopfüber steckt Julia Flagmeyer — und die Überzeugung,
            dass liebevoll gestaltete Materialien den Kita-Alltag schöner machen.
            Alles direkt ausdruckbar. Sofort einsatzbereit.
          </p>
          <Link href="/about">
            <Button size="lg" variant="outline">Meine Geschichte →</Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="rounded-[var(--radius-xl)] text-center py-14 px-6" style={{ background: "linear-gradient(135deg, #FFF0EB 0%, #E8F4F4 100%)", border: "2px solid #F0DDD8" }}>
          <p className="text-5xl mb-4">🌈</p>
          <h2 className="font-display text-3xl font-black text-[#3D3535] mb-3">Nichts verpassen!</h2>
          <p className="text-[#8A7070] mb-6 max-w-md mx-auto">
            Neue Materialien, Inspirationen und exklusive Angebote —
            melde dich jetzt kostenlos an.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/register">
              <Button size="lg">Jetzt kostenlos registrieren</Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline">Zum Shop</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
