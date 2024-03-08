import { VariantProps, tv } from "tailwind-variants";

export const link = tv({
  base: "inline-block text-center py-2 px-4 text-white hover:opacity-80",
  variants: {
    base: "text-red-500",
    color: {
      primary: "text-gray-800",
    },
    background: {
      primary: "bg-gray-100 hover:bg-gray-200",
      active: "bg-red-300",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
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
