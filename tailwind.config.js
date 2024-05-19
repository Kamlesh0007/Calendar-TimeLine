/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#007aff",
        "blue-600": "#0047ab",
        gray: {
          500: '#7b8697',
          700: '#3e4857',
        },
      },
    },
  },
  plugins: [],
};
