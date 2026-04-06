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
          <li><strong>Benachrichtigungsliste:</strong> E-Mail-Adresse bei der Eintragung in unsere Neuigkeitenliste</li>
          <li><strong>Technische Daten:</strong> IP-Adresse, Browser-Typ und Zugriffszeiten (Serverlogs)</li>
        </ul>

        <h2>4. Rechtsgrundlagen der Verarbeitung (Art. 6 DSGVO)</h2>
        <ul>
          <li><strong>Konto-Daten &amp; Kauf-Daten:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
          <li><strong>Kontaktformular:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bearbeitung von Anfragen) bzw. lit. b, wenn die Anfrage vertragsrelevant ist</li>
          <li><strong>Benachrichtigungsliste:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
          <li><strong>Technische Daten / Serverlogs:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb der Website)</li>
        </ul>

        <h2>5. Wofür wir Daten verwenden</h2>
        <ul>
          <li>Bereitstellung der Website und des Shops</li>
          <li>Abwicklung von Bestellungen und digitalen Downloads</li>
          <li>Kommunikation mit dir (z. B. Bestellbestätigungen, Anfragen)</li>
          <li>Benachrichtigung bei neuen Produkten (nur bei ausdrücklicher Eintragung)</li>
        </ul>

        <h2>6. Drittanbieter</h2>
        <ul>
          <li><strong>Stripe</strong> (Zahlungsabwicklung) — <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer">stripe.com/de/privacy</a></li>
          <li><strong>Railway</strong> (Hosting &amp; Datenbank) — <a href="https://railway.app/legal/privacy" target="_blank" rel="noopener noreferrer">railway.app/legal/privacy</a></li>
          <li><strong>UploadThing</strong> (Dateispeicherung für Produkte und Downloads) — <a href="https://uploadthing.com/privacy-policy" target="_blank" rel="noopener noreferrer">uploadthing.com/privacy-policy</a></li>
          <li><strong>Instagram</strong> — Wir verlinken auf unser Instagram-Profil (instagram.com/july.fleur). Es sind keine Instagram-Inhalte direkt auf dieser Website eingebettet.</li>
        </ul>

        <h2>7. Übermittlung in Drittländer</h2>
        <p>
          Einige der oben genannten Drittanbieter (Stripe, Railway) haben ihren Sitz in den USA und
          verarbeiten Daten dort. Die Übermittlung erfolgt auf Grundlage von
          EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) oder eines
          Angemessenheitsbeschlusses der EU-Kommission. Nähere Informationen findest du in den
          Datenschutzerklärungen der jeweiligen Anbieter.
        </p>

        <h2>8. Cookies</h2>
        <p>
          Wir verwenden ausschließlich technisch notwendige Cookies für die Anmeldung (Session-Cookie).
          Es werden keine Tracking- oder Werbe-Cookies gesetzt. Cookies richten auf Ihrem Rechner
          keinen Schaden an und enthalten keine Viren. Du kannst deinen Browser so einstellen, dass
          Cookies abgelehnt werden; dies kann jedoch die Funktionalität der Website einschränken.
        </p>

        <h2>9. Deine Rechte (DSGVO)</h2>
        <p>
          Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
          Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch
          (Art. 21 DSGVO). Wurde die Verarbeitung auf eine Einwilligung gestützt, kannst du diese
          jederzeit ohne Angabe von Gründen widerrufen (Art. 7 Abs. 3 DSGVO) — die Rechtmäßigkeit
          der bis dahin erfolgten Verarbeitung bleibt hiervon unberührt.
        </p>
        <p>
          Wende dich für alle datenschutzbezogenen Anfragen an:{" "}
          <a href="mailto:Julyfleur@outlook.com">Julyfleur@outlook.com</a>
        </p>
        <p>
          Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte
          zur Übersendung von nicht ausdrücklich angeforderter Werbung wird hiermit ausdrücklich
          widersprochen.
        </p>

        <h2>10. Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO)</h2>
        <p>
          Du hast das Recht, dich jederzeit bei einer Datenschutz-Aufsichtsbehörde über die
          Verarbeitung deiner personenbezogenen Daten zu beschweren. Die zuständige Aufsichtsbehörde
          richtet sich nach deinem gewöhnlichen Aufenthaltsort oder Arbeitsort sowie dem Ort des
          mutmaßlichen Verstoßes.
        </p>

        <h2>11. Datenspeicherung</h2>
        <p>
          Deine Daten werden nicht länger aufbewahrt als gesetzlich erforderlich oder für die
          Erfüllung des jeweiligen Zwecks notwendig.
        </p>

      </div>
    </div>
  );
}
