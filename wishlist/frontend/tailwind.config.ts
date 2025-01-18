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
        // Simple 20 row grid
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
        }
      }
    }
  },
  plugins: []
}
export default config
