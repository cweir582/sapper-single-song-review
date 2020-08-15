module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        'bright-red': '#FF0606',
      },
    },
  },
  variants: {},
  plugins: [],
}
