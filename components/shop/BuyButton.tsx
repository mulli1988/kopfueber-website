"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface BuyButtonProps {
  productId: string;
  mode?: "payment" | "subscription";
  label?: string;
  disabled?: boolean;
}

export default function BuyButton({ productId, mode = "payment", label, disabled: externalDisabled }: BuyButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, mode }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Fehler beim Checkout. Bitte versuche es erneut.");
      setLoading(false);
    }
  }

  return (
    <Button size="lg" onClick={handleBuy} disabled={loading || externalDisabled} className="w-full sm:w-auto">
      {loading ? "Weiterleitung…" : label ?? (mode === "subscription" ? "Abo abschließen" : "Jetzt kaufen")}
    </Button>
  );
}
