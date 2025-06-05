// components/ProductCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/type/product";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition duration-200"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <Image
        src={product.image || "/placeholder.jpg"}
        alt={product.name}
        width={400}
        height={250}
        className="w-full h-60 object-cover rounded-t-md"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </Card>
  );
}