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
  const { data: session } = useSession();

  const Login = () => {
    const searchParams = useSearchParams();
    return (
      <Button
        color="white"
        full
        variant="square"
        onClick={() => {
          signIn("google", {
            callbackUrl: searchParams.get("callbackUrl") || "/",
          });
        }}
        className={clsx("absolute bottom-0 left-0 py-6")}
      >
        ログイン
      </Button>
    );
  };

  const Logout = () => {
    const router = useRouter();
    return (
      <Button
        color="white"
        full
        variant="square"
        onClick={() => {
          signOut();
          router.push("/");
        }}
        className={clsx("absolute bottom-0 left-0 py-6")}
      >
        ログアウト
      </Button>
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
          isOpen ? "opacity-80 full bg-background-opacity blur-sm blur" : ""
        )}
      ></div>

      <div
        className={clsx(
          "absolute top-0 w-[300px] h-full bg-primary z-40 transition-all font-bold pt-10 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
        )}
        ref={ref}
      >
        <Link path="/list" className={"py-4"} full>
          yomitaiリスト
        </Link>
        <Link path="/timeline" className={"py-4"} full>
          タイムライン
        </Link>
        <Link path="/profile" className={"py-4"} full>
          プロフィール
        </Link>

        {session ? <Logout /> : <Login />}
      </div>

      {!isOpen ? (
        <div className={clsx("menu-button")} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
