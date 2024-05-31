/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
        socialBg:'#F5F7FB',
        socialBlue: '#218DFA',
        lightblack: '#d3e9ff',
        gold: '#FFFF7A',
        Rosewood: '#660011',
        hex: '#0000df'
      }
    },
  },
  plugins: [],
}

