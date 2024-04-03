import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/***/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "custom-white": "#ececec",
        "custom-gray-dark": "#7777773d",
        "custom-gray-dark-2": "#303030",
        "custom-gray-light": "#5a5a5a",
        "custom-zinc-light": "#9CA3AF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "load-bounce": {
          from: { transform: "translateY(-50%)" },
          to: { transform: "translateY(50%)" },
        },
        "double-arrow-bounce": {
          from: { bottom: "60px" },
          to: { bottom: "40px" },
        },
        "contacts-bounce": {
          "0%,14%,100%": { transform: "translateY(0)" },
          "7%": { transform: "translateY(-20%)" },
        },
        "scale": {
          from: { transform: "scale(0%)", opacity: "0" },
          to: { transform: "scale(100%)", opacity: "1" },
        }
      },
      animation: {
        "load-bounce": "load-bounce 700ms ease-in-out infinite alternate",
        "double-arrow-bounce":
          "double-arrow-bounce 1s ease-in-out infinite alternate",
        "contacts-bounce": "contacts-bounce 4s infinite",
        "scale": "scale 150ms ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
