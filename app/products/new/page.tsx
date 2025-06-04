'use client';

import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/services/productService";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    await createProduct(data);
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
      <ProductForm onSubmit={onSubmit} />
    </div>
  );
}
