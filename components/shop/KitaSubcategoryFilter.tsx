"use client";

import { useRouter, useSearchParams } from "next/navigation";

const COLORS = [
  { bg: "#cee5c2", border: "#7aaa64" },
  { bg: "#ccc6db", border: "#8878aa" },
  { bg: "#fafada", border: "#c0c077" },
  { bg: "#eebcd7", border: "#cc7aaa" },
  { bg: "#f8ded2", border: "#dd9977" },
  { bg: "#cde1f2", border: "#7aabcc" },
  { bg: "#ddb883", border: "#aa7733" },
  { bg: "#93e3c6", border: "#3aaa88" },
  { bg: "#bccacb", border: "#6a9090" },
  { bg: "#cee5c2", border: "#7aaa64" },
  { bg: "#ccc6db", border: "#8878aa" },
  { bg: "#eebcd7", border: "#cc7aaa" },
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
