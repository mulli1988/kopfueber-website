"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";
import { TOP_CATEGORIES, KITA_SUBCATEGORIES, FAMILIE_SUBCATEGORIES } from "@/lib/utils/categories";

interface ProductData {
  _id?: string;
  title?: string;
  slug?: string;
  description?: string;
  price?: number;
  category?: string;
  subcategory?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  includedInSubscription?: boolean;
  images?: string[];
  downloadFile?: string;
}

export default function ProductFormButton({ product }: { product?: ProductData }) {
  const router = useRouter();
  const isEdit = !!product?._id;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title:                   product?.title ?? "",
    description:             product?.description ?? "",
    price:                   product?.price ? (product.price / 100).toString() : "",
    category:                product?.category ?? "",
    subcategory:             product?.subcategory ?? "",
    tags:                    product?.tags?.join(", ") ?? "",
    featured:                product?.featured ?? false,
    published:               product?.published ?? false,
    includedInSubscription:  product?.includedInSubscription ?? false,
    images:                  product?.images ?? [] as string[],
    downloadFile:            product?.downloadFile ?? "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...(isEdit ? { _id: product!._id } : {}),
      title:                  form.title,
      description:            form.description,
      price:                  Math.round(parseFloat(form.price) * 100),
      category:               form.category,
      subcategory:            form.subcategory || undefined,
      tags:                   form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      featured:               form.featured,
      published:              form.published,
      includedInSubscription: form.includedInSubscription,
      images:                 form.images,
      downloadFile:           form.downloadFile || undefined,
    };

    const res = await fetch("/api/admin/products", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setOpen(false);
      router.refresh();
    } else {
      alert("Fehler beim Speichern.");
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        variant={isEdit ? "outline" : "primary"}
        size="sm"
        onClick={() => setOpen(true)}
      >
        {isEdit ? "Bearbeiten" : "+ Neues Produkt"}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={isEdit ? "Produkt bearbeiten" : "Neues Produkt"}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
          <Input label="Titel" id="p-title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} required />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold">Beschreibung</label>
            <textarea rows={3} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-dark rounded-[var(--radius-md)] text-sm resize-none focus:outline-none focus:border-primary"
              required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Preis (€)" id="p-price" type="number" step="0.01" min="0"
              value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold">Bereich</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: "" })}
                className="w-full px-4 py-2.5 border-2 border-dark rounded-[var(--radius-md)] text-sm focus:outline-none focus:border-primary bg-white"
                required
              >
                <option value="">— wählen —</option>
                {TOP_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {(form.category === "Für Kindergärten" || form.category === "Für Familien") && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold">Unterkategorie</label>
              <select
                value={form.subcategory}
                onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-dark rounded-[var(--radius-md)] text-sm focus:outline-none focus:border-primary bg-white"
              >
                <option value="">— keine —</option>
                {(form.category === "Für Kindergärten" ? KITA_SUBCATEGORIES : FAMILIE_SUBCATEGORIES).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          <Input label="Tags (kommagetrennt)" id="p-tags" value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="print, poster, bunt" />

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-4">
            {[
              { key: "published",              label: "Veröffentlicht" },
              { key: "featured",               label: "Featured (Startseite)" },
              { key: "includedInSubscription", label: "Im Abo enthalten" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                <input type="checkbox" checked={form[key as keyof typeof form] as boolean}
                  onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                  className="w-4 h-4 accent-[var(--color-primary)]" />
                {label}
              </label>
            ))}
          </div>

          {/* Bilder */}
          <div>
            <p className="text-sm font-semibold mb-2">Produktbilder</p>
            {form.images.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-2">
                {form.images.map((url, i) => (
                  <div key={i} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="w-16 h-16 object-cover rounded border-2 border-dark" />
                    <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })}
                      className="absolute -top-1 -right-1 bg-dark text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <UploadButton<OurFileRouter, "productImage">
              endpoint="productImage"
              onClientUploadComplete={(res) => setForm({ ...form, images: [...form.images, ...res.map((f) => f.ufsUrl)] })}
              onUploadError={(e) => alert(`Upload-Fehler: ${e.message}`)}
              appearance={{ button: "bg-primary text-white text-sm font-semibold px-3 py-1.5 rounded border-2 border-dark" }}
            />
          </div>

          {/* Download-Datei */}
          <div>
            <p className="text-sm font-semibold mb-1">Download-Datei (optional)</p>
            {form.downloadFile && (
              <p className="text-xs text-muted-foreground mb-1 truncate">✓ {form.downloadFile}</p>
            )}
            <UploadButton<OurFileRouter, "productDownload">
              endpoint="productDownload"
              onClientUploadComplete={(res) => setForm({ ...form, downloadFile: res[0].ufsUrl })}
              onUploadError={(e) => alert(`Upload-Fehler: ${e.message}`)}
              appearance={{ button: "bg-secondary text-dark text-sm font-semibold px-3 py-1.5 rounded border-2 border-dark" }}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Speichern…" : "Speichern"}
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
