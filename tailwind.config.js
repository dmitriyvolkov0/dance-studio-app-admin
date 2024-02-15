/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#CE5EFF',
        'brand-hover': '#d794f3',
        'brand-active': '#b814ff',
      },
      screens: {
        '[320px]': '320px',
        '[330px]': '330px',
        '[340px]': '340px',
        '[350px]': '350px',
        '[360px]': '360px',
        '[370px]': '370px',
        '[380px]': '380px',
        '[390px]': '390px',
        '[400px]': '400px',
      }
    },
  },
  plugins: [],
}