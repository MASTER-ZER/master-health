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
        background: "#F7FAFC",
        primary: {
          DEFAULT: "#2B6CB0",
          dark: "#23548A",
          light: "#EBF8FF",
          container: "#005394",
        },
        secondary: {
          DEFAULT: "#38A169",
          hover: "#2F855A",
          light: "#F0FFF4",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F7FAFC",
          card: "#FFFFFF",
        },
        heading: "#1A202C",
        body: "#4A5568",
        muted: "#718096",
        border: "#E2E8F0",
        warning: {
          DEFAULT: "#D69E2E",
          light: "#FEFCBF",
          dark: "#744210",
        },
        error: {
          DEFAULT: "#E53E3E",
          light: "#FED7D7",
          dark: "#742A2A",
        },
        success: {
          DEFAULT: "#38A169",
          light: "#C6F6D5",
          dark: "#22543D",
        },
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
        cairo: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(26, 32, 44, 0.04), 0 4px 8px rgba(43, 108, 176, 0.03)",
        hover: "0 4px 12px rgba(26, 32, 44, 0.06), 0 8px 24px rgba(43, 108, 176, 0.05)",
        modal: "0 12px 32px rgba(26, 32, 44, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
