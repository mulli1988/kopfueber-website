"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

export default function NewThreadButton({ categorySlug }: { categorySlug: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!session) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/forum/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categorySlug, title, content }),
    });

    if (res.ok) {
      const data = await res.json();
      setOpen(false);
      setTitle("");
      setContent("");
      router.push(`/forum/${data.categorySlug}/${data.slug}`);
    } else {
      alert("Fehler beim Erstellen.");
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>+ Neuer Thread</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Neuer Thread">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Titel"
            id="thread-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Worum geht es?"
            required
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold">Inhalt</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="Schreib deinen Beitrag…"
              className="w-full px-4 py-3 bg-surface border-2 border-dark rounded-[var(--radius-md)] text-sm resize-none focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Wird erstellt…" : "Thread erstellen"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
