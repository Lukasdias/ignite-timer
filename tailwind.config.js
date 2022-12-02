/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      grayscale: {
        white: '#ffffff',
        title: '#e1e1e6',
        text: '#c4c4cc',
        label: '#8d8d99',
        placeholder: '#7c7c8a',
        divider: '#323238',
        elements: '#202024',
        background: '#121214'
      },
      brand: {
        light: '#00b37e',
        principal: '#00875f',
        dark: '#015f43'
      },
      error: {
        text: '#f03847',
        assets: '#cc2937'
      }
    },
    fontSize: {
      base: '0.75rem',
      lg: '0.875rem',
      xl: '1rem',
      '2xl': '1.125rem',
      '3xl': '1.5rem'
    },
    fontFamily: {
      sans: ['Roboto Mono', 'sans-serif'],
      serif: ['Roboto Mono', 'sans-serif'],
      mono: ['Roboto Mono', 'sans-serif']
    },
    borderRadius: {
      none: '0',
      xs: '0.1875rem',
      sm: '0.3125rem',
      default: '0.375rem',
      lg: '0.5rem',
      xl: '0.6230425238609314rem',
      '2xl': '1.25rem',
      full: '9999px'
    },
    extend: {}
  },
  plugins: []
}
