"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";

interface Props {
  id: string;
  approved: boolean;
}

export default function ReviewActions({ id, approved }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved: !approved }),
    });
    router.refresh();
    setLoading(false);
  }

  async function remove() {
    if (!confirm("Bewertung wirklich löschen?")) return;
    setLoading(true);
    await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex gap-2 flex-shrink-0">
      <Button size="sm" variant={approved ? "outline" : "primary"} onClick={toggle} disabled={loading}>
        {approved ? "Verbergen" : "Genehmigen"}
      </Button>
      <Button size="sm" variant="outline" onClick={remove} disabled={loading}
        className="text-red-500 border-red-300 hover:bg-red-50">
        Löschen
      </Button>
    </div>
  );
}
