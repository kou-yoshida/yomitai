"use client";

import { VariantProps, tv } from "tailwind-variants";

export const button = tv({
  base: "font-medium bg-blue-500 text-white  active:opacity-80 ",
  variants: {
    color: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-purple-500 text-white",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "px-4 py-3 text-lg",
    },
    variant: {
      rounded: "rounded-full",
      square: "rounded",
    },
  },
  compoundVariants: [
    {
      size: ["sm", "md"],
      class: "px-4 py-2",
    },
  ],
  defaultVariants: {
    size: "md",
    color: "primary",
    variant: "square",
  },
});

export type ButtonVariants = VariantProps<typeof button>;
