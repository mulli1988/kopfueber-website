"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCancel() {
    if (!confirm("Abo wirklich kündigen? Es läuft bis zum Ende des Abrechnungszeitraums weiter.")) return;
    setLoading(true);
    const res = await fetch("/api/subscription/cancel", { method: "POST" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Fehler beim Kündigen. Bitte versuche es erneut.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="text-sm font-semibold px-4 py-2 rounded-2xl border-2 border-[#F0DDD8] text-[#888] hover:border-red-300 hover:text-red-500 transition-all disabled:opacity-50"
    >
      {loading ? "Wird gekündigt…" : "Abo kündigen"}
    </button>
  );
}
