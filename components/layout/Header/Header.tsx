"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";

/* ---------------- MENU DATA (CLEAN & REUSABLE) ---------------- */

const NAV_LINKS = [
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Consultancy", href: "/consultancy" },
  { name: "Horoscope", href: "/horoscope" },
  { name: "Free Remedy Calculator", href: "/calculator" },
  { name: "Courses", href: "/courses" },
  { name: "Membership Plans", href: "/membership" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full shadow-md">
      {/* ================= TOP BAR ================= */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={160}
              height={80}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-[420px] mx-6">
            <div className="flex w-full border border-gray-200 rounded-md overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Search product"
                className="flex-1 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button className="w-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition">
                <Search size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 text-gray-700">
            {/* Login */}
            <Link
              href="/login"
              className="hidden md:flex items-center gap-1 hover:text-[#A35013] transition"
            >
              <User size={20} />
              Login
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden md:flex items-center gap-1 border border-[#A35013] text-[#A35013] px-3 py-1 rounded hover:bg-[#A35013]/10 transition"
            >
              <Heart size={18} />
              Wishlist
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative hover:text-[#A35013] transition"
            >
              <ShoppingBag size={24} />
              <span className="absolute -top-2 -right-2 bg-[#A35013] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                2
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex border border-gray-200 rounded-md overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search product"
              className="flex-1 px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button className="w-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition">
              <Search size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM NAV ================= */}
      <div className="bg-[#A35013]">
        <nav className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Desktop Menu */}
          <ul className="hidden md:flex justify-center gap-8 text-white py-3 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-[#f2c94c] transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu */}
          {menuOpen && (
            <ul className="md:hidden flex flex-col gap-4 py-4 text-sm font-medium text-white">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
