/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f1ff',
          100: '#e9e5ff',
          200: '#d6d0ff',
          300: '#b8abff',
          400: '#9479ff',
          500: '#5B47E0',
          600: '#4f3cc8',
          700: '#432fa8',
          800: '#382787',
          900: '#2e1f6e',
        },
        secondary: {
          50: '#fef8ec',
          100: '#fdecd0',
          200: '#fad59f',
          300: '#f6b968',
          400: '#f39634',
          500: '#F39C12',
          600: '#e07408',
          700: '#b85508',
          800: '#94430c',
          900: '#7a370d',
        },
        accent: {
          50: '#fdf2f7',
          100: '#fce7f1',
          200: '#f9d0df',
          300: '#f5a9c2',
          400: '#ee7ba0',
          500: '#E91E63',
          600: '#db1757',
          700: '#be1049',
          800: '#9e0f3f',
          900: '#851038',
        }
      },
      fontFamily: {
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'badge': '0 4px 20px rgba(91, 71, 224, 0.3)',
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'elevation': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'bounce-in': 'bounceIn 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'confetti': 'confetti 0.8s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(91, 71, 224, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(91, 71, 224, 0.6)' },
        },
        confetti: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '100%': { transform: 'scale(1.2) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}