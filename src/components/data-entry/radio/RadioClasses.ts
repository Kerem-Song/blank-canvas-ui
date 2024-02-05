import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  root: '',
  container: 'container',
  groupWrapper: 'gruop-wrapper',
} as const;

export const radioClasses = attachPrefixClasses(classes, 'radio', true);
