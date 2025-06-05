// app/layout.tsx
import type { Metadata } from "next";
import Link from 'next/link'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clothify – Modern Clothing Store",
  description: "Find your perfect style with our trendy clothing collection",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white text-gray-900`}>
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <Link href="/">
              <h1 className="text-3xl font-extrabold tracking-tight text-blue-600 cursor-pointer">
                Clothify
              </h1>
            </Link>
            <ul className="flex gap-6 font-medium text-gray-700 text-sm">
              <li className="hover:text-blue-500 transition cursor-pointer"><Link href="/">Home</Link></li>
              <li className="hover:text-blue-500 transition cursor-pointer">Shop</li>
              <li className="hover:text-blue-500 transition cursor-pointer">Contact</li>
              <li>
                <Link href="/product/new" passHref>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Create New
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">{children}</main>

        <footer className="text-center py-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} Clothify. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
