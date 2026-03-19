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
            Herzlich willkommen in meiner kleinen Ecke des Internets, wo die Worte fliegen
            und die Kinderlachen erklingen!
          </p>
          <p>
            Mein Name ist Julia, und ich bin keine gewöhnliche Pädagogin — ich bin die
            Pädagogin mit einem breiten Lächeln und einer Prise sonniger Herzlichkeit.
          </p>
          <p>
            Mit sieben Jahren Erfahrung in der Leitung meines eigenen kleinen Kindergartens
            im Gepäck bin ich hier, um mit dir auf eine Reise durch die zauberhafte Welt
            der Kindererziehung zu gehen. Meine Vision ist einfach: Ich möchte, dass die
            Erziehung deiner Kinder genauso fröhlich und unvergesslich wird wie ein Tag
            unter der Sonne am Meer.
          </p>
          <p>
            In meinem Blog findest du nicht nur nützliche Tipps und Ratschläge zur
            Kindererziehung, sondern auch amüsante Anekdoten aus meinem eigenen
            Kindergartenalltag. Hier vereint sich die sonnige Wärme meiner derzeitigen
            Heimat Teneriffa mit meinem reichen Erfahrungsschatz in Hamburg zu einer
            einzigartigen Mischung.
          </p>
          <p>
            Lass uns gemeinsam auf dieser spannenden Reise gehen, bei der wir die Welt der
            Kindergartenkinder erkunden und die Elternschaft als das süße und erfüllende
            Abenteuer gestalten, das es sein kann.
          </p>
          <p>
            Ich freue mich darauf, dich in unserer bunten, humorvollen Gemeinschaft
            willkommen zu heißen!
          </p>
          <p className="font-display text-2xl font-bold text-[#D68876]">July</p>
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
