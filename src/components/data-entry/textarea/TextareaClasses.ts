import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  root: '',
  border: 'border',
  wrapper: 'wrapper',
  titleCounterWrapper: 'title-counter-wrapper',
  counter: 'counter',
  label: 'label',
} as const;

export const textareaClasses = attachPrefixClasses(classes, 'textarea', true);
