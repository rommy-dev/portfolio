import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F3F4F6',
        foreground: '#111827',
        primary: '#1E3A8A',
        secondary: '#06B6D4',
        accent: '#F43F5E',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
