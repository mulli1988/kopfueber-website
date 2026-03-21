"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const BANNERS: Record<string, { src: string; alt: string }> = {
  "/fur-kitas":    { src: "/banner-kitas.jpg",    alt: "Kopfüber — Materialien für Kindergärten und Kitas" },
  "/fur-familien": { src: "/banner-familien.jpg", alt: "Kopfüber — Materialien für Familien" },
  "/blog":         { src: "/banner-blog.jpg",     alt: "Kopfüber Blog — Tipps für Kita & Familie" },
  "/forum":        { src: "/banner-forum.jpg",    alt: "Kopfüber Forum — Community für Erzieherinnen und Eltern" },
};

const DEFAULT = { src: "/banner2.jpg", alt: "Kopfüber — Liebevoll gestaltete Materialien zum Ausdrucken für Kita & Zuhause" };

export default function DynamicBanner() {
  const pathname = usePathname();

  // Kein Banner auf Admin- und Account-Seiten
  if (pathname.startsWith("/admin") || pathname.startsWith("/account") || pathname.startsWith("/(auth)")) {
    return null;
  }

  const banner = BANNERS[pathname] ?? DEFAULT;

  return (
    <div className="bg-white">
      <Image
        src={banner.src}
        alt={banner.alt}
        width={3000}
        height={750}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
