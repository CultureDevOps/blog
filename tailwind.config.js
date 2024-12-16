// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.blue,
        heading: colors.blue,
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.700'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
            hr: {
              borderColor: theme('colors.gray-300'), // Séparateur en mode clair
              borderTopWidth: '2px',
            },
            'ul li::marker': {
              color: theme('colors.black'), // Couleur des bullet points
            },         
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.300'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            hr: {
              borderColor: theme('colors.gray-700'), // Séparateur en mode sombre
              borderTopWidth: '1px',
            },
            'ul li::marker': {
              color: theme('colors.gray.100'), // Couleur des bullet points
            },     
            code: {
              color: theme('colors.violet.400'),
            },     
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
