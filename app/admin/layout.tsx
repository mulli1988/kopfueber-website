import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import Link from "next/link";

const navItems = [
  { href: "/admin",          label: "Dashboard" },
  { href: "/admin/products", label: "Produkte" },
  { href: "/admin/blog",     label: "Blog" },
  { href: "/admin/orders",   label: "Bestellungen" },
  { href: "/admin/forum",    label: "Forum" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-56 bg-[#F5EDE8] flex-shrink-0 border-r-2 border-[#E8D5CE]">
        <div className="p-4 border-b border-[#E8D5CE]">
          <p className="font-display text-lg font-black text-[#3D3535]">
            Kopf<span className="text-primary">über</span>
          </p>
          <p className="text-xs text-[#9A8070] mt-0.5">Admin</p>
        </div>
        <nav className="p-3 flex flex-row md:flex-col gap-1 overflow-x-auto">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-[#6B5550] hover:text-[#3D3535] hover:bg-[#EDD8D0] transition-all no-underline whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
          <div className="hidden md:block flex-1" />
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold text-[#9A8070] hover:text-[#6B5550] transition-all no-underline"
          >
            ← Zurück zur Website
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
