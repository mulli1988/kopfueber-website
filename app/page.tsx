import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const CATEGORIES = [
  { name: "Für Kindergärten", emoji: "🏫", color: "bg-[#EDD5CB]", border: "border-[#A06B5B]", desc: "Portfolio-Vorlagen, Lernmaterial, Morgenkreis & mehr" },
  { name: "Für Familien",     emoji: "👨‍👩‍👧", color: "bg-[#C9DFE0]", border: "border-[#5B8A8B]", desc: "Wochenpläne, Spiele & Beschäftigung für Zuhause" },
  { name: "Wandposter",       emoji: "🖼️",  color: "bg-[#F5EDE9]", border: "border-[#C08878]", desc: "Schöne Poster zum Ausdrucken & Aufhängen" },
  { name: "Weihnachten",      emoji: "🎄",  color: "bg-[#D4E8D4]", border: "border-[#5B8A8B]", desc: "Adventskalender, Spiele & festliche Vorlagen" },
  { name: "English Collection", emoji: "🌍", color: "bg-[#C9DFE0]", border: "border-[#3D6E6F]", desc: "Bilingual materials for multilingual families" },
  { name: "Kurse und Ratgeber", emoji: "📚", color: "bg-[#EDD5CB]", border: "border-[#7A4F42]", desc: "Wissen & Inspiration für Pädagog:innen" },
];

const HIGHLIGHTS = [
  { emoji: "🎂", label: "Geburtstagskalender" },
  { emoji: "🎲", label: "Spiele" },
  { emoji: "📋", label: "Portfolio-Vorlagen" },
  { emoji: "📖", label: "Lernmaterial" },
  { emoji: "📅", label: "Wochenpläne" },
  { emoji: "🌅", label: "Morgenkreis" },
  { emoji: "👗", label: "Anziehtafeln" },
  { emoji: "🌈", label: "Wandposter" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="accent" className="mb-6 text-sm px-4 py-1.5">
              🖨️ Sofort druckbereit · Digitale Downloads
            </Badge>
            <h1 className="font-display text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight text-foreground mb-6">
              Liebevoll gestaltete{" "}
              <span className="text-primary">Materialien</span>{" "}
              für Kita & Zuhause
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Druckbare Vorlagen, Lernmaterial und Poster — mit Herz gestaltet
              für Erzieher:innen, Eltern und Kinder.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop">
                <Button size="lg">Zum Shop →</Button>
              </Link>
              <Link href="/shop?category=F%C3%BCr+Kinderg%C3%A4rten">
                <Button size="lg" variant="outline">🏫 Für Kitas</Button>
              </Link>
            </div>
          </div>

          {/* Produkt-Highlight Chips */}
          <div className="hidden lg:flex flex-wrap gap-3 justify-center">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-2 bg-surface border-2 border-dark rounded-2xl px-4 py-3 shadow-[var(--shadow-sm)] font-semibold text-sm"
              >
                <span className="text-2xl">{h.emoji}</span>
                <span>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="border-y-2 border-dark bg-accent py-3 overflow-hidden">
        <p className="text-sm font-bold text-dark whitespace-nowrap animate-pulse">
          🏫 Portfolio-Vorlagen &nbsp;·&nbsp; 🎂 Geburtstagskalender &nbsp;·&nbsp; 🎲 Spiele &nbsp;·&nbsp; 📋 Wochenpläne &nbsp;·&nbsp; 🌅 Morgenkreis &nbsp;·&nbsp; 🖼️ Wandposter &nbsp;·&nbsp; 📖 Lernmaterial &nbsp;·&nbsp; 🌈 Für Kita & Zuhause &nbsp;·&nbsp;
          🏫 Portfolio-Vorlagen &nbsp;·&nbsp; 🎂 Geburtstagskalender &nbsp;·&nbsp; 🎲 Spiele &nbsp;·&nbsp; 📋 Wochenpläne &nbsp;·&nbsp;
        </p>
      </div>

      {/* Kategorien-Übersicht */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-4xl font-black">Was findest du hier?</h2>
            <p className="text-muted-foreground mt-1">Alle Materialien zum Sofort-Ausdrucken</p>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-primary hover:underline">
            Alle Produkte →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="no-underline group"
            >
              <div className={`${cat.color} border-2 ${cat.border} rounded-[var(--radius-xl)] p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all`}>
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-display text-xl font-black mb-1 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-dark/70 leading-snug">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Über mich Teaser */}
      <section className="bg-dark text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <Badge variant="accent" className="mb-4">Über Kopfüber</Badge>
            <h2 className="font-display text-4xl font-black mb-4 leading-tight">
              Materialien mit Herzblut gemacht.
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Kopfüber steht für liebevoll gestaltete, druckbare Materialien —
              für Erzieher:innen, die Abwechslung suchen, und Eltern, die Zuhause
              etwas Besonderes schaffen wollen. Alles direkt ausdruckbar. Sofort einsatzbereit.
            </p>
            <Link href="/about">
              <Button variant="secondary" size="lg">Meine Geschichte →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <Card className="bg-accent border-dark text-center py-12">
          <p className="text-4xl mb-4">🌈</p>
          <h2 className="font-display text-3xl font-black mb-3">Nichts verpassen.</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Neue Materialien, Blog-Beiträge und Inspirationen —
            erstell dir jetzt ein Konto und bleib auf dem Laufenden.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/register">
              <Button size="lg">Jetzt kostenlos registrieren</Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline">Zum Shop</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
