import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: "#f0fdf4",
            100: "#dcfce7",
            500: "#16a34a",
            600: "#15803d",
            700: "#166534",
            800: "#14532d",
            900: "#052e16",
          },
          orange: {
            50: "#fff7ed",
            100: "#ffedd5",
            400: "#fb923c",
            500: "#f97316",
            600: "#ea580c",
            700: "#c2410c",
          },
        },
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.06)",
        card: "0 2px 12px -1px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
