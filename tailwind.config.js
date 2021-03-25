const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        // Build your palette here
        transparent: "transparent",
        current: "currentColor",
        gray: colors.trueGray,
        blueGray: colors.blueGray,
        red: colors.red,
        blue: colors.lightBlue,
        yellow: colors.amber,
        cyan: colors.cyan,
      },
    },

    minHeight: {
      "0": "0vh",
      "1/4": "25vh",
      "1/2": "50vh",
      "3/4": "75vh",
      full: "100%",
      screen: "100vh",
    },
  },

  variants: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["visited"],
    },
  },
  plugins: [],
};
