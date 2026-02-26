/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          50: '#E6F4FA',
          100: '#D4F1F4',
          500: '#00CED1',
          600: '#00A8B5',
        },
        orange: {
          100: '#FFF4E6',
          500: '#FF8C42',
          600: '#E67E2F',
        },
      },
    },
  },
  plugins: [],
}
