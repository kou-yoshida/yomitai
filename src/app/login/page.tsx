"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Notes() {
  const { data } = useSession();
  const router = useRouter();

  const Search = () => {
    const searchParams = useSearchParams();
    return (
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: searchParams.get("callbackUrl") || "/",
          })
        }
      >
        ログイン
      </button>
    );
  };

  // if (data) router.push("/");
  return (
    <div>
      {JSON.stringify(data, null, 2)}
      <Suspense>
        <Search />
      </Suspense>
    </div>
  );
}
