const BASE_PIXEL = 16;

export const remUtil = {
  rem: (size: number, baseSize: number = BASE_PIXEL) => {
    return `${size / baseSize}rem`;
  },

  findNumber: (size: string | number) => {
    if (typeof size === 'string') return Number(size.replace(/[^0-9]/g, ''));
    else if (typeof size === 'number') return size;
    else return 0;
  },
};
