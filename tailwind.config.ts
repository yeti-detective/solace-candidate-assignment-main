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
        solace: {
          blue: {
            50: "#f0f4ff",
            100: "#e0e9ff",
            200: "#c7d7fe",
            300: "#a5bbfc",
            400: "#8196f8",
            500: "#4d65ff",
            600: "#3b4fd9",
            700: "#2e3db3",
            800: "#1f2a8c",
            900: "#0f1666",
          },
          purple: "#4d65ff",
        },
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
