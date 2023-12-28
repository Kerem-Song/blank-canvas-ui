import parse from 'html-react-parser';

const BASE_PIXEL = 16;

export const util = {
  TriggerInputOnChange: (input: HTMLInputElement | null, value: string) => {
    if (!input) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    )?.set;

    nativeInputValueSetter?.call(input, value);
    const ev2 = new Event('input', { bubbles: true });
    input.dispatchEvent(ev2);
  },

  rem: (size: number, baseSize: number = BASE_PIXEL) => {
    return `${size / baseSize}rem`;
  },

  replaceKeywordMark: (text: string, keyword?: string, isStart = false) => {
    if (!keyword) {
      return text;
    }

    const escapeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/gi, '\\$&');

    return parse(
      text.replace(
        new RegExp(`${isStart ? '\\s|^' : ''}${escapeKeyword}`, 'gi'),
        (match) => {
          if (match) {
            return `<mark>${match}</mark>`;
          } else {
            return '';
          }
        },
      ),
    );
  },
};

export const pxToRem = (size: number) => {
  return size / 16;
};

export const findNumber = (size: string | number) => {
  if (typeof size === 'string') return Number(size.replace(/[^0-9]/g, ''));
  else if (typeof size === 'number') return size;
  else return 0;
};
