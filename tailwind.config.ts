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
        offWhite: "#F7F6F2",
        white: "#FFFFFF",
        brandBlack: "#242424",
        charcoal: "#181818",
        darkSurface: "#FFFFFF",
        cardDark: "#FFFFFF",
        cardLight: "#FFFFFF",
        brandGold: {
          DEFAULT: "#D4A72C",
          hover: "#B88E1F",
          light: "#E5BC47",
        },
        mutedGrey: "#777777",
        lightBorder: "#E7E5E1",
        borderLight: "#E7E5E1",
        borderDark: "#E7E5E1",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-barlow-condensed)", "sans-serif"],
      },
      boxShadow: {
        club: "0 4px 14px rgba(200, 16, 46, 0.25)",
        card: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
        cardHover: "0 10px 25px -4px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
        dropdown: "0 10px 30px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
