import Link from "next/link";
import type { Product } from "@/lib/utils";
import { toBn, unitBn } from "@/lib/utils";
import Badge from "./Badge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{p.image}</span>
        <div>
          <h3 className="font-semibold">{p.nameBn}</h3>
          <p className="text-sm text-gray-500">{unitBn(p.unit)}</p>
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold">
            {toBn(p.today)} <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <Badge dir={p.change.dir} pct={p.change.pct} />
      </div>
    </Link>
  );
}