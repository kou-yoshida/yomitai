"use client";

import { FC } from "react";
import { ButtonVariants, button } from "./css";

type Props = JSX.IntrinsicElements["button"] & {
  onClick?: () => void | Promise<void>;
} & ButtonVariants;

export const Button: FC<Props> = ({
  children,
  size,
  color,
  full,
  variant,
  onClick,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={() => onClick?.()}
      {...rest}
      className={button({ size, color, full, variant, className })}
    >
      {children}
    </button>
  );
};
