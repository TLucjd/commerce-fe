'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-store'
import Cookies from 'js-cookie'
import { logout } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Plus, LogOut, Package } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { useCart } from '../app/store/cart'

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth()
  const { items } = useCart() // ✅ Lấy items trong cart
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0) 

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('access_token')
    setIsLoggedIn(!!token)
  }, [setIsLoggedIn])

  const handleLogout = async () => {
    await logout()
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    setIsLoggedIn(false)
    router.push('/auth/login')
  }

  const NavLink = ({
    href,
    label,
    icon,
    visible = true,
  }: {
    href: string
    label: string
    icon?: React.ReactNode
    visible?: boolean
  }) => {
    if (!visible) return null
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={cn(
          'relative px-3 py-2 text-sm font-medium transition-colors duration-300',
          isActive
            ? 'text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-600'
            : 'text-gray-600 hover:text-blue-600 hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:w-full hover:after:bg-blue-300'
        )}
      >
        <div className="flex items-center gap-1">
          {icon}
          {label}
        </div>
      </Link>
    )
  }

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight hover:opacity-90">
          Clothify
        </Link>

        {/* Middle nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/" label="Home" />
          <NavLink href="/shop" label="Shop" />

          {/* ✅ Custom Cart Link với badge */}
          <Link
            href="/cart"
            className={cn(
              'relative px-3 py-2 text-sm font-medium transition-colors duration-300 flex items-center gap-1',
              pathname === '/cart'
                ? 'text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-600'
                : 'text-gray-600 hover:text-blue-600 hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:w-full hover:after:bg-blue-300'
            )}
          >
            <ShoppingCart size={16} />
            Cart
            {cartCount > 0 && (
              <span className="absolute top-1 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center -mt-2 -mr-2">
                {cartCount}
              </span>
            )}
          </Link>

          <NavLink
            href="/orders"
            label="Orders"
            icon={<Package size={16} />}
            visible={isLoggedIn}
          />
          <NavLink
            href="/admin/new"
            label="Create"
            icon={<Plus size={16} />}
            visible={isLoggedIn}
          />
        </div>

        {/* Right auth actions */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/auth/login')}
                className="text-sm px-4 py-2"
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => router.push('/auth/register')}
                className="text-sm px-4 py-2 rounded-full"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
