/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "cursive"],
        angelos: ["Angelos", "sans-serif"],
        transcity: ["Transcity", "sans-serif"],
      },
    },
  },
  plugins: [],
};
