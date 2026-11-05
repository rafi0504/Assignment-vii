"use client";

import { useEffect, useState } from "react";
import type { Category, Product } from "./utils";

const BASE = "https://openapi.programming-hero.com/api/bazardor";

type Data = { products: Product[]; categories: Category[] };

let cache: Data | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toArray = (x: any) => (Array.isArray(x) ? x : (x?.data ?? []));

export function useBazar() {
  const [data, setData] = useState<Data | null>(cache);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cache) return;
    Promise.all([
      fetch(`${BASE}/products`).then((r) => r.json()),
      fetch(`${BASE}/categories`).then((r) => r.json()),
    ])
      .then(([p, c]) => {
        cache = { products: toArray(p), categories: toArray(c) };
        setData(cache);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return {
    products: data?.products ?? [],
    categories: data?.categories ?? [],
    loading,
    error,
  };
}