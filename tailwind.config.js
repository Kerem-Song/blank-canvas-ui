/** @type {import('tailwindcss').Config} */
const BASE_PIXEL = 16;
const pxToRem = (px, base = BASE_PIXEL) => `${px / base}rem`;
const rem = [...Array(5000).keys()].reduce((acc, px) => {
  acc[`${px}pxr`] = pxToRem(px);
  return acc;
}, {});

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      spacing: {
        ...rem,
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
