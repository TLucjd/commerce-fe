'use client'

import { useCart } from '../store/cart'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()
  const router = useRouter()

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between p-4 border rounded shadow-sm"
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
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.productId, parseInt(e.target.value))
                      }
                      className="w-16 mt-1 border rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium">${item.price * item.quantity}</p>
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
            <Button className="mt-4" onClick={() => router.push('/checkout')}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
