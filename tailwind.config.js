/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        fira_code: ['\"Fira Code Variable\"', 'monospace'],
        nunito: ['\"Nunito\", sans-serif'],
      },
      colors: {
        navy: {
          50: '#f4f7fb',
          100: '#e7f0f7',
          200: '#cbdeec',
          300: '#9cc3dd',
          400: '#67a3c9',
          500: '#4488b3',
          600: '#336c96',
          700: '#2a577a',
          800: '#264b66',
          900: '#244056',
          950: '#182939',
        },
      },
    },
  },
  plugins: [],
};
