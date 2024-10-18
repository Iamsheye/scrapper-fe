/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        page_bg: "#FAF7EE",
        light_orange: "#FBA78B",
        light_blue: "#90D7EB",
        yellow: "#FDE492",
        purple: "#BE96F1",
        primary: "#140A46",
        form: "#F6F2E6",
        form_text: "#BEBEBC",
      },
    },
  },
  plugins: [],
};
