import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#F0DDD8]" style={{ boxShadow: "0 2px 12px rgba(192,123,107,0.08)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4 relative">

        {/* Logo + Markenname */}
        <Link href="/" className="no-underline flex items-center gap-3 group">
          <Image
            src="/logo.jpg"
            alt="Kopfüber Logo"
            width={56}
            height={56}
            className="h-14 w-14 object-contain rounded-full"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-2xl font-black text-[#3D3535] group-hover:text-[#81ABAD] transition-colors tracking-tight">
              Kopf<span className="text-[#D68876] inline-block rotate-180">über</span>
            </span>
            <span className="text-[10px] font-semibold text-[#8A7070] uppercase tracking-widest">
              by Julia Flagmeyer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <Navigation className="hidden md:flex" />

        {/* Rechts: Konto + Shop */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/account"
            className="px-4 py-2 rounded-full text-sm font-semibold text-[#3D3535] hover:bg-[#FFF5F2] transition-colors no-underline"
          >
            Konto
          </Link>
          <Link
            href="/shop"
            className="px-5 py-2 rounded-full bg-[#5B9EA0] text-white text-sm font-bold hover:bg-[#3D8082] transition-colors no-underline"
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
