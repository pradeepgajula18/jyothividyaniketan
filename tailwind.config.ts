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
        school: {
          navy: {
            50: '#f0f4f9',
            100: '#dce5f1',
            200: '#bed0e6',
            300: '#94b3d6',
            400: '#6490c2',
            500: '#4373ae',
            600: '#325b93',
            700: '#294977',
            800: '#1b365d', // Official school navy
            900: '#142744',
            950: '#0b1626',
          },
          gold: {
            50: '#fdfbf0',
            100: '#f9f5dc',
            200: '#f4e9b8',
            300: '#ecd78a',
            400: '#e2bf5a',
            500: '#c59b27', // Official school gold
            600: '#b0831e',
            700: '#8c631a',
            800: '#734f1b',
            900: '#61421b',
          },
          red: {
            500: '#c41e3a',
            600: '#a3172e',
            700: '#851124',
          },
          green: {
            600: '#16a34a',
            700: '#15803d',
          }
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;

