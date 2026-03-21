"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, text }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[#FFF5F2] rounded-3xl border-2 border-[#F0DDD8] p-8 text-center">
        <p className="font-display text-xl font-black text-[#924d44] mb-1">Danke für deine Bewertung!</p>
        <p className="text-[#555555] text-sm">Sie wird nach kurzer Prüfung veröffentlicht.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border-2 border-[#F0DDD8] p-8 flex flex-col gap-5">
      {/* Sterne */}
      <div>
        <p className="text-sm font-bold mb-2">Deine Bewertung</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="text-3xl transition-colors leading-none"
              style={{ color: star <= (hover || rating) ? "#D4A855" : "#D9D9D9" }}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold">Dein Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="z.B. Sandra"
          required
          className="px-4 py-2.5 border-2 border-[#E0D8D5] rounded-2xl text-sm focus:outline-none focus:border-[#924d44] transition-colors"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold">Deine Erfahrung</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Was hat dir an den Materialien gefallen?"
          required
          rows={4}
          className="px-4 py-2.5 border-2 border-[#E0D8D5] rounded-2xl text-sm focus:outline-none focus:border-[#924d44] transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">Etwas ist schiefgelaufen. Bitte nochmal versuchen.</p>
      )}

      <Button type="submit" disabled={status === "loading" || rating === 0}>
        {status === "loading" ? "Wird gesendet…" : "Bewertung abschicken"}
      </Button>
    </form>
  );
}
