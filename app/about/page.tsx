import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Über mich",
  description: "Die Geschichte hinter Kopfüber.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Badge variant="accent" className="mb-4">Über mich</Badge>
      <h1 className="font-display text-5xl font-black leading-tight mb-6">
        Hinter jedem Druck<br />steckt eine Geschichte.
      </h1>

      {/* Platzhalter — wird mit echtem Inhalt befüllt */}
      <div className="prose prose-lg max-w-none mb-10
        prose-headings:font-display prose-headings:font-black
        prose-a:text-primary">
        <p>
          Hier steht deine persönliche Geschichte — wer du bist, was dich antreibt
          und warum du Kopfüber gegründet hast. Dieser Text kann im Admin-Portal
          jederzeit angepasst werden.
        </p>
        <p>
          Kopfüber steht für Kunst, die aus dem Kopf fällt und das Herz anspricht.
          Jedes Stück ist mit Sorgfalt und Leidenschaft entstanden.
        </p>
      </div>

      <Card className="bg-muted border-dark mb-8">
        <h2 className="font-display text-xl font-bold mb-2">Kontakt</h2>
        <p className="text-muted-foreground text-sm">
          Du hast Fragen, Wünsche oder möchtest einfach Hallo sagen?
          Schreib mir gerne — ich freue mich!
        </p>
      </Card>

      <Link href="/shop">
        <Button size="lg">Zum Shop →</Button>
      </Link>
    </div>
  );
}
