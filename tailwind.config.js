/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', 'system-ui', 'sans-serif'],
      },
      colors: {
        kid: {
          sky: '#e0f7fa',
          mint: '#b2dfdb',
          orange: '#ff9800',
          sun: '#ffc107',
          grass: '#81c784',
          berry: '#ef5350',
        },
      },
      fontSize: {
        'kid-title': ['1.75rem', { lineHeight: '2rem' }],
        'kid-body': ['1rem', { lineHeight: '1.5rem' }],
      },
    },
  },
  plugins: [],
}
