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
};

export const pxToRem = (size: number) => {
  return size / 16;
};
