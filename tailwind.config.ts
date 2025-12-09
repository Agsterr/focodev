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
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans'],
      },
      colors: {
        brand: {
          DEFAULT: '#0EA5E9',
          dark: '#0284C7',
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
      },
    },
  },
  plugins: [],
} satisfies Config
