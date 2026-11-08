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
        primary: {
          DEFAULT: "#C8102E",
          hover: "#8F0B23",
          light: "#E32644",
          dark: "#660718",
        },
        deepRed: "#8F0B23",
        brandBlack: "#111111",
        darkSurface: "#1B1B1D",
        cardDark: "#232326",
        offWhite: "#F5F3EF",
        brandGold: {
          DEFAULT: "#D4A72C",
          hover: "#B88E1F",
          light: "#E5BC47",
        },
        mutedGrey: "#777777",
        borderDark: "#2E2E32",
        borderLight: "#E5E1D8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-barlow-condensed)", "sans-serif"],
      },
      boxShadow: {
        club: "0 10px 30px -10px rgba(200, 16, 46, 0.3)",
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
        cardHover: "0 12px 30px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
