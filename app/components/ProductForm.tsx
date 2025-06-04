// components/ProductForm.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export default function ProductForm({ onSubmit, initialData = {} }: any) {
  const { register, handleSubmit } = useForm({ defaultValues: initialData });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input {...register("name")} placeholder="Product name" />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea {...register("description")} placeholder="Short description" />
      </div>
      <div>
        <Label>Price</Label>
        <Input type="number" {...register("price")} placeholder="Price in USD" />
      </div>
      <div>
        <Label>Image URL</Label>
        <Input {...register("image")} placeholder="https://..." />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
