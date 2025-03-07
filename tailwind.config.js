/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: {
          "50": "#f0f7fc",
          "100": "#dcedf7",
          "200": "#c0ddf0",
          "300": "#94c7e5",
          "400": "#60aad6",
          "500": "#3e90c2",
          "600": "#2772a0",
          "700": "#215a83",
          "800": "#204c6c",
          "900": "#1e405b",
          DEFAULT: "#2772A0",
        },
        secondary: {
          "50": "#f7fafd",
          "100": "#eef5fa",
          "200": "#dfeef7",
          "300": "#ccddea",
          "400": "#aac5d9",
          "500": "#89adc8",
          "600": "#6991b5",
          "700": "#587da0",
          "800": "#4c6983",
          "900": "#42596d",
          DEFAULT: "#CCDDEA",
        },
        black: {
          "100": "#333333",
          "200": "#141413",
          "300": "#7D8087",
          DEFAULT: "#000000",
        },
        white: {
          "100": "#F7F7F7",
          DEFAULT: "#FFFFFF",
        },
      },
      fontFamily: {
        "work-sans": ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};