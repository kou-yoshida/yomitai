"use client";

import { FC } from "react";
import _Link from "next/link";
import { LinkVariants, link } from "./css";
import { usePathname } from "next/navigation";

type Props = JSX.IntrinsicElements["link"] & {
  children: React.ReactNode;
  label?: string;
  path: string;
} & LinkVariants;

export const Link: FC<Props> = ({ children, label, path, full, className }) => {
  const pathName = usePathname();
  return (
    <_Link
      className={link({
        full,
        background: pathName === path ? "active" : "primary",
        className,
      })}
      href={path}
    >
      {children || label}
    </_Link>
  );
};
