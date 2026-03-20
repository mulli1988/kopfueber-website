"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <p className="font-display text-2xl font-black text-[#924d44] mb-2">Super, du bist dabei!</p>
        <p className="text-[#555555]">Wir melden uns, sobald die ersten Materialien verfügbar sind.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF5F2] rounded-3xl border-2 border-[#F0DDD8] p-8 text-center max-w-lg mx-auto">
      <p className="text-xs font-bold uppercase tracking-widest text-[#81ABAD] mb-2">Bald verfügbar</p>
      <h3 className="font-display text-2xl font-black text-[#222222] mb-2">
        Materialien kommen bald!
      </h3>
      <p className="text-[#555555] mb-6 leading-relaxed">
        Trag dich jetzt ein und werde als Erste informiert — plus exklusiver Frühbucher-Rabatt.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Dein Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-2xl border-2 border-[#F0DDD8] bg-white text-[#222222] placeholder-[#AAAAAA] focus:outline-none focus:border-[#81ABAD] transition-colors"
        />
        <input
          type="email"
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-2xl border-2 border-[#F0DDD8] bg-white text-[#222222] placeholder-[#AAAAAA] focus:outline-none focus:border-[#81ABAD] transition-colors"
        />
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Wird eingetragen…" : "Jetzt vormerken lassen"}
        </Button>
      </form>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-3">Etwas ist schiefgelaufen. Bitte versuche es nochmal.</p>
      )}
      <p className="text-xs text-[#AAAAAA] mt-4">Kein Spam. Nur echte Neuigkeiten, wenn es soweit ist.</p>
    </div>
  );
}
