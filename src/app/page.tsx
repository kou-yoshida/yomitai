import { useSession } from "next-auth/react";
import Image from "next/image";
import { auth } from "@/src/auth";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      ホームページ
    </main>
  );
}
