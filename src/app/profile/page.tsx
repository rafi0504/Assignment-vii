"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRequireAuth } from "@/lib/useRequireAuth";
import Avatar from "@/components/Avatar";
import PageSkeleton from "@/components/PageSkeleton";

export default function ProfilePage() {
  const router = useRouter();
  const { session, ready } = useRequireAuth("/profile");

  if (!ready || !session) return <PageSkeleton />;

  const user = session.user;

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="text-sm text-gray-600">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} image={user.image} size={64} />
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="break-all text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-lg border border-red-400 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
        >
          সাইন আউট
        </button>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-semibold">তথ্য</h2>
        <p className="text-sm text-gray-500">নাম</p>
        <p className="mb-5 font-medium">{user.name}</p>
        <Link
          href="/profile/update"
          className="block w-full rounded-lg bg-green-700 py-2.5 text-center font-medium text-white hover:bg-green-800"
        >
          আপডেট
        </Link>
      </div>
    </div>
  );
}