import { useSession } from "next-auth/react";
import Image from "next/image";
import { auth } from "@/src/auth";
import { Button } from "@/src/components/button/Button";
import "./globals.css";
import { Link } from "@/src/components/link/Link";
import { Menu } from "../components/Menu";

export default async function Home() {
  const _auth = await auth();
  return (
    <main>
      {JSON.stringify(_auth, null, 2)}

      <div>
        <Button color="secondary">click me</Button>
        <Link path="/login">リンク</Link>
        <Menu />
      </div>
    </main>
  );
}
