"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Notes() {
  const { data } = useSession();
  const router = useRouter();
  if (data) router.push("/");
  return (
    <div>
      {JSON.stringify(data, null, 2)}
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
        ログイン
      </button>
    </div>
  );
}
