"use client";

import { useRouter, useSearchParams } from "next/navigation";

const COLORS = [
  { bg: "#FDDDD4", border: "#D4654A" },  // Koralle
  { bg: "#C5E0E0", border: "#2E8B8B" },  // Petrol
  { bg: "#FFF3B0", border: "#C9A800" },  // Sonnengelb
  { bg: "#D4EDDA", border: "#2E7D42" },  // Dunkelgrün
  { bg: "#E8D5F5", border: "#7B3FB5" },  // Lila
  { bg: "#FFD6E0", border: "#C41E5A" },  // Pink
  { bg: "#CFE2FF", border: "#1A5FBB" },  // Blau
  { bg: "#FFE5CC", border: "#C96A00" },  // Orange
  { bg: "#D6F5E8", border: "#1A7A4A" },  // Mintgrün
  { bg: "#F5D6D6", border: "#A01818" },  // Dunkelrot
  { bg: "#D6E8FF", border: "#1A4A99" },  // Stahlblau
  { bg: "#FFF0CC", border: "#B87A00" },  // Goldgelb
];

interface Props {
  subcategories: string[];
  active?: string;
  basePath: string;
}

export default function KitaSubcategoryFilter({ subcategories, active, basePath }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  function select(sub: string | null) {
    const p = new URLSearchParams(params.toString());
    if (!sub) {
      p.delete("sub");
    } else {
      p.set("sub", sub);
    }
    router.push(`${basePath}?${p.toString()}`);
  }

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Kategorien</p>
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => select(null)}
        className="px-5 py-3 rounded-2xl border-2 font-bold text-sm transition-all hover:-translate-y-0.5 text-[#3D3535]"
        style={{
          backgroundColor: "#FDDDD4",
          borderColor: "#D68876",
          boxShadow: !active ? "3px 4px 0px #C8A8A0" : undefined,
          transform: !active ? "translateY(-2px)" : undefined,
        }}
      >
        Alle
      </button>
      {subcategories.map((sub, i) => {
        const color = COLORS[i % COLORS.length];
        const isActive = active === sub;
        return (
          <button
            key={sub}
            onClick={() => select(sub)}
            className="px-5 py-3 rounded-2xl border-2 font-bold text-sm transition-all hover:-translate-y-0.5 text-[#3D3535]"
            style={{
              backgroundColor: color.bg,
              borderColor: color.border,
              boxShadow: isActive ? "3px 4px 0px #C8A8A0" : undefined,
              transform: isActive ? "translateY(-2px)" : undefined,
            }}
          >
            {sub}
          </button>
        );
      })}
    </div>
    </div>
  );
}
