"use client";

import "../../globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin" },
    { name: "Banners", href: "/admin/banners" },
    { name: "Products", href: "/admin/services" },
    { name: "Collections", href: "/admin/collections" },
  ];

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  function getTitle() {
    if (pathname.startsWith("/admin/services")) return "Service Management";
    if (pathname.startsWith("/admin/collections")) return "Collection Management";
    if (pathname.startsWith("/admin/banners")) return "Banner Management";
    return "Dashboard";
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-xl font-semibold tracking-wide">
            Admin Panel
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage website content
          </p>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-4 py-2 text-sm transition-all
                ${
                  isActive(item.href)
                    ? "bg-white text-slate-900 font-medium"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-6 py-4 border-t border-white/10 text-xs text-gray-400">
          © {new Date().getFullYear()} Admin
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">

        {/* Top bar */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-sm font-medium text-gray-600">
            {getTitle()}
          </h1>

          <button className="text-sm text-red-500 hover:underline">
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
