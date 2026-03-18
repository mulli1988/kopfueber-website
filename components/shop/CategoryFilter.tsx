"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface CategoryFilterProps {
  categories: string[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("category") ?? "Alle";

  function select(cat: string) {
    const p = new URLSearchParams(params.toString());
    if (cat === "Alle") {
      p.delete("category");
    } else {
      p.set("category", cat);
    }
    router.push(`/shop?${p.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {["Alle", ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => select(cat)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold border-2 border-dark transition-all",
            active === cat
              ? "bg-primary text-white shadow-[var(--shadow-sm)]"
              : "bg-surface text-foreground hover:bg-muted"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
