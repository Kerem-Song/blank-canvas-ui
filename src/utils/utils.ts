export const util = {
  TriggerInputOnChange: (input: HTMLInputElement | null, value: string) => {
    if (!input) {
      return;
    }
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    )?.set;
    nativeInputValueSetter?.call(input, value);
    const ev2 = new Event('input', { bubbles: true });
    input.dispatchEvent(ev2);
  },
};
