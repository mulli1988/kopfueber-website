import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import Link from "next/link";

const navItems = [
  { href: "/admin",          label: "Dashboard",  icon: "📊" },
  { href: "/admin/products", label: "Produkte",   icon: "🖼" },
  { href: "/admin/blog",     label: "Blog",       icon: "✍️" },
  { href: "/admin/orders",   label: "Bestellungen", icon: "📦" },
  { href: "/admin/forum",    label: "Forum",      icon: "💬" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-56 bg-dark text-white flex-shrink-0 border-r-2 border-dark">
        <div className="p-4 border-b border-white/10">
          <p className="font-display text-lg font-black">
            Kopf<span className="text-primary">über</span>
          </p>
          <p className="text-xs text-white/40 mt-0.5">Admin</p>
        </div>
        <nav className="p-3 flex flex-row md:flex-col gap-1 overflow-x-auto">
          {navItems.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all no-underline whitespace-nowrap"
            >
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
          <div className="hidden md:block flex-1" />
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-white/40 hover:text-white/70 transition-all no-underline"
          >
            <span>←</span>
            <span>Zurück zur Website</span>
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-background p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
