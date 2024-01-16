import parse from 'html-react-parser';

export const inputUtil = {
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
