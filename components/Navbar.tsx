"use client";

import Link from "next/link";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-store";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

useEffect(() => {
  const token = Cookies.get("access_token");
  setIsLoggedIn(!!token);
}, [setIsLoggedIn]);

  const handleLogout = async () => {
    await logout();
    Cookies.remove("access_token");
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-blue-600 cursor-pointer">
            Clothify
          </h1>
        </Link>

        <ul className="flex gap-5 md:gap-8 font-medium text-sm md:text-base items-center">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:text-blue-600 transition-colors">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link
                  href="/product/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold"
                >
                  + Create
                </Link>
              </li>
              <li>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-red-500 font-medium hover:underline transition">
                      Logout
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-lg">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-lg font-bold">
                        Confirm Logout
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-500 text-sm">
                        Are you sure you want to logout? You will need to login again to access your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="rounded px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Yes, Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
