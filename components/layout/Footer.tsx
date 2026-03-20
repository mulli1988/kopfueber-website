import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white border-t-2 border-dark mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-display text-3xl font-black tracking-tight mb-3">
              Kopf<span className="text-primary">über</span>
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Digitale Materialien für Kitas & Familien —<br />
              von einer Pädagogin für den Alltag gemacht.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
              Shop
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { href: "/shop", label: "Alle Produkte" },
                { href: "/shop?category=prints", label: "Prints" },
                { href: "/shop?category=digital", label: "Digitale Downloads" },
                { href: "/account", label: "Mein Konto" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/70 hover:text-white transition-colors no-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
              Info
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { href: "/about",   label: "Über mich" },
                { href: "/blog",    label: "Blog" },
                { href: "/forum",   label: "Community" },
                { href: "/impressum", label: "Impressum" },
                { href: "/datenschutz", label: "Datenschutz" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/70 hover:text-white transition-colors no-underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {year} Kopfüber. Alle Rechte vorbehalten.</p>
          <p>Mit ♥ gemacht</p>
        </div>
      </div>
    </footer>
  );
}
