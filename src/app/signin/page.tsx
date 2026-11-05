"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Field from "@/components/Field";
import SocialButtons from "@/components/SocialButtons";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    const r = new URLSearchParams(window.location.search).get("redirect");
    router.push(r && r.startsWith("/") && !r.startsWith("//") ? r : "/");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <h1 className="text-center text-3xl font-bold">সাইন ইন</h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field label="ইমেইল" name="email" type="email" placeholder="you@example.com" />
        <Field label="পাসওয়ার্ড" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 py-2.5 font-medium text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <p className="my-4 text-center text-sm text-gray-500">অথবা</p>
      <SocialButtons />

      <p className="mt-6 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-medium text-green-700 hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
      <p className="mt-4 text-center text-sm">
        <Link href="/" className="text-gray-500 hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}