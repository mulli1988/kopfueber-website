import type { Metadata } from "next";
import { Baloo_2, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/layout/SessionProvider";

const baloo2 = Baloo_2({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kopfüber — Prints & Grafik",
    template: "%s | Kopfüber",
  },
  description:
    "Handgemachte Drucke & Grafiken mit Herz. Entdecke einzigartige Kunstdrucke, digitale Downloads und mehr im Kopfüber-Shop.",
  openGraph: {
    title: "Kopfüber — Prints & Grafik",
    description:
      "Handgemachte Drucke & Grafiken mit Herz. Entdecke einzigartige Kunstdrucke im Kopfüber-Shop.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${baloo2.variable} ${inter.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Header />

          {/* Banner */}
          <div className="bg-white">
            <Image
              src="/banner.jpg"
              alt="Kopfüber — Liebevoll gestaltete Materialien zum Ausdrucken für Kita & Zuhause"
              width={3000}
              height={750}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Pastell-Navigationsleiste */}
          <div className="flex">
            <Link href="/shop" className="flex-1 bg-[#FDDDD4] hover:brightness-95 transition-all no-underline py-3 text-center text-sm font-bold text-[#222222] uppercase tracking-widest">
              Shop
            </Link>
            <Link href="/shop?category=F%C3%BCr%20Kinderg%C3%A4rten" className="flex-1 bg-[#C5E0E0] hover:brightness-95 transition-all no-underline py-3 text-center text-sm font-bold text-[#222222] uppercase tracking-widest">
              Für Kitas
            </Link>
            <Link href="/shop?category=F%C3%BCr%20Familien" className="flex-1 bg-[#FFF8E8] hover:brightness-95 transition-all no-underline py-3 text-center text-sm font-bold text-[#222222] uppercase tracking-widest">
              Für Familien
            </Link>
            <Link href="/blog" className="flex-1 bg-[#EBF5EB] hover:brightness-95 transition-all no-underline py-3 text-center text-sm font-bold text-[#222222] uppercase tracking-widest">
              Blog
            </Link>
            <Link href="/forum" className="flex-1 bg-[#FFF0EB] hover:brightness-95 transition-all no-underline py-3 text-center text-sm font-bold text-[#222222] uppercase tracking-widest">
              Forum
            </Link>
          </div>

          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
