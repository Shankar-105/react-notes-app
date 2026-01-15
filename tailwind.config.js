/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'notes-bg': '#252525',
        'notes-card-pink': '#FF9E9E',
        'notes-card-green': '#91F48F',
        'notes-card-yellow': '#FFF599',
        'notes-card-cyan': '#9EFFFF',
        'notes-card-purple': '#B69CFF',
        'notes-card-purple-alt': '#FD99FF',
        'notes-button': '#3B3B3B',
        'notes-text-white': '#FFFFFF',
        'notes-text-black': '#000000',
        'notes-text-gray': '#9A9A9A',
        'notes-text-light-gray': '#CCCCCC',
        'notes-text-placeholder': '#CFCFCF',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        'notes': '30px',
        'notes-card': '10px',
        'notes-button': '15px',
      },
    },
  },
  plugins: [],
}
