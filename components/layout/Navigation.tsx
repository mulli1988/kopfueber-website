"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const links = [
  { href: "/shop",   label: "Shop" },
  { href: "/blog",   label: "Blog" },
  { href: "/forum",  label: "Forum" },
  { href: "/about",  label: "Über mich" },
];

export default function Navigation({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {links.map(({ href, label }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "px-4 py-2 rounded-[var(--radius-md)] text-sm font-semibold transition-all duration-150",
              active
                ? "bg-primary text-white"
                : "text-foreground hover:bg-muted"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
