import type { Config } from "tailwindcss";
import { withTV } from "tailwind-variants/dist/transformer.js";

const config: Config = withTV({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "background-base": "#FFF",
      "background-sub": "#f0f0f0",
      "background-opacity": "#0003",
      "text-base": "#1b1425",
      "text-sub": "#FFF",
      "text-headline": "#1f1235",
      "text-btn": "#1f1235",
      primary: "#ff6e6c",
      secondary: "#67568c",
      tertiary: "#fbdd74",
      "primary-hover": "rgb(225 91 89)",
      "secondary-hover": "#301e4e",
      "tertiary-hover": "rgb(222 193 92)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
});
export default config;
