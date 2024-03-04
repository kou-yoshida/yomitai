"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "@/src/components/Link";

export default function Header() {
  return (
    <div>
      <Link path="/" label="ホーム" />
      <Link path="/example" label="example" />
      <Link path="login" label="login" />
      <button onClick={() => signOut()}>ログアウト</button>
    </div>
  );
}
