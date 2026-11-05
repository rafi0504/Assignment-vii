"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  async function login(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({ provider, callbackURL: "/" });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  }

  const cls =
    "flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium hover:bg-gray-50";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button type="button" onClick={() => login("google")} className={cls}>
        <span className="font-bold text-blue-600">G</span> Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" onClick={() => login("github")} className={cls}>
        <span className="font-bold">⌥</span> GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}