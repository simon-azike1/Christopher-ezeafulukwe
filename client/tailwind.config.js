/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  safelist: [
    'bg-navy', 'dark:bg-cream',
    'bg-cream', 'dark:bg-navy',
    'text-cream', 'dark:text-cream',
    'text-navy', 'dark:text-navy',
    'text-gold', 'text-charcoal',
    'nav-link', 'btn-primary', 'btn-outline'
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        cream: '#F5F0E8',
        gold: '#C9922A',
        charcoal: '#2C2C2C',
        navyLight: '#162d52',
        navyDark: '#071428',
        goldLight: '#E0A83A',
        goldDark: '#A87820',
      },
    },
  },
  plugins: [],
}
