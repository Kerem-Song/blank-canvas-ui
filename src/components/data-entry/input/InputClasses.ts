import { attachPrefixClasses } from '@modules/utils';

export const classes = {
  root: '',
  titleCounterWrapper: 'title-counter-wrapper',
  normal: 'normal',
  wrapped: 'wrapped',
  button: {
    root: '',
    search: 'search',
    clear: 'clear',
  },
  counter: 'counter',
  label: 'label',
  prefixWrapper: 'prefix-wrapper',
  suffixWrapper: 'suffix-wrapper',
  count: 'count',
  clear: 'clear',
  hasCustomPrefix: 'has-custom-prefix',
  required: 'required',
} as const;

export const inputClasses = attachPrefixClasses(classes, 'input', true);
