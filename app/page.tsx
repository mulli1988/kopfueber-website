import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20">
        <div className="max-w-3xl">
          <Badge variant="accent" className="mb-6 text-sm px-4 py-1.5">
            ✨ Neue Prints jetzt im Shop
          </Badge>
          <h1 className="font-display text-6xl sm:text-7xl font-black leading-[1.05] tracking-tight text-foreground mb-6">
            Kunst, die{" "}
            <span className="text-primary">kopfüber</span>{" "}
            macht.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
            Handgemachte Drucke & digitale Grafiken — jedes Stück mit Persönlichkeit.
            Entdecke einzigartige Kunstwerke für dein Zuhause oder deinen Schreibtisch.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop">
              <Button size="lg">Shop entdecken →</Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">Über mich</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative ticker */}
      <div className="border-y-2 border-dark bg-accent py-3 overflow-hidden">
        <p className="text-sm font-bold text-dark whitespace-nowrap">
          ★ Drucke &nbsp;&nbsp;&nbsp; ★ Digitale Downloads &nbsp;&nbsp;&nbsp; ★ Kunstgrafiken &nbsp;&nbsp;&nbsp; ★ Limitierte Editionen &nbsp;&nbsp;&nbsp; ★ Drucke &nbsp;&nbsp;&nbsp; ★ Digitale Downloads &nbsp;&nbsp;&nbsp; ★ Kunstgrafiken &nbsp;&nbsp;&nbsp; ★ Limitierte Editionen &nbsp;&nbsp;&nbsp;
        </p>
      </div>

      {/* Featured section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-4xl font-black">Highlights</h2>
          <Link href="/shop" className="text-sm font-semibold text-primary hover:underline">
            Alle ansehen →
          </Link>
        </div>

        {/* Product placeholder grid — wird in Phase 3 mit echten Daten befüllt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Platzhalter Print #1", price: "12,00 €", category: "Print" },
            { title: "Platzhalter Print #2", price: "9,00 €",  category: "Digital" },
            { title: "Platzhalter Print #3", price: "15,00 €", category: "Print" },
          ].map((item) => (
            <Card hover key={item.title} className="p-0 overflow-hidden">
              <div className="w-full aspect-square bg-muted flex items-center justify-center border-b-2 border-dark">
                <span className="text-5xl">🖼</span>
              </div>
              <div className="p-4">
                <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                <h3 className="font-display text-lg font-bold mt-1 mb-1">{item.title}</h3>
                <p className="font-semibold text-primary">{item.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-dark text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <Badge variant="accent" className="mb-4">Über mich</Badge>
            <h2 className="font-display text-4xl font-black mb-4 leading-tight">
              Hinter jedem Druck steckt eine Geschichte.
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Ich bin die Person hinter Kopfüber — und ich mache Dinge gerne verkehrt herum.
              Mehr über mich, meine Arbeit und meine Inspiration erfährst du auf der About-Seite.
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
          <h2 className="font-display text-3xl font-black mb-3">Nichts verpassen.</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Neue Prints, Blog-Beiträge und Community-Updates — erstell dir jetzt ein Konto.
          </p>
          <Link href="/register">
            <Button size="lg">Jetzt kostenlos registrieren</Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
