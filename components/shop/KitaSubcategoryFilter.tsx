"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";

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

  const btnBase = "px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all";
  const btnInactive = "bg-white border-[#E0D8D5] text-[#555555] hover:border-[#924d44] hover:text-[#924d44]";
  const btnActive = "bg-[#924d44] border-[#924d44] text-white";

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => select(null)} className={cn(btnBase, !active ? btnActive : btnInactive)}>
        Alle
      </button>
      {subcategories.map((sub) => (
        <button
          key={sub}
          onClick={() => select(sub)}
          className={cn(btnBase, active === sub ? btnActive : btnInactive)}
        >
          {sub}
        </button>
      ))}
    </div>
  );
}
