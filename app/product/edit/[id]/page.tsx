"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProduct, updateProduct } from "@/lib/api";
import Image from "next/image";

export default function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params); // ✅ unwrap Promise
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "" });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProduct(id);
        setForm({
          name: data.name || "",
          price: data.price?.toString() || "",
          image: data.image || "",
          description: data.description || "",
        });
        setImagePreview(data.image || "");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_err) {
        router.replace("/not-found");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setImageFile(file); 

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImagePreview(base64); 
    };
    reader.readAsDataURL(file);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("price", form.price);
  formData.append("description", form.description);

  // Nếu bạn có file ảnh mới, append nó
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    await updateProduct(id, formData);
    alert("✅ Product updated successfully!");
    router.push(`/product/${id}`);
  } catch (error) {
    alert("❌ Failed to update product.");
    console.error(error);
  }
};



  if (loading) return <div className="p-10 text-center text-gray-600">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">✏️ Edit Product</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl space-y-8 border border-gray-200"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Price ($)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              min={0}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Change Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="mt-4 h-56 w-full object-cover rounded-xl border shadow"
            />
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
