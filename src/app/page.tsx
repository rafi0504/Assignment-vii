"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useBazar } from "@/lib/useBazar";
import { banglaDate, toBn } from "@/lib/utils";
import ProductGrid from "@/components/ProductGrid";

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function HomePage() {
  const { products, loading, error } = useBazar();
  const { data: session } = authClient.useSession();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(banglaDate());
  }, []);

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const marketCount = new Set(products.flatMap((p) => p.markets.map((m) => m.market))).size;
  const divisionCount = new Set(products.flatMap((p) => p.markets.map((m) => m.division))).size;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8">
      <section className="mt-6 grid items-center gap-8 rounded-3xl bg-white/60 p-6 md:grid-cols-2 md:p-10">
        <div>
          <span className="inline-block min-h-7 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
            {date}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
            সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#সব-পণ্য"
              className="rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-800"
            >
              সব পণ্য দেখুন
            </a>
            {session && (
              <a
                href="#সব-পণ্য"
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium hover:bg-gray-50"
              >
                ⚖️ বাজার তুলনা
              </a>
            )}
          </div>
        </div>

        {session ? (
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs text-gray-500">পণ্য</p>
              <p className="text-3xl font-bold text-green-700">{toBn(products.length)}</p>
              <p className="text-xs text-gray-500">টি নিত্যদিনের পণ্য</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs text-gray-500">বাজার</p>
              <p className="text-3xl font-bold">{toBn(marketCount)}</p>
              <p className="text-xs text-gray-500">টি বাজার অন্তর্ভুক্ত</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs text-gray-500">বিভাগ</p>
              <p className="text-3xl font-bold">{toBn(divisionCount)}</p>
              <p className="text-xs text-gray-500">টি বিভাগের তথ্য</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <svg viewBox="0 0 240 200" className="w-full max-w-xs" aria-hidden="true">
              <circle cx="85" cy="70" r="38" fill="#dc2626" />
              <circle cx="150" cy="62" r="40" fill="#22c55e" />
              <circle cx="55" cy="95" r="22" fill="#7e22ce" />
              <circle cx="105" cy="100" r="22" fill="#f97316" />
              <circle cx="175" cy="100" r="24" fill="#f59e0b" />
              <path d="M30 105h180l-22 80H52z" fill="#92400e" />
              <path d="M80 105v80M120 105v80M160 105v80" stroke="#78350f" strokeWidth="4" />
            </svg>
          </div>
        )}
      </section>

      <Section title={<span><span className="text-red-600">▲</span> আজ দাম বেড়েছে</span>}>
        <ProductGrid products={risers} loading={loading} error={error} />
      </Section>

      <Section title={<span><span className="text-green-700">▼</span> আজ দাম কমেছে</span>}>
        <ProductGrid products={fallers} loading={loading} error={error} />
      </Section>

      <Section id="সব-পণ্য" title="সব পণ্য" subtitle="সব নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও পরিবর্তন">
        <ProductGrid products={products} loading={loading} error={error} />
      </Section>
    </div>
  );
}