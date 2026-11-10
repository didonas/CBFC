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
        // Contemporary Football Editorial Palette
        ivory: {
          DEFAULT: "#F4F3EF",
          pure: "#FFFFFF",
          subtle: "#EFECE6",
        },
        ink: {
          DEFAULT: "#202020",
          soft: "#2A2A2A",
          deep: "#141414",
        },
        burgundy: {
          DEFAULT: "#A51E32",
          hover: "#8B1728",
          dark: "#6B101E",
          light: "#C0253D",
        },
        stone: {
          DEFAULT: "#DAD8D2",
          light: "#EAE8E2",
          subtle: "#F0EFEA",
          dark: "#B8B5AC",
        },
        muted: {
          DEFAULT: "#77736D",
          light: "#9A958E",
          dark: "#5A5651",
        },
        // Legacy & Compatibility Aliases
        primary: {
          DEFAULT: "#A51E32",
          hover: "#8B1728",
          light: "#C0253D",
          dark: "#6B101E",
        },
        deepRed: "#8B1728",
        brandGold: {
          DEFAULT: "#D4A72C",
          hover: "#B88E1F",
          light: "#E5BC47",
        },
        charcoal: "#202020",
        darkBase: "#202020",
        darkSurface: "#2A2A2A",
        cardDark: "#202020",
        cardLight: "#FFFFFF",
        lightBorder: "#DAD8D2",
        borderLight: "#DAD8D2",
        borderDark: "#333333",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-archivo)", "sans-serif"],
        stats: ["var(--font-barlow-condensed)", "sans-serif"],
        mono: ["var(--font-barlow-condensed)", "monospace"],
      },
      boxShadow: {
        editorial: "0 1px 3px rgba(0, 0, 0, 0.05)",
        editorialHover: "0 4px 16px rgba(0, 0, 0, 0.08)",
        club: "0 2px 10px rgba(165, 30, 50, 0.18)",
        card: "0 1px 3px rgba(0, 0, 0, 0.05)",
        cardHover: "0 4px 16px rgba(0, 0, 0, 0.08)",
        dropdown: "0 8px 24px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
