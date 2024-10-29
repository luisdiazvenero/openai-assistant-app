/** @type {import('tailwindcss').Config} */
const { themeConfig } = require('./config/theme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-orange': themeConfig.colors.primary,
        'custom-orange-dark': themeConfig.colors.primaryDark,
      },
      fontFamily: {
        sans: [themeConfig.font.family, 'sans-serif'],
      },
      
      animation: {
        'pulse-border': 'pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}