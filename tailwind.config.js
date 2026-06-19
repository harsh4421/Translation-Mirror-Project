/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          app: 'var(--color-bg-app)',
          surface: 'var(--color-bg-surface)',
          card: 'var(--color-bg-card)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': '40px',
        'section': '24px',
        'body': '16px',
        'meta': '13px',
      },
      lineHeight: {
        'relaxed': '1.6',
      },
      boxShadow: {
        'glass': '0 4px 24px -4px rgba(0, 0, 0, 0.05)',
        'glass-dark': '0 4px 24px -4px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulseSlow 3s infinite cubic-bezier(0.4, 0, 0.6, 1)',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
    },
  },
  plugins: [],
}
