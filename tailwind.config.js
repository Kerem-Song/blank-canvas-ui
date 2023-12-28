/** @type {import('tailwindcss').Config} */

import { fontFamily } from 'tailwindcss/defaultTheme';

export const BASE_PIXEL = 16;
const pxToRem = (px, base = BASE_PIXEL) => `${px / base}rem`;
const rem = [...Array(2000).keys()].reduce((acc, px) => {
  acc[`${px}pxr`] = pxToRem(px);
  return acc;
}, {});

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#fefeff',
          100: '#f7f7fa',
          150: '#ededf0',
          200: '#dcdcdc',
          250: '#b5b4b4',
          300: '#929292',
          500: '#636364',
          600: '#494949',
          700: '#323232',
          800: '#272727',
          900: '#222222',
        },
        primary: {
          main: '#4478ff',
          light: '#a1bbff',
          dark: '#2659de',
        },
        secondary: {
          main: '#a855f7',
          light: '#c084fc',
          dark: '#7e22ce',
        },
        success: {
          main: '#03bf4e',
          light: '#1dfc76',
          dark: '#198602',
        },
        error: {
          main: '#ff4975',
          light: '#f398af',
          dark: '#f81f55',
        },
        info: {
          main: '#0288d1',
          light: '#03a9f4',
          dark: '#01579b',
        },
        warning: {
          main: '#ff8a00',
          light: '#ffcc80',
          dark: '#f57c00',
        },
      },
      spacing: {
        ...rem,
      },
      fontSize: {
        ...rem,
      },
      fontFamily: {
        pretendard: ['Pretendard', ...fontFamily.sans],
      },
      minWidth: {
        ...rem,
        200: '200px',
      },
      zIndex: {
        100: '100',
        999: '999',
      },
    },
  },
  plugins: [],
};
