import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#F0DDD8]" style={{ boxShadow: "0 2px 12px rgba(192,123,107,0.08)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4 relative">

        {/* Logo + Markenname */}
        <Link href="/" className="no-underline">
          <Image
            src="/logo.jpg"
            alt="Kopfüber Logo"
            width={72}
            height={72}
            className="h-16 w-16 object-contain rounded-full"
            priority
          />
        </Link>

        {/* Desktop Navigation ausgeblendet */}

        {/* Rechts: Konto + Über mich + Shop */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/account"
            className="px-4 py-2 rounded-full text-sm font-semibold text-[#3D3535] hover:bg-[#FFF5F2] transition-colors no-underline"
          >
            Konto
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 rounded-full text-sm font-semibold text-[#3D3535] hover:bg-[#FFF5F2] transition-colors no-underline"
          >
            Über mich
          </Link>
          <Link
            href="/shop"
            className="px-5 py-2 rounded-full bg-[#81ABAD] text-white text-sm font-bold hover:bg-[#5D8F91] transition-colors no-underline"
          >
            Zum Shop →
          </Link>
        </div>

        {/* Mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
