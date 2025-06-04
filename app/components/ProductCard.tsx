// components/ProductCard.tsx
import Link from "next/link";
import { Button } from "../components/ui/button";

export default function ProductCard({ product, onDelete }: any) {
  return (
    <div className="rounded-xl border p-4 shadow space-y-3">
      <img src={product.image || "/placeholder.png"} alt={product.name} className="w-full h-48 object-cover rounded" />
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <p className="font-bold text-blue-600">${product.price}</p>
      </div>
      <div className="flex justify-between items-center pt-2">
        <Link href={`/products/${product.id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
        <Link href={`/products/${product.id}`}>
          <Button variant="secondary">View</Button>
        </Link>
        <Button variant="destructive" onClick={() => onDelete(product.id)}>Delete</Button>
      </div>
    </div>
  );
}
