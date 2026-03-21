"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactActions({ id, read }: { id: string; read: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    await fetch("/api/admin/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: !read }),
    });
    router.refresh();
    setLoading(false);
  }

  async function remove() {
    if (!confirm("Nachricht löschen?")) return;
    setLoading(true);
    await fetch("/api/admin/contact", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={toggle}
        disabled={loading}
        className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-[#81ABAD] text-[#81ABAD] hover:bg-[#81ABAD] hover:text-white transition-all disabled:opacity-50"
      >
        {read ? "Als ungelesen" : "Als gelesen"}
      </button>
      <button
        onClick={remove}
        disabled={loading}
        className="text-xs font-semibold px-3 py-1.5 rounded-full border-2 border-[#F0DDD8] text-[#888] hover:border-red-300 hover:text-red-500 transition-all disabled:opacity-50"
      >
        Löschen
      </button>
    </div>
  );
}
