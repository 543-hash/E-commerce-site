/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f7f6f4',
          100: '#edebe7',
          200: '#dcd9d2',
          300: '#c2bdb1',
          400: '#9e978a',
          500: '#7d7567',
          600: '#625b50',
          700: '#4b463e',
          800: '#322e29',
          900: '#1c1917',
        },
        accent: {
          50: '#fef7f0',
          100: '#fdebd9',
          200: '#f8d2ad',
          300: '#f1b27a',
          400: '#e88d4a',
          500: '#dc6f25',
          600: '#c2571c',
          700: '#9f441a',
          800: '#7f391c',
          900: '#67301a',
        },
      },
      letterSpacing: {
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
};
