/** @type {import('tailwindcss').Config} */
export default {
  // Scan templates and React files so unused utility classes are removed from builds.
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // These colors match the church site's navy, ink, gold, and cream palette.
      colors: {
        ink: '#102a3a',
        cream: '#f7f1e3',
        gold: '#d2973b',
        navy: '#0d1f2d',
      },
      // Montserrat is loaded in index.html and used as the global sans-serif font.
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
