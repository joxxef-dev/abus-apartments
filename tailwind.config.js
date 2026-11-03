/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['amenity-card', 'unit-card', 'selected', 'active', 'open', 'brand-light'],
  theme: {
    extend: {
      colors: {
        abus: { navy: '#050B14', gold: '#D4AF37', paper: '#F9F6F0', charcoal: '#111820' },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
