import { attachPrefixClasses } from '@modules/utils';

const classes = {
  root: '',
  input: 'input',
  container: 'container',
  list: { root: '', focused: 'focused', itemName: 'items-name' },
} as const;

export const autoCompleteClasses = attachPrefixClasses(classes, 'autocomplete', true);
