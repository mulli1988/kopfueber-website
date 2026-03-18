"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

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
    <Button variant="outline" size="sm" onClick={handleCancel} disabled={loading}>
      {loading ? "Wird gekündigt…" : "Abo kündigen"}
    </Button>
  );
}
