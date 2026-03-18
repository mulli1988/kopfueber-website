"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const links = [
  { href: "/shop",   label: "Shop" },
  { href: "/blog",   label: "Blog" },
  { href: "/forum",  label: "Forum" },
  { href: "/about",  label: "Über mich" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menü öffnen"
        className="p-2 rounded-[var(--radius-md)] hover:bg-muted transition-colors"
      >
        <span className="block w-6 h-0.5 bg-foreground mb-1.5 transition-all" />
        <span className="block w-6 h-0.5 bg-foreground mb-1.5 transition-all" />
        <span className="block w-6 h-0.5 bg-foreground transition-all" />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-surface border-b-2 border-dark shadow-[var(--shadow-md)] z-50">
          <nav className="flex flex-col p-4 gap-1">
            {links.map(({ href, label }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-[var(--radius-md)] text-base font-semibold transition-all",
                    active
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <hr className="border-border my-2" />
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-[var(--radius-md)] text-base font-semibold text-foreground hover:bg-muted"
            >
              Mein Konto
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
