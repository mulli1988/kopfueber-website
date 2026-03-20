"use client";

import { useRouter, useSearchParams } from "next/navigation";

const COLORS = [
  { bg: "#FFF5F2", border: "#E8A090" },
  { bg: "#C5E0E0", border: "#81ABAD" },
  { bg: "#FFF8E8", border: "#D4A855" },
  { bg: "#EBF5EB", border: "#6BA87A" },
  { bg: "#EDE8F5", border: "#9B8EC4" },
  { bg: "#FFF0EB", border: "#C07B6B" },
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
  );
}
