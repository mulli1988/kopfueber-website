"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    // Nach Registrierung direkt einloggen
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    router.push("/account");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl font-black mb-2">Konto erstellen</h1>
          <p className="text-muted-foreground">Kostenlos registrieren und loslegen.</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Name"
              id="name"
              type="text"
              placeholder="Dein Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="E-Mail"
              id="email"
              type="email"
              placeholder="deine@email.de"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Passwort"
              id="password"
              type="password"
              placeholder="Mindestens 8 Zeichen"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" disabled={loading} className="w-full mt-2">
              {loading ? "Wird erstellt…" : "Konto erstellen"}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Mit der Registrierung akzeptierst du unsere{" "}
              <Link href="/agb" className="underline">AGB</Link> und bestätigst, die{" "}
              <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link> gelesen zu haben.
            </p>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Schon ein Konto?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Einloggen
          </Link>
        </p>
      </div>
    </div>
  );
}
