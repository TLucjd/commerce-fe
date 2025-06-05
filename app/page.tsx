// pages/index.tsx (Homepage - List Products)
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const fetchProducts = async () => { 
    const products = await getProducts();
    // convert to json
    return products;
  }

  const products = await fetchProducts();

  return (
    <div>
      <section className="px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}