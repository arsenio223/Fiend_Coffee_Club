// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#ff002f',
          dark: '#af0606',
          light: '#ed0101',
        },
        cream: '#fcf8f0',
      
      },
      fontFamily: {
        serif: ['var(--font-dm-serif)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 20px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
};

export default config;