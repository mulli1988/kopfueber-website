"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function BlogDeleteButton({ postId }: { postId: string }) {
  const router = useRouter();
  async function handleDelete() {
    if (!confirm("Beitrag wirklich löschen?")) return;
    const res = await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: postId }),
    });
    if (res.ok) router.refresh();
    else alert("Fehler beim Löschen.");
  }
  return (
    <Button variant="outline" size="sm" onClick={handleDelete}
      className="border-red-400 text-red-600 hover:bg-red-50">
      Löschen
    </Button>
  );
}
