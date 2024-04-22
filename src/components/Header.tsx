"use client";
import { signIn, signOut } from "next-auth/react";
import { Link } from "@/src/components/link/Link";
import { Button } from "./button/Button";

export default function Header() {
  return (
    <div>
      <Link path="/">Home</Link>
      <Link path="/example">Example</Link>
      <Link path="/login">login</Link>

      <Button onClick={() => signOut()}>ログアウト</Button>
    </div>
  );
}
