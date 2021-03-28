const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        grey: colors.gray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
