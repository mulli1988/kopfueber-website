"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function ReplyForm({ threadId }: { threadId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <div className="bg-[#FFF5F2] rounded-2xl border-2 border-[#F0DDD8] p-8 text-center">
        <p className="text-[#555555] mb-3">
          Zum Antworten musst du eingeloggt sein.
        </p>
        <Link
          href="/login"
          className="text-[#81ABAD] font-semibold hover:underline"
        >
          Jetzt einloggen →
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);

    const res = await fetch("/api/forum/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId, content }),
    });

    if (res.ok) {
      setContent("");
      router.refresh();
    } else {
      alert("Fehler beim Senden.");
    }
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-[#F0DDD8] p-6">
      <h3 className="font-display text-lg font-bold text-[#222222] mb-4">
        Antworten
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Deine Antwort…"
          rows={4}
          className="w-full px-4 py-3 bg-white border-2 border-[#F0DDD8] rounded-xl text-sm resize-none focus:outline-none focus:border-[#81ABAD] transition-colors"
          required
        />
        <Button type="submit" disabled={loading || !content.trim()} className="self-start">
          {loading ? "Wird gesendet…" : "Antworten"}
        </Button>
      </form>
    </div>
  );
}
