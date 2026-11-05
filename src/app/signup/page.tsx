"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Field from "@/components/Field";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");

    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <h1 className="text-center text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field label="নাম" name="name" type="text" placeholder="যেমন: রহিম উদ্দিন" />
        <Field label="ইমেইল" name="email" type="email" placeholder="you@example.com" />
        <Field label="পাসওয়ার্ড" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" />
        <Field label="পাসওয়ার্ড নিশ্চিত করুন" name="confirm" type="password" placeholder="আবার লিখুন" />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 py-2.5 font-medium text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <p className="my-4 text-center text-sm text-gray-500">অথবা</p>
      <SocialButtons />

      <p className="mt-6 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-medium text-green-700 hover:underline">
          সাইন ইন করুন
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