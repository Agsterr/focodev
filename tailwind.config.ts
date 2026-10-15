import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans'],
        display: ['var(--font-display)', 'var(--font-sans)', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          DEFAULT: '#0EA5E9',
          dark: '#0284C7',
        },
        // Paleta do tema escuro "neon": ciano → violeta → rosa
        neon: {
          cyan: '#22D3EE',
          violet: '#8B5CF6',
          pink: '#EC4899',
          lime: '#A3E635',
        },
        ink: {
          950: '#05060F',
          900: '#0A0B1A',
          800: '#11132A',
          700: '#1B1E3D',
        },
        surface: {
          light: '#ffffff',
          dark: '#0b1220',
        },
        muted: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0,0,0,0.08)',
        glow: '0 10px 25px rgba(14,165,233,0.25)',
        neon: '0 0 0 1px rgba(139,92,246,0.35), 0 10px 40px -10px rgba(139,92,246,0.55)',
        'neon-cyan': '0 10px 40px -10px rgba(34,211,238,0.6)',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(6%, -8%) scale(1.15)' },
          '66%': { transform: 'translate(-6%, 6%) scale(0.95)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        aurora: 'aurora 18s ease-in-out infinite',
        'aurora-slow': 'aurora 26s ease-in-out infinite reverse',
        marquee: 'marquee 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out 1.5s infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
