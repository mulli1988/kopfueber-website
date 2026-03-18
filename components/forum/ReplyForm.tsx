"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ReplyForm({ threadId }: { threadId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <Card className="text-center py-6 bg-muted">
        <p className="text-muted-foreground mb-3">Zum Antworten musst du eingeloggt sein.</p>
        <a href="/login" className="text-primary font-semibold hover:underline">
          Einloggen →
        </a>
      </Card>
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
    <Card>
      <h3 className="font-display text-lg font-bold mb-4">Antworten</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Deine Antwort…"
          rows={4}
          className="w-full px-4 py-3 bg-surface border-2 border-dark rounded-[var(--radius-md)] text-sm resize-none focus:outline-none focus:border-primary transition-colors"
          required
        />
        <Button type="submit" disabled={loading || !content.trim()} className="self-start">
          {loading ? "Wird gesendet…" : "Antworten"}
        </Button>
      </form>
    </Card>
  );
}
