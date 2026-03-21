"use client";

import { useRouter, useSearchParams } from "next/navigation";

const COLORS = [
  { bg: "#FFF3B0", border: "#B89A00" },  // Gelb
  { bg: "#C5E0E0", border: "#1E8080" },  // Petrol
  { bg: "#CFE2FF", border: "#1A5FBB" },  // Blau
  { bg: "#FFD6E7", border: "#CC1166" },  // Pink
  { bg: "#E8D5F5", border: "#6A2BA0" },  // Lila
  { bg: "#FFE0C0", border: "#CC5500" },  // Orange
  { bg: "#D4EDDA", border: "#2E6B2E" },  // Grün
  { bg: "#F5D0D0", border: "#AA1111" },  // Rot
  { bg: "#C0F0F0", border: "#007777" },  // Türkis
  { bg: "#F0E0C8", border: "#7A4A1A" },  // Braun
  { bg: "#D0D8FF", border: "#3344BB" },  // Indigo
  { bg: "#E0F5C0", border: "#3A7A00" },  // Lindgrün
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
