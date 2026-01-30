/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        surface2: 'var(--surface2)',
        cardBorder: 'var(--cardBorder)',
        text: 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        accentCTA: 'var(--accentCTA)',
        accentPressed: 'var(--accentPressed)',
        accentSoft: 'var(--accentSoft)',
        accentBorderSoft: 'var(--accentBorderSoft)',
        pastelCream: 'var(--pastel-cream)',
        pastelPink: 'var(--pastel-pink)',
        pastelLavender: 'var(--pastel-lavender)',
        pastelMint: 'var(--pastel-mint)',
        pastelIce: 'var(--pastel-ice)',
        cardMagenta: 'var(--card-magenta)',
        cardMagentaBorder: 'var(--card-magenta-border)',
        cardGrape: 'var(--card-grape)',
        cardGrapeBorder: 'var(--card-grape-border)',
        cardCobalt: 'var(--card-cobalt)',
        cardCobaltBorder: 'var(--card-cobalt-border)',
        cardTeal: 'var(--card-teal)',
        cardTealBorder: 'var(--card-teal-border)',
        cardAmber: 'var(--card-amber)',
        cardAmberBorder: 'var(--card-amber-border)',
        cardSlate: 'var(--card-slate)',
        cardSlateBorder: 'var(--card-slate-border)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        'heading-xl': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-lg': ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-md': ['20px', { lineHeight: '1.2', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-md': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
