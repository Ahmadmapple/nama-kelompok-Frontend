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
          50: '#f0f4ff',
          100: '#e0e7ff',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
        },
        secondary: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
        }
      },
      borderRadius: {
        'lg': '16px',
        'sm': '8px',
      },
      boxShadow: {
        'custom': '0 10px 25px rgba(0, 0, 0, 0.05)',
        'custom-lg': '0 20px 40px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      scale: {
        '102': '1.02',
      },
      transitionDuration: {
        '600': '600ms',
      }
    },
  },
  plugins: [],
}