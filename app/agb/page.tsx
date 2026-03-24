import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB",
  robots: { index: false },
};

export default function AgbPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl font-black mb-8">Allgemeine Geschäftsbedingungen</h1>

      <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold">

        <h2>§ 1 Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Käufe über den Online-Shop von
          Kopfüber, betrieben von Julia Flagmeyer, Calle de Mar Cantabrico 18, 38612 El Medano,
          Teneriffa, Spanien (nachfolgend „Anbieter"). Mit dem Abschluss eines Kaufvertrags erkennst
          du diese AGB an.
        </p>

        <h2>§ 2 Vertragsgegenstand</h2>
        <p>
          Der Anbieter verkauft ausschließlich digitale Produkte (Sofort-Downloads) — druckfertige
          Vorlagen, Materialien, E-Books und ähnliche Dateien. Es werden keine physischen Waren
          versendet.
        </p>

        <h2>§ 3 Vertragsschluss</h2>
        <p>
          Die Darstellung der Produkte im Shop stellt kein rechtlich bindendes Angebot dar, sondern
          eine Aufforderung zur Bestellung. Durch Klick auf „Kaufen" gibst du eine verbindliche
          Bestellung ab. Der Vertrag kommt mit der Bestätigung der Zahlung durch den
          Zahlungsdienstleister zustande.
        </p>

        <h2>§ 4 Preise und Zahlung</h2>
        <p>
          Alle Preise sind Endpreise in Euro (€). Die Zahlung erfolgt über Stripe. Akzeptiert werden
          gängige Kredit- und Debitkarten sowie weitere von Stripe angebotene Zahlungsmethoden.
          Die Transaktion wird direkt zwischen dir und Stripe abgewickelt — der Anbieter speichert
          keine Zahlungsdaten.
        </p>

        <h2>§ 5 Lieferung digitaler Inhalte</h2>
        <p>
          Nach erfolgreicher Zahlung steht der Download sofort in deinem Kundenkonto unter
          „Mein Konto" bereit. Du erhältst außerdem eine Bestätigungs-E-Mail. Die Dateien können
          beliebig oft für den privaten Gebrauch heruntergeladen werden.
        </p>

        <h2>§ 6 Widerrufsrecht — Ausschluss bei digitalen Inhalten</h2>
        <p>
          <strong>
            Das Widerrufsrecht erlischt bei digitalen Inhalten, sobald du dem sofortigen
            Download ausdrücklich zugestimmt hast und zur Kenntnis genommen hast, dass du damit
            dein Widerrufsrecht verlierst (Art. 16 lit. m der EU-Verbraucherrechterichtlinie).
          </strong>
        </p>
        <p>
          Durch den Kauf stimmst du ausdrücklich zu, dass der Download sofort nach Kaufabschluss
          beginnt und dass du damit auf dein Widerrufsrecht verzichtest.
        </p>

        <h2>§ 7 Nutzungsrecht</h2>
        <p>
          Mit dem Kauf erhältst du ein einfaches, nicht übertragbares Nutzungsrecht für den
          persönlichen und nicht-kommerziellen Gebrauch. Es ist nicht gestattet, die Dateien
          weiterzuverkaufen, in größeren Mengen zu vervielfältigen, zu lizenzieren oder öffentlich
          zugänglich zu machen. Die Urheberrechte verbleiben beim Anbieter.
        </p>

        <h2>§ 8 Mängelgewährleistung</h2>
        <p>
          Sollte eine Datei technisch defekt oder nicht korrekt herunterladbar sein, wende dich
          bitte an{" "}
          <a href="mailto:Julyfleur@outlook.com">Julyfleur@outlook.com</a>. Wir beheben das Problem
          oder stellen die Datei erneut bereit.
        </p>

        <h2>§ 9 Haftungsbeschränkung</h2>
        <p>
          Die Inhalte der Materialien basieren auf persönlicher Erfahrung und pädagogischem
          Fachwissen. Eine Garantie für bestimmte Ergebnisse oder eine pädagogische Eignung für
          spezifische Situationen kann nicht übernommen werden. Die Nutzung erfolgt auf eigene
          Verantwortung.
        </p>

        <h2>§ 10 Anwendbares Recht und Gerichtsstand</h2>
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
          Für Verbraucher gilt diese Rechtswahl nur, sofern dadurch nicht zwingende
          Schutzbestimmungen des Landes, in dem du deinen gewöhnlichen Aufenthalt hast,
          entzogen werden.
        </p>

        <h2>§ 11 Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>§ 12 Änderungen der AGB</h2>
        <p>
          Wir behalten uns vor, diese AGB jederzeit zu ändern. Die jeweils aktuelle Version ist auf
          dieser Seite abrufbar. Für bereits abgeschlossene Käufe gelten die AGB zum Zeitpunkt des
          Kaufs.
        </p>

        <p className="text-sm text-muted-foreground mt-8">Stand: März 2026</p>

      </div>
    </div>
  );
}
