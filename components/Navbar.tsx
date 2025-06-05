// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        MyClothing
      </Link>
      <div className="space-x-6">
        <Link
          href="/"
          className={`font-medium ${isActive("/") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
        >
          Home
        </Link>
        <Link
          href="/create"
          className={`font-medium ${isActive("/create") ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
        >
          Add Product
        </Link>
      </div>
    </nav>
  );
}