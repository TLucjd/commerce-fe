'use client'

import { useEffect, useState } from 'react'
import { getMyOrders } from '@/lib/order'
import { useAuth } from '@/lib/auth-store'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'

type Order = {
  id: string
  totalPrice: number
  status: 'pending' | 'paid'
  createdAt: string
  items: {
    id: string
    quantity: number
    price: number
    product: {
      id: string
      name: string
      image: string
    }
  }[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null)
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) return

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders()
        setOrders(data as Order[])
      } catch (err) {
        console.error('Failed to fetch orders:', err)
        toast.error('Failed to load orders')
        setOrders([])
      }
    }

    fetchOrders()
  }, [isLoggedIn])

  if (!isLoggedIn) return <p className="p-6 text-center text-gray-500">Please login to view your orders.</p>
  if (!orders) return <p className="p-6 text-center text-gray-500">Loading your orders...</p>

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border bg-white dark:bg-zinc-900 shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Placed on {format(new Date(order.createdAt), 'PPP')}
                  </p>
                </div>
                <Badge
                  className={
                    order.status === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }
                >
                  {order.status === 'paid' ? 'Paid' : 'Pending'}
                </Badge>
              </div>

              <ul className="divide-y divide-gray-200 dark:divide-zinc-800">
                {order.items.map((item) => (
                  <li key={item.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="text-right mt-4 text-lg font-semibold">
                Total: ${order.totalPrice.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
