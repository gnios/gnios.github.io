const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  // Removido experimental feature para evitar warnings
  content: [
    './pages/**/*.js',
    './components/**/*.js',
    './layouts/**/*.js',
    './lib/**/*.js',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', ...defaultTheme.fontFamily.sans],
        serif: ['Georgia', 'Charter', 'Iowan Old Style', ...defaultTheme.fontFamily.serif],
      },
      gradientColorStops: {
        // https://coolors.co/2d00f7-6a00f4-8900f2-a100f2-b100e8-bc00dd-d100d1-db00b6-e500a4-f20089
        'gradient-1-start': '#F20089',
        'gradient-1-end': '#D100D1',
        'gradient-2-start': '#D100D1',
        'gradient-2-end': '#A100F2',
        'gradient-3-start': '#A100F2',
        'gradient-3-end': '#2D00F7',
      },
      colors: {
        ink:           '#191919',
        'ink-body':    '#292929',
        'ink-light':   '#6B6B6B',
        'ink-faint':   '#B3B3B3',
        stroke:        '#E6E6E6',
        wash:          '#F2F2F2',
        'wash-subtle': '#FAFAFA',
        primary: {
          100: '#FDD1D9',
          200: '#FBA4BC',
          300: '#F575A5',
          400: '#EB519B',
          500: '#DE1D8D',
          600: '#BE1588',
          700: '#9F0E7F',
          800: '#800972',
          900: '#6A0568',
        },
        'primary-color': {
          100: '#FDD1D9',
          200: '#FBA4BC',
          300: '#F575A5',
          400: '#EB519B',
          500: '#DE1D8D',
          600: '#BE1588',
          700: '#9F0E7F',
          800: '#800972',
          900: '#6A0568',
        },
        'primary-color-dark': {
          100: '#FDD1D9',
          200: '#FBA4BC',
          300: '#F575A5',
          400: '#EB519B',
          500: '#DE1D8D',
          600: '#BE1588',
          700: '#9F0E7F',
          800: '#800972',
          900: '#6A0568',
        },
        'background-color': '#000',
        green: colors.emerald,
        gray: colors.neutral,
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: '#292929',
            fontSize: '21px',
            lineHeight: '1.8',
            fontFamily: "Georgia, 'Charter', serif",
            a: {
              color: '#191919',
              textDecoration: 'underline',
              '&:hover': { color: '#191919' },
              code: { color: '#191919' },
            },
            h1: { fontWeight: '700', letterSpacing: '-0.02em', color: '#191919', fontFamily: "Georgia, 'Charter', serif" },
            h2: { fontWeight: '700', letterSpacing: '-0.01em', color: '#191919', fontSize: '26px', lineHeight: '1.3', fontFamily: "Georgia, 'Charter', serif" },
            h3: { fontWeight: '700', color: '#191919', fontSize: '22px', lineHeight: '1.3', fontFamily: "Georgia, 'Charter', serif" },
            'h4,h5,h6': { color: '#191919' },
            pre: { backgroundColor: 'transparent' },
            'pre code': { backgroundColor: 'transparent', color: 'inherit', padding: 0 },
            code: {
              color: '#191919',
              backgroundColor: '#F2F2F2',
              paddingLeft: '4px', paddingRight: '4px',
              paddingTop: '2px', paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': { content: 'none' },
            'code::after':  { content: 'none' },
            hr:   { borderColor: '#E6E6E6' },
            'ol li::marker': { fontWeight: '600', color: '#6B6B6B' },
            'ul li::marker': { backgroundColor: '#6B6B6B' },
            strong:     { color: '#191919' },
            blockquote: { color: '#6B6B6B', borderLeftColor: '#E6E6E6' },
          },
        },
        dark: {
          css: {
            color: '#E6E6E6',
            fontFamily: "Georgia, 'Charter', serif",
            a: {
              color: '#FAFAFA',
              '&:hover': { color: '#FAFAFA' },
              code: { color: '#FAFAFA' },
            },
            h1: { color: '#FAFAFA', fontFamily: "Georgia, 'Charter', serif" },
            h2: { color: '#FAFAFA', fontFamily: "Georgia, 'Charter', serif" },
            h3: { color: '#FAFAFA', fontFamily: "Georgia, 'Charter', serif" },
            'h4,h5,h6': { color: '#FAFAFA' },
            pre: { backgroundColor: 'transparent' },
            'pre code': { backgroundColor: 'transparent', color: 'inherit', padding: 0 },
            code: { backgroundColor: '#292929' },
            hr: { borderColor: '#292929' },
            'ol li::marker': { color: '#B3B3B3' },
            'ul li::marker': { backgroundColor: '#B3B3B3' },
            strong:     { color: '#FAFAFA' },
            blockquote: { color: '#B3B3B3', borderLeftColor: '#292929' },
          },
        },
      }),
      keyframes: {
        shrink: {
          '0% , 100%': {
            height: '0.75rem',
          },
          '50%': {
            height: '0.375rem',
          },
        },
        'bg-hue-animation': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(180deg)' },
          '100%': { filter: 'hue-rotate(0deg)' },
        },
        'fade-away': {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0.2,
          },
        },
        expand: {
          '0% , 100%': {
            height: '0.375rem',
          },
          '50%': {
            height: '0.75rem',
          },
        },
        'gradient-foreground-1': {
          '0%, 16.667%, 100%': {
            opacity: 1,
          },
          '33.333%, 83.333%': {
            opacity: 0,
          },
        },
        'gradient-background-1': {
          '0%, 16.667%, 100%': {
            opacity: 0,
          },
          '25%, 91.667%': {
            opacity: 1,
          },
        },
        'gradient-foreground-2': {
          '0%, 100%': {
            opacity: 0,
          },
          '33.333%, 50%': {
            opacity: 1,
          },
          '16.667%, 66.667%': {
            opacity: 0,
          },
        },
        'gradient-background-2': {
          '0%, to': {
            opacity: 1,
          },
          '33.333%, 50%': {
            opacity: 0,
          },
          '25%, 58.333%': {
            opacity: 1,
          },
        },
        'gradient-foreground-3': {
          '0%, 50%, 100%': {
            opacity: 0,
          },
          '66.667%, 83.333%': {
            opacity: 1,
          },
        },
        'gradient-background-3': {
          '0%, 58.333%, 91.667%, 100%': {
            opacity: 1,
          },
          '66.667%, 83.333%': {
            opacity: 0,
          },
        },
      },
      animation: {
        'fade-text': '10s ease-in-out 3s 1 normal forwards running fade-away',
        shrink: 'shrink ease-in-out 1.5s infinite',
        expand: 'expand ease-in-out 1.5s infinite',
        'hue-animation': 'bg-hue-animation 10s infinite',
        'gradient-background-1': 'gradient-background-1 8s infinite',
        'gradient-foreground-1': 'gradient-foreground-1 8s infinite',
        'gradient-background-2': 'gradient-background-2 8s infinite',
        'gradient-foreground-2': 'gradient-foreground-2 8s infinite',
        'gradient-background-3': 'gradient-background-3 8s infinite',
        'gradient-foreground-3': 'gradient-foreground-3 8s infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
