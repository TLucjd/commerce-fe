'use client';

import { useEffect, useState } from "react";
import { getProduct, updateProduct } from "@/services/productService";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

export default function EditProduct() {
  const [product, setProduct] = useState<any>(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    getProduct(id as string).then(setProduct);
  }, [id]);

  const onSubmit = async (data: any) => {
    await updateProduct(id as string, data);
    router.push("/");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <ProductForm onSubmit={onSubmit} initialData={product} />
    </div>
  );
}
