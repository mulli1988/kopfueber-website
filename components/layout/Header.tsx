import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface border-b-2 border-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 relative">
        {/* Logo */}
        <Link href="/" className="no-underline flex items-center">
          <Image
            src="/logo.jpg"
            alt="Kopfüber Logo"
            width={120}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <Navigation className="hidden md:flex" />

        {/* Right side: Account + Cart */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/account"
            className="px-4 py-2 rounded-[var(--radius-md)] text-sm font-semibold text-foreground hover:bg-muted transition-colors no-underline"
          >
            Konto
          </Link>
          <Link
            href="/shop"
            className="px-4 py-2 rounded-[var(--radius-md)] bg-primary text-white text-sm font-semibold border-2 border-dark shadow-[var(--shadow-sm)] hover:translate-y-[-1px] hover:shadow-[var(--shadow-md)] transition-all no-underline"
          >
            Shop
          </Link>
        </div>

        {/* Mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
