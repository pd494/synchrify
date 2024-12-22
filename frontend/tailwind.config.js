/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'title': ['1.5rem', { lineHeight: '1.875rem', letterSpacing: '-0.015em' }],
        'subtitle': ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '-0.01em' }],
        'body': ['1rem', { lineHeight: '1.5rem' }],
      },
      spacing: {
        'sidebar': '20%', // Reduced from 25%
        'chat': '280px', // Fixed width for chat
      },
      colors: {
        'accent': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
        },
      },
    },
  },
  plugins: [],
}