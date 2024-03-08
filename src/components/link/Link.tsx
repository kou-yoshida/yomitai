"use client";

import { FC } from "react";
import _Link from "next/link";
import { LinkVariants, link } from "./css";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  label?: string;
  path: string;
} & LinkVariants;

export const Link: FC<Props> = ({
  children,
  label,
  path,

  ...rest
}) => {
  const pathName = usePathname();
  return (
    <_Link
      className={link({
        ...rest,
        background: pathName === path ? "active" : "primary",
      })}
      href={path}
    >
      {children || label}
    </_Link>
  );
};
