'use client';

import { useEffect, useState } from "react";
import { getProduct } from "../../services/productService";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    getProduct(id as string).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <img src={product.image || "/placeholder.png"} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-semibold text-blue-700">${product.price}</p>
    </div>
  );
}
