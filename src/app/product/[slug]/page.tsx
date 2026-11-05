"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useBazar } from "@/lib/useBazar";
import { fmt, toBn, unitBn, unitShort } from "@/lib/utils";
import Badge from "@/components/Badge";
import NotFoundBlock from "@/components/NotFoundBlock";
import PageSkeleton from "@/components/PageSkeleton";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { ready } = useRequireAuth(`/product/${slug}`);
  const { products, loading } = useBazar();

  if (!ready || loading) return <PageSkeleton />;

  const p = products.find((x) => x.slug === slug);
  if (!p) return <NotFoundBlock title="পণ্যটি পাওয়া যায়নি" />;

  const rows = p.markets.map((m) => ({ ...m, avg: (m.min + m.max) / 2 }));
  const min = Math.min(...rows.map((r) => r.min));
  const max = Math.max(...rows.map((r) => r.max));
  const avg = rows.reduce((s, r) => s + r.avg, 0) / (rows.length || 1);
  const diff = Math.abs(p.today - p.yesterday);
  const dirText =
    p.change.dir === "up" ? "বেড়েছে" : p.change.dir === "down" ? "কমেছে" : "অপরিবর্তিত আছে";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <nav className="mb-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          হোম
        </Link>{" "}
        ›{" "}
        <Link href={`/category/${p.category}`} className="hover:underline">
          {p.categoryNameBn}
        </Link>{" "}
        › <span className="text-gray-900">{p.nameBn}</span>
      </nav>

      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="text-6xl">{p.image}</span>
          <div>
            <h1 className="text-2xl font-bold">{p.nameBn}</h1>
            <p className="text-sm text-gray-500">
              {unitBn(p.unit)} ·{" "}
              <span className="rounded-full bg-gray-100 px-2 py-0.5">{p.categoryNameBn}</span>
            </p>
            <p className="mt-1 text-sm text-gray-600">
              গতকালের তুলনায় আজ দাম {dirText} · {toBn(diff)} টাকা
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-4 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold">{toBn(p.today)}</p>
          <p className="text-xs text-gray-500">টাকা / {unitShort(p.unit)}</p>
          <Badge dir={p.change.dir} pct={p.change.pct} />
        </div>
      </div>

      <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-green-700">{fmt(min)} টাকা</p>
            <p className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
            <p className="text-2xl font-bold text-red-600">{fmt(max)} টাকা</p>
            <p className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-2xl font-bold">{fmt(avg)} টাকা</p>
            <p className="text-xs text-gray-500">{unitBn(p.unit)}-এর হিসাব</p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="border border-gray-300 px-3 py-2">বাজার</th>
                <th className="border border-gray-300 px-3 py-2">বিভাগ</th>
                <th className="border border-gray-300 px-3 py-2 text-right">সর্বনিম্ন</th>
                <th className="border border-gray-300 px-3 py-2 text-right">সর্বাধিক</th>
                <th className="border border-gray-300 px-3 py-2 text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.market}-${i}`}>
                  <td className="border border-gray-300 px-3 py-2">{r.market}</td>
                  <td className="border border-gray-300 px-3 py-2">{r.division}</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{fmt(r.min)} টাকা</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{fmt(r.max)} টাকা</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">{fmt(r.avg)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}