/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#2078F9'
      },
      fontFamily: {
        main: 'Roboto'
      }
    },
  },
  plugins: [],
}

