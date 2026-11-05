"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "./auth-client";

export function useRequireAuth(path: string) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "auth-required" });
      router.replace(`/signin?redirect=${path}`);
    }
  }, [isPending, session, router, path]);

  return { session, ready: !isPending && !!session };
}