/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-color": "#4e54fd",
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
}

