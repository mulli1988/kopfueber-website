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
          <strong>Julia Flagmeyer</strong>, Kopfüber —{" "}
          <a href="mailto:Julyfleur@outlook.com">Julyfleur@outlook.com</a>
        </p>

        <h2>2. Allgemeines zur Datenverarbeitung</h2>
        <p>
          Die Nutzung dieser Website ist in der Regel ohne Angabe personenbezogener Daten möglich.
          Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt dies auf
          freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte
          weitergegeben.
        </p>
        <p>
          Wir weisen darauf hin, dass die Datenübertragung im Internet Sicherheitslücken aufweisen
          kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
        </p>

        <h2>3. Welche Daten wir erheben</h2>
        <ul>
          <li><strong>Konto-Daten:</strong> Name, E-Mail-Adresse und Passwort (verschlüsselt gespeichert) bei der Registrierung</li>
          <li><strong>Kauf-Daten:</strong> Bestellinformationen und Zahlungsdaten (Zahlungsabwicklung durch Stripe — wir speichern keine Kartendaten)</li>
          <li><strong>Kontaktformular:</strong> Name und E-Mail-Adresse bei Anfragen über das Kontaktformular</li>
          <li><strong>Warteliste:</strong> E-Mail-Adresse bei der Eintragung in unsere Benachrichtigungsliste</li>
          <li><strong>Technische Daten:</strong> IP-Adresse, Browser-Typ und Zugriffszeiten (Serverlogs)</li>
        </ul>

        <h2>4. Wofür wir Daten verwenden</h2>
        <ul>
          <li>Bereitstellung der Website und des Shops</li>
          <li>Abwicklung von Bestellungen und digitalen Downloads</li>
          <li>Kommunikation mit dir (z. B. Bestellbestätigungen, Anfragen)</li>
          <li>Benachrichtigung bei neuen Produkten (nur bei ausdrücklicher Eintragung)</li>
        </ul>

        <h2>5. Drittanbieter</h2>
        <ul>
          <li><strong>Stripe</strong> (Zahlungsabwicklung) — <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer">stripe.com/de/privacy</a></li>
          <li><strong>Railway</strong> (Hosting & Datenbank) — <a href="https://railway.app/legal/privacy" target="_blank" rel="noopener noreferrer">railway.app/legal/privacy</a></li>
          <li><strong>Instagram</strong> — Auf unseren Seiten sind Funktionen des Dienstes Instagram eingebunden (Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA). Weitere Informationen: <a href="https://instagram.com/about/legal/privacy/" target="_blank" rel="noopener noreferrer">instagram.com/about/legal/privacy/</a></li>
        </ul>

        <h2>6. Cookies</h2>
        <p>
          Wir verwenden ausschließlich technisch notwendige Cookies für die Anmeldung (Session-Cookie).
          Es werden keine Tracking- oder Werbe-Cookies gesetzt. Cookies richten auf Ihrem Rechner
          keinen Schaden an und enthalten keine Viren. Sie können Ihren Browser so einstellen, dass
          Cookies abgelehnt werden; dies kann jedoch die Funktionalität der Website einschränken.
        </p>

        <h2>7. Deine Rechte (DSGVO)</h2>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
          deiner Daten (Art. 15–18 DSGVO). Wende dich dazu an{" "}
          <a href="mailto:Julyfleur@outlook.com">Julyfleur@outlook.com</a>.
        </p>
        <p>
          Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte
          zur Übersendung von nicht ausdrücklich angeforderter Werbung wird hiermit ausdrücklich
          widersprochen.
        </p>

        <h2>8. Datenspeicherung</h2>
        <p>
          Deine Daten werden nicht länger aufbewahrt als gesetzlich erforderlich oder für die
          Erfüllung des jeweiligen Zwecks notwendig.
        </p>

      </div>
    </div>
  );
}
