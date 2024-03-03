"use client";
import { signIn, signOut } from "next-auth/react";

export default function Header() {
  return (
    <div>
      <button onClick={() => signOut()}>ログアウト</button>
    </div>
  );
}
