"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface Category {
  name: string;
  emoji: string;
  color: string;
  border: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const router = useRouter();
  const params = useSearchParams();

  function select(cat: string | null) {
    const p = new URLSearchParams(params.toString());
    if (!cat) {
      p.delete("category");
    } else {
      p.set("category", cat);
    }
    router.push(`/shop?${p.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      {/* "Alle" Button */}
      <button
        onClick={() => select(null)}
        className={cn(
          "flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-dark font-bold text-sm transition-all shadow-[var(--shadow-sm)] hover:-translate-y-0.5",
          !activeCategory
            ? "bg-dark text-white"
            : "bg-surface text-foreground hover:bg-muted"
        )}
      >
        <span>✨</span>
        <span>Alle Produkte</span>
      </button>

      {/* Kategorie-Karten */}
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => select(cat.name)}
          className={cn(
            "flex items-center gap-2 px-5 py-3 rounded-2xl border-2 font-bold text-sm transition-all shadow-[var(--shadow-sm)] hover:-translate-y-0.5",
            activeCategory === cat.name
              ? `${cat.color} ${cat.border} -translate-y-0.5 shadow-[var(--shadow-md)]`
              : "bg-surface border-dark text-foreground hover:bg-muted"
          )}
        >
          <span className="text-lg">{cat.emoji}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}
