/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      divider: "#c2c2c2",
      primary: "#f39c12",
      "primary-container": "#121111",
      "primary-variant": "#492f05",
      surface: "#0d0d0d",
      success: "#388E3C",
      error: "#b00d20",
    },
    fontFamily: {
      sans: ["Khula", "Graphik", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
