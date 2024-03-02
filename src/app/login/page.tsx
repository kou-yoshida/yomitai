"use client";

import { useSession, signIn } from "next-auth/react";

export default function Notes() {
  const { data } = useSession();
  return (
    <div>
      {JSON.stringify(data, null, 2)}
      <button onClick={() => signIn()}>ログイン</button>
    </div>
  );
}
