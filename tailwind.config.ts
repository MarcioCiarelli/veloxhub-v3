import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        card: '#0D1117',
        border: '#1F2937',
        'text-primary': '#FFFFFF',
        'text-secondary': '#9CA3AF',
        accent: '#FFD400',
        'accent-hover': '#FFEA00',
        'accent-dim': 'rgba(255,212,0,0.1)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,212,0,0.08) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'counter': 'counter 2s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      boxShadow: {
        'accent': '0 0 32px rgba(255,212,0,0.2)',
        'accent-lg': '0 0 64px rgba(255,212,0,0.15)',
        'card': '0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}

export default config
