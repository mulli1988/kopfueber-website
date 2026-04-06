"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function BlogNewsletterForm() {
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

  if (status === "success") {
    return (
      <div className="bg-[#EBF5EB] rounded-3xl border-2 border-[#6BA87A] p-6 text-center">
        <p className="font-display text-lg font-black text-[#222222] mb-1">Super, du bist dabei!</p>
        <p className="text-[#555555] text-sm">Du erhältst neue Artikel direkt in dein Postfach.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#C5E0E0] rounded-3xl border-2 border-[#81ABAD] p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-[#81ABAD] mb-2">Newsletter</p>
      <h3 className="font-display text-xl font-black text-[#222222] mb-2">
        Mehr Tipps direkt ins Postfach?
      </h3>
      <p className="text-[#555555] text-sm leading-relaxed mb-4">
        Trag dich ein und erhalte regelmäßig Inspirationen für Kita & Zuhause.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-2xl border-2 border-[#81ABAD] bg-white text-[#222222] placeholder-[#AAAAAA] focus:outline-none focus:border-[#5D8F91] transition-colors"
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Wird eingetragen…" : "Jetzt eintragen"}
        </Button>
      </form>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-3">Etwas ist schiefgelaufen. Bitte versuche es nochmal.</p>
      )}
      <p className="text-xs text-[#AAAAAA] mt-3">
        Mit der Eintragung stimmst du zu, Neuigkeiten von Kopfüber zu erhalten. Weitere Infos in der{" "}
        <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link>.
      </p>
    </div>
  );
}
