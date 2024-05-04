"use client";

import { VariantProps, tv } from "tailwind-variants";

export const button = tv({
  base: "font-bold text-text-btn active:opacity-80 transition-colors flex justify-center items-center gap-2",
  variants: {
    color: {
      primary: "bg-primary hover:bg-primary-hover",
      secondary: "bg-secondary hover:bg-secondary-hover text-text-sub",
      tertiary: "bg-tertiary hover:bg-tertiary-hover",
      white: "bg-background-base hover:bg-background-sub text-primary",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "px-4 py-3 text-lg",
    },
    variant: {
      rounded: "rounded-full",
      default: "rounded",
      square: "rounded-none",
    },
    full: {
      true: "w-full",
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
    variant: "default",
  },
});

export type ButtonVariants = VariantProps<typeof button>;
