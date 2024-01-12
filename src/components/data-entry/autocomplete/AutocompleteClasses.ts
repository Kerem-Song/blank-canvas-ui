import { attachPrefixClasses } from '@modules/utils';

export const classes = {
  root: '',
  input: 'input',
  container: 'container',
  list: { root: 'list', focused: 'list-focused', itemName: 'list-items-name' },
} as const;

export const autoCompleteClasses = attachPrefixClasses(classes, 'autocomplete');
