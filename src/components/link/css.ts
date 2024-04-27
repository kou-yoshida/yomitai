import { VariantProps, tv } from "tailwind-variants";

export const link = tv({
  base: "inline-block font-bold text-center py-2 px-4 transition-colors",
  variants: {
    base: "text-red-500",
    color: {
      primary: "text-gray-800",
    },
    background: {
      primary: "bg-primary hover:bg-primary-hover",
      active: "bg-red-300",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    full: {
      true: "w-full",
    },
    variant: {
      rounded: "rounded-full",
      square: "rounded",
    },
    width: {
      full: "w-full",
    },
  },
  defaultVariants: {
    color: "primary",
    background: "primary",
    size: "md",
    variant: "square",
  },
});

export type LinkVariants = VariantProps<typeof link>;
