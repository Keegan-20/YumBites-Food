/** @type {import('tailwindcss').Config} */

/**
 * Colors live in tokens.css as space-separated RGB channels (`--brand-500: 193 133 109`).
 * This helper re-exposes them to Tailwind while preserving opacity modifiers,
 * so `bg-brand-500`, `bg-brand-500/40` and `text-ink-900` all resolve from the
 * same source of truth. Never hardcode a hex here — edit tokens.css instead.
 */
const token = (name) => ({ opacityValue }) =>
  opacityValue === undefined
    ? `rgb(var(--${name}))`
    : `rgb(var(--${name}) / ${opacityValue})`;

const scale = (name, steps) =>
  Object.fromEntries(steps.map((step) => [step, token(`${name}-${step}`)]));

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    screens: {
      'lg':{'max': '1024px'},
      // => @media (max-width: 1024px) { ... }  <= 1024px and below

      'semilg':{'max':'830px'},
      // => @media (max-width: 830px) { ... }  <= 830px and below

      'md':{'max': '768px'},
      // => @media (max-width: 768px) { ... }

      'semimd':{'max':'602px'},
      // => @media (max-width: 600px) { ... }

      'semism':{'max': '440px'},
      // => @media (max-width: 400px) { ... }

      'sm':{'max': '320px'},
      // => @media (max-width: 320px) { ... }
    },

    extend: {
      colors: {
        // Herb green. CTAs, active states, links. ~10% of painted area.
        brand: scale('brand', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
        // Tandoor terracotta. Offers, ratings, cart count. ~4%.
        accent: scale('accent', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
        // Warm cream surfaces. ~60%.
        cream: scale('cream', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]),
        // Cocoa brown. Every word on the page. ~25%.
        ink: scale('ink', [50, 100, 200, 300, 500, 700, 900]),
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        // Display face — wordmark and section headings ONLY. Never body copy.
        // A grotesk, not a serif: the headline should read like signage on a
        // shopfront, not like a magazine feature.
        display: ['Bricolage Grotesque', 'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        float: 'var(--shadow-float)',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
      },
      backgroundImage: {
        'image-scrim': 'var(--gradient-image-scrim)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out both',
        'slide-up': 'slide-up 0.35s ease-out both',
        'slide-down': 'slide-down 0.25s ease-out both',
      },
    },
  },

  plugins:[],
}
