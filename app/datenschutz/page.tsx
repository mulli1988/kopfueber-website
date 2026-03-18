import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl font-black mb-8">Datenschutzerklärung</h1>

      <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold">
        <h2>1. Verantwortliche Person</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
          <strong>DEIN NAME</strong>, DEINE ADRESSE — <a href="mailto:DEINE@EMAIL.DE">DEINE@EMAIL.DE</a>
        </p>

        <h2>2. Welche Daten wir erheben</h2>
        <ul>
          <li><strong>Konto-Daten:</strong> Name, E-Mail-Adresse und Passwort (verschlüsselt gespeichert) bei der Registrierung</li>
          <li><strong>Kauf-Daten:</strong> Bestellinformationen und Zahlungsdaten (Zahlungsabwicklung durch Stripe — wir speichern keine Kartendaten)</li>
          <li><strong>Technische Daten:</strong> IP-Adresse, Browser-Typ und Zugriffszeiten (Serverlogs)</li>
        </ul>

        <h2>3. Wofür wir Daten verwenden</h2>
        <ul>
          <li>Bereitstellung der Website und des Shops</li>
          <li>Abwicklung von Bestellungen und Downloads</li>
          <li>Kommunikation mit dir (z. B. Bestellbestätigungen)</li>
        </ul>

        <h2>4. Drittanbieter</h2>
        <ul>
          <li><strong>Stripe</strong> (Zahlungsabwicklung) — Datenschutz: stripe.com/de/privacy</li>
          <li><strong>Railway</strong> (Hosting & Datenbank) — Datenschutz: railway.app/legal/privacy</li>
          <li><strong>Uploadthing</strong> (Datei-Uploads) — Datenschutz: uploadthing.com/privacy</li>
        </ul>

        <h2>5. Deine Rechte</h2>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
          der Verarbeitung deiner Daten (Art. 15–18 DSGVO). Wende dich dazu an
          <a href="mailto:DEINE@EMAIL.DE"> DEINE@EMAIL.DE</a>.
        </p>

        <h2>6. Cookies</h2>
        <p>
          Wir verwenden ausschließlich technisch notwendige Cookies für die
          Anmeldung (Session-Cookie). Es werden keine Tracking- oder
          Werbe-Cookies gesetzt.
        </p>

        <h2>7. Datenspeicherung</h2>
        <p>
          Deine Daten werden auf Servern in der EU gespeichert und nicht länger
          aufbewahrt als gesetzlich erforderlich.
        </p>

        <p className="text-sm text-muted-foreground mt-8 p-4 bg-accent rounded-xl border border-dark">
          ⚠️ <strong>Hinweis:</strong> Ersetze alle Platzhalter mit deinen echten Daten.
          Für eine rechtssichere Datenschutzerklärung empfiehlt sich ein Rechtsanwalt oder
          ein Generator wie datenschutz-generator.de.
        </p>
      </div>
    </div>
  );
}
