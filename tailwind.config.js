/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0f291e',
          800: '#1b4332',
          700: '#2d6a4f',
          600: '#40916c',
          500: '#52b788',
          400: '#74c69d',
          300: '#95d5b2',
          200: '#b7e4c7',
          100: '#d8f3dc',
        },
        wood: {
          900: '#38220f',
          800: '#432818',
          700: '#6d4c2b',
          600: '#8c6239',
          500: '#a47a4c',
          400: '#bc9a6a',
          300: '#d4a373',
          200: '#ecd9c6',
          100: '#f5ede2',
          50: '#faf7f2',
        }
      }
    },
  },
  plugins: [],
}
