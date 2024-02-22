import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  root: '',
  input: 'input',
  container: 'container',
  list: {
    root: '',
    focused: 'focused',
    itemName: 'items-name',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
  },
} as const;

export const autoCompleteClasses = attachPrefixClasses(classes, 'autocomplete', true);
