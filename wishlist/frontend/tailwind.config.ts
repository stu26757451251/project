import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      gridTemplateRows: {
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '21': 'repeat(21, minmax(0, 1fr))'
      },
      gridRow: {
        'span-4': 'span 4 / span 4',
        'span-5': 'span 5 / span 5',
        'span-6': 'span 6 / span 6',
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-20': 'span 12 / span 12',
        'span-21': 'span 21 / span 21'
      },
      colors: {
        oasis: {
          '50': '#fff9eb',
          '100': '#fdecc8',
          '200': '#fbd88c',
          '300': '#f9bd50',
          '400': '#f7a428',
          '500': '#f1820f',
          '600': '#d55e0a',
          '700': '#b13f0c',
          '800': '#903210',
          '900': '#762a11',
          '950': '#441204'
        },
        'curious-blue': {
          '50': '#f4f7fb',
          '100': '#e8eff6',
          '200': '#ccdeeb',
          '300': '#9fc2da',
          '400': '#5b97bd',
          '500': '#4986ae',
          '600': '#376c92',
          '700': '#2e5776',
          '800': '#294a63',
          '900': '#273f53',
          '950': '#1a2937'
        },
        cinnabar: {
          '50': '#fdf4f3',
          '100': '#fce6e4',
          '200': '#fad2ce',
          '300': '#f6b2ab',
          '400': '#ee867b',
          '500': '#e15344',
          '600': '#cf4233',
          '700': '#ae3427',
          '800': '#902e24',
          '900': '#782c24',
          '950': '#41130e'
        }
      }
    }
  },
  plugins: []
}
export default config
