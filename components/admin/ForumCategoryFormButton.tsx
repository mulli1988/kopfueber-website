"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

export default function ForumCategoryFormButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    if (res.ok) {
      setOpen(false);
      setName("");
      setDescription("");
      router.refresh();
    } else {
      alert("Fehler.");
      setLoading(false);
    }
  }

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>+ Neue Kategorie</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Neue Forum-Kategorie">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Name" id="cat-name" value={name}
            onChange={(e) => setName(e.target.value)} required />
          <Input label="Beschreibung" id="cat-desc" value={description}
            onChange={(e) => setDescription(e.target.value)} required />
          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>{loading ? "Erstellen…" : "Erstellen"}</Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
