/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorBg: "#047B5C",
        colorBoard: "#ECF1ED",
        colorCell: "#C0D8B6",
        color2: "#06434C",
        color4: "#116073",
        color8: "#0C7F96",
        color16: "#109687",
        color32: "#3EB26B",
        color64: "#91C357",
        color128: "#E0B237",
        color256: "#DD9351",
        color512: "#D85E69",
        color1024: "#BE639B",
        color2048: "#AA7ABF",
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

