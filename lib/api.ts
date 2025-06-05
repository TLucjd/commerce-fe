import { Product } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, { cache: 'no-store' });
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

export const updateProduct = async (id: string, formData: FormData) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
};


export async function deleteProduct(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
