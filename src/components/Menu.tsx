"use client";
import { Menu as _Menu } from "@headlessui/react";
import { Link } from "@/src/components/link/Link";
import { Button } from "./button/Button";
import { useRef, useState } from "react";
import clsx from "clsx";
import { useOnClickOutside } from "../hooks/useClickOutside";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export const Menu = () => {
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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    if (isOpen) setIsOpen(false);
  });
  return (
    <>
      <div
        className={clsx(
          "absolute top-0 w-[300px] h-full bg-black z-40 transition-all",
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
        )}
        ref={ref}
      >
        <Link path="/list">yomitaiリスト</Link>
        <Link path="/timeline">タイムライン</Link>
        <Link path="/profile">プロフィール</Link>
        <Search />
        <Button onClick={() => signOut()}>ログアウト</Button>
      </div>
      {!isOpen ? (
        <div
          className={clsx("sp-menu-button")}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
