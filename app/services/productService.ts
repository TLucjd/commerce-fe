import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getProducts = async () => (await axios.get(`${API}/products`)).data;
export const getProduct = async (id: string) => (await axios.get(`${API}/products/${id}`)).data;
interface Product {
  name: string;
  price: number;
  description?: string;
  // Add other product fields as needed
}

export const createProduct = async (data: Product) => (await axios.post(`${API}/products`, data)).data;
export const updateProduct = async (id: string, data: any) => (await axios.put(`${API}/products/${id}`, data)).data;
export const deleteProduct = async (id: string) => (await axios.delete(`${API}/products/${id}`)).data;
