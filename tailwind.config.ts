import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08090c",
        panel: "#101218",
        brand: { DEFAULT: "#8b5cf6", light: "#a78bfa" },
      },
      boxShadow: { glow: "0 0 60px rgba(139,92,246,.16)" },
    },
  },
  plugins: [],
} satisfies Config;
