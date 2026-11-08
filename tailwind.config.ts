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
          hover: "#9F0C24",
          light: "#E32644",
          dark: "#660718",
        },
        deepRed: "#8F0B23",
        brandBlack: "#06080C",
        darkBase: "#0B0E17",
        offWhite: "#0B0E17", // map legacy offWhite to darkBase for consistency
        charcoal: "#141926", // rich athletic navy-slate surface
        darkSurface: "#141926",
        cardDark: "#141926",
        cardLight: "#1C2436",
        brandGold: {
          DEFAULT: "#D4A72C",
          hover: "#B88E1F",
          light: "#E5BC47",
        },
        mutedGrey: "#94A3B8",
        lightBorder: "rgba(255, 255, 255, 0.08)",
        borderLight: "rgba(255, 255, 255, 0.08)",
        borderDark: "rgba(255, 255, 255, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-barlow-condensed)", "sans-serif"],
      },
      boxShadow: {
        club: "0 4px 20px rgba(200, 16, 46, 0.25)",
        card: "0 4px 24px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
        cardHover: "0 12px 36px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(200, 16, 46, 0.15)",
        dropdown: "0 14px 40px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
export default config;
