"use client";
import { Menu as _Menu } from "@headlessui/react";
import { Link } from "@/src/components/link/Link";
import { Button } from "./button/Button";
import { useState } from "react";
import clsx from "clsx";

export const MenuSp = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={clsx(
          "absolute top-0 w-[300px] h-full bg-black z-40 transition-all",
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
        )}
      >
        <Link path="/">asdf</Link>
      </div>

      <div
        className={clsx(isOpen ? "sp-menu-button--active" : "sp-menu-button")}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
      </div>
    </>
  );
};
