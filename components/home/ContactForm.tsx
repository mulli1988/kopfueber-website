"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name") as HTMLInputElement).value,
      email:   (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <p className="font-display text-2xl font-black text-[#222222] mb-2">Vielen Dank!</p>
        <p className="text-[#555555]">Ich melde mich so schnell wie möglich bei dir.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-[#3D3535] mb-1">Name</label>
          <input
            name="name"
            required
            placeholder="Dein Name"
            className="w-full border-2 border-[#F0DDD8] rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#81ABAD] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-[#3D3535] mb-1">E-Mail</label>
          <input
            name="email"
            type="email"
            required
            placeholder="deine@email.de"
            className="w-full border-2 border-[#F0DDD8] rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#81ABAD] transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-[#3D3535] mb-1">Nachricht</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Was kann ich für dich tun?"
          className="w-full border-2 border-[#F0DDD8] rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#81ABAD] transition-colors resize-none"
        />
      </div>
      <div>
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Wird gesendet…" : "Nachricht senden →"}
        </Button>
        <p className="text-xs text-[#AAAAAA] mt-2">
          Mit dem Absenden stimmst du der Verarbeitung deiner Daten gemäß unserer{" "}
          <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link> zu.
        </p>
      </div>
      {status === "error" && (
        <p className="text-sm text-red-500">Etwas ist schiefgelaufen. Bitte versuche es nochmal.</p>
      )}
    </form>
  );
}
