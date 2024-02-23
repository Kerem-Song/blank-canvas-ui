import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  root: '',
  border: 'border',
  wrapper: 'wrapper',
  titleCounterWrapper: 'title-counter-wrapper',
  counter: 'counter',
  label: 'label',
  children: 'children',
  insideWrapper: 'inside-wrapper',
  size: { root: '', sm: 'sm', md: 'md', lg: 'lg' },
} as const;

export const textareaClasses = attachPrefixClasses(classes, 'textarea', true);
