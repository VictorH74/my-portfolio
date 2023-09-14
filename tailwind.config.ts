import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/***/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#4e54fd",
        "second-color": "#5a5a5a36",
        "main-trasnparent-color": "#4d4dcd50",
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
      },
      animation: {
        "load-bounce": "load-bounce 700ms ease-in-out infinite alternate",
        "double-arrow-bounce":
          "double-arrow-bounce 1s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
