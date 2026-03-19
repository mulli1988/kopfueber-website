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

const ALL_BG    = "#FDDDD4";
const ALL_BORDER = "#D68876";

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
        className="px-5 py-3 rounded-2xl border-2 font-bold text-sm transition-all hover:-translate-y-0.5 hover:brightness-95 text-[#3D3535]"
        style={{
          backgroundColor: ALL_BG,
          borderColor: ALL_BORDER,
          boxShadow: !activeCategory ? "3px 4px 0px #C8A8A0" : undefined,
          transform: !activeCategory ? "translateY(-2px)" : undefined,
        }}
      >
        Alle Produkte
      </button>

      {/* Kategorie-Buttons */}
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => select(cat.name)}
          className={cn(
            "px-5 py-3 rounded-2xl border-2 font-bold text-sm transition-all hover:-translate-y-0.5 hover:brightness-95 text-[#3D3535]",
            activeCategory === cat.name && "-translate-y-0.5"
          )}
          style={{
            backgroundColor: cat.color.replace("bg-[", "").replace("]", ""),
            borderColor: cat.border.replace("border-[", "").replace("]", ""),
            boxShadow: activeCategory === cat.name ? "3px 4px 0px #C8A8A0" : undefined,
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
