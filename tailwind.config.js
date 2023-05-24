/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        collab: {
          50: {
            DEFAULT: '#f3f5fa',
          },
          100: {
            DEFAULT: '#e9ebf6',
          },
          200: {
            DEFAULT: '#d7dbee',
          },
          300: {
            DEFAULT: '#bfc3e2',
          },
          400: {
            DEFAULT: '#a4a6d5',
          },
          500: {
            DEFAULT: '#8280c1',
          },
          600: {
            DEFAULT: '#7b75b6',
          },
          700: {
            DEFAULT: '#6a639f',
          },
          800: {
            DEFAULT: '#575281',
          },
          900: {
            DEFAULT: '#4a4669',
          },
          primary: {
            DEFAULT: '#8280c1',
            light: '#9a98da',
            dark: '#575281',
          },
          secondary: {
            DEFAULT: '#9c9ca2',
            light: '#eeeeee',
            dark: '#444444',
          },
          success: {
            DEFAULT: '#55b36d',
            light: '#d1f3db',
            dark: '#3f874c',
          },
          warning: {
            DEFAULT: '#e7b031',
            light: '#faefcc',
            dark: '#8e7200',
          },
          danger: {
            DEFAULT: '#e74c3c',
            light: '#f6dbdb',
            dark: '#be3327',
          },
          info: {
            DEFAULT: '#17a2b8',
            light: '#d2eafa',
            dark: '#0e5d8e',
          },
          dark: {
            DEFAULT: '#212529',
            light: '#343a40',
          },
          light: {
            DEFAULT: '#f8f9fa',
            dark: '#ced4da',
          },
        },
      },
    },
  },
  plugins: [],
};
