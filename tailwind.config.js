/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBF6EC",
        ink: "#1F4B4A",
        marigold: "#E8A33D",
        terracotta: "#C0453D",
        sage: "#3F6B54",
        line: "#E4DCC7",
      },
      fontFamily: {
        display: ["'Baloo 2'", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
