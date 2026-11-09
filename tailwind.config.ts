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
        brandBlack: "#0B0F1A",
        darkBase: "#121826", // balanced athletic stadium slate (not pitch black)
        offWhite: "#121826",
        charcoal: "#182236", // balanced stadium surface
        darkSurface: "#182236",
        cardDark: "#1C273E", // cards with clear contrast
        cardLight: "#22304C", // elevated interactive surface
        brandGold: {
          DEFAULT: "#D4A72C",
          hover: "#B88E1F",
          light: "#E5BC47",
        },
        mutedGrey: "#94A3B8",
        lightBorder: "rgba(255, 255, 255, 0.10)",
        borderLight: "rgba(255, 255, 255, 0.10)",
        borderDark: "rgba(255, 255, 255, 0.15)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-barlow-condensed)", "sans-serif"],
      },
      boxShadow: {
        club: "0 4px 20px rgba(200, 16, 46, 0.25)",
        card: "0 4px 24px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15)",
        cardHover: "0 12px 36px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(200, 16, 46, 0.15)",
        dropdown: "0 14px 40px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
