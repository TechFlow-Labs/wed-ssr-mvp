import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        cormorant: ["Cormorant Garamond", "Georgia", "serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Jost", "system-ui", "sans-serif"],
      },
      colors: {
        ivory: "#FAF8F5",
        champagne: "#F5EDE4",
        cream: "#FDF8F3",
        blush: "#E8DED4",
        rose: {
          50: "#fdf5f4",
          100: "#fce9e7",
          200: "#fad7d3",
          300: "#f5b8b0",
          400: "#e89a8f",
          500: "#C9A9A0",
          600: "#a67f78",
          700: "#8b6660",
          800: "#73554f",
          900: "#5d4641",
        },
        sage: "#9CAF88",
        charcoal: "#3D3D3D",
      },
    },
  },
  plugins: [],
};
export default config;
