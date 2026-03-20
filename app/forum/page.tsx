"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ForumPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#81ABAD] mb-3">Coming Soon</p>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-[#222222] leading-tight mb-4">
          Die Community entsteht
        </h1>
        <p className="text-lg text-[#555555] leading-relaxed mb-4">
          Hier entsteht ein Ort zum Austauschen, Fragen stellen und Ideen teilen —
          für Erzieherinnen, Eltern und alle, die Kinder begleiten.
        </p>
        <p className="text-[#555555] mb-8">
          Trag dich ein und werde informiert, sobald das Forum öffnet:
        </p>

        {status === "success" ? (
          <div className="bg-[#FFF5F2] rounded-3xl border-2 border-[#F0DDD8] p-8">
            <p className="font-display text-xl font-black text-[#924d44] mb-1">Du bist dabei!</p>
            <p className="text-[#555555] text-sm">Wir melden uns, wenn es losgeht.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Deine E-Mail-Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-[#F0DDD8] bg-white text-[#222222] placeholder-[#AAAAAA] focus:outline-none focus:border-[#81ABAD] transition-colors"
            />
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Wird eingetragen…" : "Benachrichtigen"}
            </Button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm mt-3">Etwas ist schiefgelaufen. Bitte versuche es nochmal.</p>
        )}
      </div>
    </div>
  );
}
