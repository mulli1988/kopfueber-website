"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";

interface PostData {
  _id?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  published?: boolean;
  coverImage?: string;
}

export default function BlogFormButton({ post }: { post?: PostData }) {
  const router = useRouter();
  const isEdit = !!post?._id;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title:      post?.title ?? "",
    excerpt:    post?.excerpt ?? "",
    content:    post?.content ?? "",
    tags:       post?.tags?.join(", ") ?? "",
    published:  post?.published ?? false,
    coverImage: post?.coverImage ?? "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...(isEdit ? { _id: post!._id } : {}),
      title:     form.title,
      excerpt:   form.excerpt,
      content:   form.content,
      tags:      form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      published: form.published,
      coverImage: form.coverImage || undefined,
    };
    const res = await fetch("/api/admin/blog", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) { setOpen(false); router.refresh(); }
    else { alert("Fehler."); setLoading(false); }
  }

  return (
    <>
      <Button variant={isEdit ? "outline" : "primary"} size="sm" onClick={() => setOpen(true)}>
        {isEdit ? "Bearbeiten" : "+ Neuer Beitrag"}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title={isEdit ? "Beitrag bearbeiten" : "Neuer Beitrag"} className="max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
          <Input label="Titel" id="b-title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="Kurzbeschreibung (Excerpt)" id="b-excerpt" value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold">Inhalt (Markdown)</label>
            <textarea rows={8} value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-dark rounded-[var(--radius-md)] text-sm font-mono resize-none focus:outline-none focus:border-primary"
              placeholder="# Überschrift&#10;&#10;Text hier…" required />
          </div>
          <Input label="Tags (kommagetrennt)" id="b-tags" value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          <div>
            <p className="text-sm font-semibold mb-2">Coverbild</p>
            {form.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.coverImage} alt="" className="w-full h-32 object-cover rounded border-2 border-dark mb-2" />
            )}
            <UploadButton<OurFileRouter, "blogCover">
              endpoint="blogCover"
              onClientUploadComplete={(res) => setForm({ ...form, coverImage: res[0].ufsUrl })}
              onUploadError={(e) => alert(`Upload-Fehler: ${e.message}`)}
              appearance={{ button: "bg-secondary text-dark text-sm font-semibold px-3 py-1.5 rounded border-2 border-dark" }}
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
            <input type="checkbox" checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="w-4 h-4 accent-[var(--color-primary)]" />
            Sofort veröffentlichen
          </label>
          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>{loading ? "Speichern…" : "Speichern"}</Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
