'use client'

import { useCart } from '../store/cart'
import { useRouter } from 'next/navigation'
import { placeOrder } from '@/lib/order'
import { toast } from 'sonner'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const totalPrice = useMemo(() => {
    return items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  }, [items])

  const handleCheckout = async () => {
    if (items.length === 0) return toast.error('Your cart is empty.')

    try {
      setLoading(true)
      await placeOrder({
        products: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      })
      clearCart()
      toast.success('Order placed successfully!')
      router.push('/orders')
    } catch (err) {
      toast.error('Failed to place order.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image || '/placeholder.jpg'}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <p className="text-lg font-semibold">
              Total: <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </p>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full md:w-auto"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </>
      )}
    </div>
  )
}
