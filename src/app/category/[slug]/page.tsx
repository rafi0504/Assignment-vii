"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useBazar } from "@/lib/useBazar";
import { toBn } from "@/lib/utils";
import ProductGrid from "@/components/ProductGrid";
import NotFoundBlock from "@/components/NotFoundBlock";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, categories, loading, error } = useBazar();
  const [sort, setSort] = useState("default");

  const category = categories.find((c) => c.slug === slug);

  const list = useMemo(() => {
    const items = products.filter((p) => p.category === slug);
    if (sort === "asc") return [...items].sort((a, b) => Number(a.today) - Number(b.today));
    if (sort === "desc") return [...items].sort((a, b) => Number(b.today) - Number(a.today));
    return items;
  }, [products, slug, sort]);

  if (!loading && !error && (!category || list.length === 0)) {
    return (
      <NotFoundBlock
        title="কোনো পণ্য পাওয়া যায়নি"
        text="এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
        {category ? (
          <>
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{category.nameBn}</h1>
              <p className="text-sm text-gray-600">
                {toBn(list.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </>
        ) : (
          <div className="h-16 w-64 animate-pulse rounded-lg bg-gray-200" />
        )}
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm text-gray-600">
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm outline-none focus:border-green-700"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </div>

      {!loading && (
        <p className="mb-4 text-sm text-gray-600">মোট {toBn(list.length)} টি পণ্য দেখানো হচ্ছে</p>
      )}

      <ProductGrid products={list} loading={loading} error={error} />
    </div>
  );
}