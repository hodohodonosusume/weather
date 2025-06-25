/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#6D28D9',      // 高彩度パープル
        brandDark: '#4C1D95',
        accent: '#F59E0B',     // 明るいオレンジ
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['"Noto Sans JP"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 24px rgba(109,40,217,.18)',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at 20% 20%, rgba(245,158,11,.25), transparent 40%), radial-gradient(circle at 80% 80%, rgba(109,40,217,.25), transparent 40%)',
      },
      animation: {
        fadeIn: 'fadeIn .8s ease-out forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
