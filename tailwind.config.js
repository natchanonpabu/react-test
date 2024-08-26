/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-green": "#6eda78",
        "primary-orange": "#ffa200",
        "primary-gray": "#7b7b7b",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
