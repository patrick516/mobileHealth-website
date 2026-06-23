/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A6E3E', // Your green
          light: '#1A8A4E',
          dark: '#06522E',
          lighter: '#E8F5ED',
        },
        secondary: {
          DEFAULT: '#F59E0B', // Your yellow/gold
          light: '#FBBF24',
          dark: '#D97706',
        },
        accent: {
          DEFAULT: '#1E40AF', // Your blue
          light: '#3B82F6',
          dark: '#1E3A8A',
        },
        text: {
          DEFAULT: '#1F2937',
          secondary: '#6B7280',
          light: '#9CA3AF',
        },
        background: '#F9FAFB',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}
