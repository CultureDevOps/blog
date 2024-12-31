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
      backgroundImage: {
        'image': "url('/static/images/assets/background-hexagonal-01-light.svg')",
      },      
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', ...fontFamily.sans],
        headings: ['var(--font-roboto-slab)'],
        logo: ['var(--font-alfa-slab-one)'],   
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
            'h1,h2,h3,h4,h5,h6': {
              fontFamily: theme('fontFamily.headings'), 
              textShadow: '2px 2px 4px rgba(156, 163, 175, 0.8)',
            },
            code: {
              color: theme('colors.indigo.600'),
            },
            hr: {
              borderColor: theme('colors.gray.200'), // Séparateur en mode clair
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
              fontFamily: theme('fontFamily.headings'), 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
            },
            hr: {
              borderColor: theme('colors.gray.700'), // Séparateur en mode sombre
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
  plugins: [
    require('@tailwindcss/forms'), 
    require('@tailwindcss/typography'),
    require("@designbycode/tailwindcss-text-shadow")({
      shadowColor: "rgba(0, 0, 0, 0.8)",
      shadowBlur: "3px",
      shadowOffsetX: "2px",
      shadowOffsetY: "2px",
     }),
  ],
}
