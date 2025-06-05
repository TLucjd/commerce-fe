import { Product } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, { cache: 'no-store' });
  console.log(123123,res.json());
return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
}

export async function createProduct(product: Partial<Product>, imageFile?: File) {
  const formData = new FormData();

  if (product.name) formData.append("name", product.name);
  if (product.description) formData.append("description", product.description);
  if (product.price !== undefined) formData.append("price", product.price.toString());

  if (imageFile) {
    formData.append("image", imageFile);
  }

  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create product");
  }

  return res.json();
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
