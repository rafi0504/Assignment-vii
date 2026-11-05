"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useBazar } from "@/lib/useBazar";
import { banglaDate } from "@/lib/utils";
import Avatar from "./Avatar";
import Ticker from "./Ticker";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const { categories } = useBazar();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(banglaDate());
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    await authClient.signOut();
    setOpen(false);
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  }

  const user = session?.user;

  return (
    <header className="bg-[#f7f7f2]">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-xl text-white">
              🛒
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold">বাজার দর</span>
              <span className="block min-h-4 text-xs text-gray-600">{date}</span>
            </span>
          </Link>

          <div className="relative">
            {isPending ? (
              <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-200" />
            ) : user ? (
              <>
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100"
                >
                  <Avatar name={user.name} image={user.image} />
                  <span className="hidden text-sm font-medium sm:block">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="text-xs">▾</span>
                </button>
                {open && (
                  <div className="absolute right-0 top-full z-30 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                    <p className="font-semibold">{user.name}</p>
                    <p className="mb-3 break-all text-xs text-gray-500">{user.email}</p>
                    <Link
                      href="/profile"
                      className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      আমার প্রোফাইল
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      সাইন আউট
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/signin" className="px-3 py-2 text-sm font-medium hover:text-green-700">
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-4 flex gap-2 overflow-x-auto pb-3">
          {categories.length === 0
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-9 w-20 shrink-0 animate-pulse rounded-lg bg-gray-200" />
              ))
            : categories.map((c) => {
                const active = pathname === `/category/${c.slug}`;
                return (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium ${
                      active ? "bg-green-700 text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.nameBn}</span>
                  </Link>
                );
              })}
        </nav>
      </div>
      <Ticker />
    </header>
  );
}