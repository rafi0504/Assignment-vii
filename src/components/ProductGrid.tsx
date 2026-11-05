import type { Product } from "@/lib/utils";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  loading,
  error,
}: {
  products: Product[];
  loading?: boolean;
  error?: boolean;
}) {
  if (error) {
    return <p className="rounded-xl bg-red-50 p-4 text-red-700">ডেটা লোড করা যায়নি। আবার চেষ্টা করুন।</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl bg-gray-200" />
          ))
        : products.map((p) => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}