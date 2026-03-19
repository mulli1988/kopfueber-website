import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Über mich",
  description: "Julia Flagmeyer — Erzieherin, Kindergartenleiterin und Gründerin von Kopfüber.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#FFF5F2] py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">

          {/* Foto */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#D68876] shadow-lg">
              <Image
                src="/julia.jpg"
                alt="Julia Flagmeyer"
                width={320}
                height={320}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Intro */}
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#81ABAD] mb-2">Über mich</p>
            <h1 className="font-display text-5xl font-black text-[#222222] leading-tight mb-4">
              Hallo, ich bin Julia!
            </h1>
            <p className="text-xl text-[#555555] leading-relaxed">
              Erzieherin aus Hamburg, Kindergartenleiterin mit Leib und Seele —
              und heute mit Sonnenschein auf Teneriffa.
            </p>
          </div>
        </div>
      </section>

      {/* Text */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

        <div className="space-y-6 text-lg text-[#444444] leading-relaxed">
          <p>
            Ich bin Julia, gebürtig aus dem wunderschönen Hamburg — und seit 15 Jahren mit Herz
            und Seele Erzieherin. In den letzten sieben Jahren habe ich meinen eigenen Kindergarten
            geleitet und mich dabei auf die Arbeit mit Krippenkindern spezialisiert.
          </p>
          <p>
            Die ersten Lebensjahre sind eine magische Zeit voller Entdeckungen. Die Kleinen brauchen
            viel Vertrauen, Wärme und liebevolle Unterstützung — und genau das ist der Kern meiner
            Arbeit. Jedes Material, das ich gestalte, entsteht aus dieser Überzeugung heraus.
          </p>
          <p>
            Heute lebe ich auf Teneriffa und bringe die sonnige Energie der Insel in alles ein,
            was ich tue. Diese Mischung aus Hamburger Gründlichkeit und kanarischer Leichtigkeit
            macht meine Materialien zu dem, was sie sind: durchdacht, liebevoll — und mit einem
            Lächeln gemacht.
          </p>
          <p>
            Ich freue mich darauf, dich in meiner warmen und humorvollen Community willkommen zu
            heißen. Gemeinsam entdecken wir die Wunder der Kindheit — kopfüber!
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-12">
          <div className="bg-[#C5E0E0] rounded-3xl p-6 text-center border-2 border-[#81ABAD]">
            <p className="text-4xl font-black text-[#222222] mb-1">15</p>
            <p className="text-sm font-bold text-[#444444]">Jahre als Erzieherin</p>
          </div>
          <div className="bg-[#FDDDD4] rounded-3xl p-6 text-center border-2 border-[#D68876]">
            <p className="text-4xl font-black text-[#222222] mb-1">7</p>
            <p className="text-sm font-bold text-[#444444]">Jahre Kindergartenleitung</p>
          </div>
          <div className="bg-[#EBF5EB] rounded-3xl p-6 text-center border-2 border-[#6BA87A]">
            <p className="text-4xl font-black text-[#222222] mb-1">Teneriffa</p>
            <p className="text-sm font-bold text-[#444444]">Meine Wahlheimat</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/shop">
            <Button size="lg">Zum Shop</Button>
          </Link>
          <Link href="/#kontakt">
            <Button size="lg" variant="outline">Schreib mir</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
