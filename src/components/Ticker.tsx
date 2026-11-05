"use client";

import { useBazar } from "@/lib/useBazar";
import { toBn, unitShort } from "@/lib/utils";
import Badge from "./Badge";

export default function Ticker() {
  const { products } = useBazar();

  if (!products.length) {
    return <div className="h-10 border-y border-gray-200 bg-white/70" />;
  }

  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-y border-gray-200 bg-white/70 py-2">
      <div className="flex w-max animate-marquee whitespace-nowrap text-sm">
        {items.map((p, i) => (
          <span key={`${p.id}-${i}`} className="flex items-center gap-1.5 pr-8">
            <span>{p.image}</span>
            <span>{p.nameBn}</span>
            <span>
              {toBn(p.today)} টাকা/{unitShort(p.unit)}
            </span>
            <Badge dir={p.change.dir} pct={p.change.pct} />
          </span>
        ))}
      </div>
    </div>
  );
}