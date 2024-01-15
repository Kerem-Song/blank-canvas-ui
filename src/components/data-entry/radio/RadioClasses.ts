import { attachPrefixClasses } from '@modules/utils';

export const classes = {
  root: '',
  container: 'container',
  groupWrapper: 'gruop-wrapper',
} as const;

export const radioClasses = attachPrefixClasses(classes, 'radio', true);
