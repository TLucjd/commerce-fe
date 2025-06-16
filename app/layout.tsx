import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clothify – Modern Clothing Store",
  description: "Find your perfect style with our trendy clothing collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white text-gray-900`}>
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
          <Navbar />
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">{children}</main>

        <footer className="text-center py-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} Clothify. All rights reserved.
        </footer>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}