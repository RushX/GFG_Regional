/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      linearGradientColors: {
        custom: {
          '0': '#52AF7B',
          '100': 'rgba(4, 127, 112, 0.7)',
        },
      },
      margin: {
        '60px': '60px',
        '90px': '90px',
      }
    },
  },

  plugins: [],
}

