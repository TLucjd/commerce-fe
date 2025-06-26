// app/product/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { getProduct } from '@/lib/product'
import { Button } from '@/components/ui/button'
import { useCart } from '../../store/cart'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'

type Product = {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  const { addItem } = useCart()

  useEffect(() => {
    if (!id) return
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id as string)
        setProduct(data)
      } catch (err) {
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader className="animate-spin text-blue-500" size={40} />
      </div>
    )
  }

  if (!product) {
    return <p className="text-center text-gray-500">Product not found.</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div>
        <Image
          src={product.image || '/placeholder.jpg'}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-xl object-cover w-full max-h-[500px]"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-blue-600 font-semibold">${product.price}</p>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <Button
          onClick={() => {
            addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: 1,
            })
            toast.success('Added to cart!')
          }}
          className="w-full md:w-auto"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
