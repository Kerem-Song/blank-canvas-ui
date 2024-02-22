import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  root: '',
  titleCounterWrapper: 'title-counter-wrapper',
  normal: { root: '', sm: 'sm', md: 'md', lg: 'lg' },
  wrapped: { root: '', sm: 'sm', md: 'md', lg: 'lg' },
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
