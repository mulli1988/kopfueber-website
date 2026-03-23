"use client";

import { useState } from "react";

interface Product {
  _id: string;
  title: string;
  price: number;
}

export default function TestPurchaseForm({ products }: { products: Product[] }) {
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/admin/test-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: email, productId }),
    });

    const data = await res.json();

    if (res.ok) {
      setResult({ ok: true, message: `Kauf eingetragen: "${data.productTitle}" für ${data.userName}` });
      setEmail("");
      setProductId("");
    } else {
      setResult({ ok: false, message: data.error ?? "Fehler." });
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-[#222]">Nutzer-E-Mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="z.B. julia@kopfueber.de"
          required
          className="px-4 py-3 rounded-xl border-2 border-[#F0DDD8] text-sm focus:outline-none focus:border-[#81ABAD] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-[#222]">Produkt</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
          className="px-4 py-3 rounded-xl border-2 border-[#F0DDD8] text-sm focus:outline-none focus:border-[#81ABAD] transition-colors bg-white"
        >
          <option value="">— Produkt auswählen —</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title} ({(p.price / 100).toFixed(2).replace(".", ",")} €)
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-[#81ABAD] text-white font-bold text-sm px-5 py-3 rounded-2xl hover:bg-[#5D8F91] transition-colors disabled:opacity-50 self-start"
      >
        {loading ? "Wird eingetragen…" : "Kauf eintragen"}
      </button>

      {result && (
        <div className={`rounded-xl px-4 py-3 text-sm font-semibold ${
          result.ok
            ? "bg-[#EBF5EB] text-[#4A7A4A]"
            : "bg-[#FFF0F0] text-red-600"
        }`}>
          {result.message}
          {result.ok && (
            <a href="/account" target="_blank" className="ml-2 underline">
              Konto ansehen →
            </a>
          )}
        </div>
      )}
    </form>
  );
}
