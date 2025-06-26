'use client'

import { useEffect, useState } from 'react'
import { getProducts } from '@/lib/product'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Product = {
  id: string
  name: string
  image: string
  price: number
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts()
        setProducts(res as Product[])
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setProducts([])
      }
    }

    fetchProducts()
  }, [])

  if (!products) {
    return <p className="p-6 text-center text-gray-500">Loading products...</p>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Explore Our Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group transition-all duration-300 hover:shadow-xl rounded-xl overflow-hidden border"
            >
              <Link href={`/product/${product.id}`}>
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-1 truncate">{product.name}</h2>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <Button asChild className="w-full">
                  <Link href={`/product/${product.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
