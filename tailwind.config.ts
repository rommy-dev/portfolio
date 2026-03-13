import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ── Surfaces ── */
        background:     'hsl(var(--background) / <alpha-value>)',
        surface:        'hsl(var(--surface) / <alpha-value>)',
        'surface-raised':'hsl(var(--surface-raised) / <alpha-value>)',
        border:         'hsl(var(--border) / <alpha-value>)',

        /* ── Texte ── */
        foreground:        'hsl(var(--foreground) / <alpha-value>)',
        'foreground-muted':'hsl(var(--foreground-muted) / <alpha-value>)',
        'foreground-subtle':'hsl(var(--foreground-subtle) / <alpha-value>)',

        /* ── Primary ── */
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          hover:   'hsl(var(--primary-hover) / <alpha-value>)',
          light:   'hsl(var(--primary-light) / <alpha-value>)',
          fg:      'hsl(var(--primary-fg) / <alpha-value>)',
        },

        /* ── Secondary ── */
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          hover:   'hsl(var(--secondary-hover) / <alpha-value>)',
          light:   'hsl(var(--secondary-light) / <alpha-value>)',
          fg:      'hsl(var(--secondary-fg) / <alpha-value>)',
        },

        /* ── Accent ── */
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          hover:   'hsl(var(--accent-hover) / <alpha-value>)',
          light:   'hsl(var(--accent-light) / <alpha-value>)',
          fg:      'hsl(var(--accent-fg) / <alpha-value>)',
        },

        /* ── États sémantiques ── */
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          light:   'hsl(var(--success-light) / <alpha-value>)',
          fg:      'hsl(var(--success-fg) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          light:   'hsl(var(--warning-light) / <alpha-value>)',
          fg:      'hsl(var(--warning-fg) / <alpha-value>)',
        },
        error: {
          DEFAULT: 'hsl(var(--error) / <alpha-value>)',
          light:   'hsl(var(--error-light) / <alpha-value>)',
          fg:      'hsl(var(--error-fg) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'hsl(var(--info) / <alpha-value>)',
          light:   'hsl(var(--info-light) / <alpha-value>)',
          fg:      'hsl(var(--info-fg) / <alpha-value>)',
        },
      },

      /* ── Typographie ── */
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },

      /* ── Ombres avec couleur primary ── */
      boxShadow: {
        'primary-sm': '0 2px 8px hsl(var(--primary) / 0.20)',
        'primary-md': '0 4px 20px hsl(var(--primary) / 0.25)',
        'primary-lg': '0 8px 40px hsl(var(--primary) / 0.30)',
      },

      /* ── Animations ── */
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;