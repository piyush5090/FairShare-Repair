/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Extend the default theme with custom fonts and colors
      fontFamily: {
        // Define a custom 'sans' font family using Inter
        sans: ['Inter', 'sans-serif'],
        // Optionally, you can define additional font families
        // heading: ['Inter', 'sans-serif'],
        // body: ['Inter', 'sans-serif'],
      },
      colors: {
        // Ensure your primary color is defined if not already
        primary: {
          DEFAULT: '#10B981', // Teal-500
          dark: '#059669',    // Teal-600
        },
        // You can add more custom colors here if needed
      },
      // Optionally, you can add custom font sizes, spacing, etc.
      // For example:
      // fontSize: {
      //   'xxs': '0.65rem',
      // },
    },
  },
  plugins: [],
}
