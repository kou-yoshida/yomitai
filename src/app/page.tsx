import { useSession } from "next-auth/react";
import Image from "next/image";
import { auth } from "@/src/auth";
import { Button } from "@/src/components/button/Button";
import "./globals.css";
import { Link } from "@/src/components/link/Link";

export default async function Home() {
  return (
    <main>
      {/* {JSON.stringify(_auth, null, 2)} */}

      <div>
        <Button color="primary">click me</Button>
        <Button color="secondary">click me</Button>
        <Button color="tertiary" full>
          click me
        </Button>
        <Link path="/login">リンク</Link>
      </div>
    </main>
  );
}
