import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl font-black mb-8">Impressum</h1>

      <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>DEIN NAME</strong><br />
          DEINE STRASSE UND HAUSNUMMER<br />
          DEINE PLZ ORT<br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:DEINE@EMAIL.DE">DEINE@EMAIL.DE</a>
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Gemäß § 19 UStG wird keine Umsatzsteuer berechnet
          (Kleinunternehmerregelung).<br />
          <em>(Falls du umsatzsteuerpflichtig bist, hier deine USt-IdNr. eintragen.)</em>
        </p>

        <h2>Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <p className="text-sm text-muted-foreground mt-8 p-4 bg-accent rounded-xl border border-dark">
          ⚠️ <strong>Hinweis:</strong> Bitte ersetze alle Platzhalter (DEIN NAME, DEINE STRASSE etc.)
          mit deinen echten Angaben. Das Impressum ist gesetzlich vorgeschrieben.
        </p>
      </div>
    </div>
  );
}
