/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorBg: "#1d1535",
        colorBoard: "#f5faff",
        colorCell: "#808faa",

        color128: "#f86c27",

      },
      borderRadius: {
        'cell': '12px',
        'board': '24px',
      },

      boxShadow: {
        'board': '0 0 10px 0 rgba(0, 0, 0, 0.5)',
        'cell': '0 0 10px 0 rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

