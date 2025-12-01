/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Asha Bhavan Logo Colors
        'asha-pink': '#FFB6C1', // Light pink
        'asha-pink-dark': '#FF91A4', // Slightly darker pink
        'asha-green': '#2D5016', // Dark green
        'asha-gold': '#FFD700', // Golden yellow
        'asha-yellow': '#FFFF00', // Bright yellow
        'asha-black': '#000000', // Black
      },
    },
  },
  plugins: [],
}
