/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#434343",
      },
      fontFamily: {
        main: "Roboto",
        serrat: "Montserrat",
      },
      backgroundImage: {
        hero: 'url("/src/assets/hero.jpg")',
        banner: 'url("/src/assets/banner.png")',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".underline-custom": {
          position: "relative",
          display: "inline-block",
        },
        ".underline-custom::after": {
          content: '""',
          position: "absolute",
          left: 0,
          bottom: "-2px", // Adjust distance
          width: "0%",
          height: "1px", // Adjust thickness
          backgroundColor: theme("colors.main"),
          transition: "width 0.3s ease",
        },
        ".underline-custom:hover::after": {
          width: "100%", // Show underline on hover
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
