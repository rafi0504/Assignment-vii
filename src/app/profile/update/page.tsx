"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRequireAuth } from "@/lib/useRequireAuth";
import Field from "@/components/Field";
import PageSkeleton from "@/components/PageSkeleton";

function UpdateForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <Field
          label="নাম"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 py-2.5 font-medium text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
        </button>
      </form>
    </div>
  );
}

export default function UpdateProfilePage() {
  const { session, ready } = useRequireAuth("/profile/update");
  if (!ready || !session) return <PageSkeleton />;
  return <UpdateForm currentName={session.user.name} />;
}