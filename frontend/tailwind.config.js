/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
      },
      colors: {
        flamingo: {
          100: "#DC5A41",
          200: "#BD4F39",
          300: "#963F2D",
        },
      },
    },
  },
  plugins: [],
};
