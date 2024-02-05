import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

const classes = {
  root: '',
  head: {
    root: '',
    title: 'title',
    extra: 'extra',
    rounded: 'rounded',
  },
  small: 'small',
  body: 'body',
  rounded: 'rounded',
  border: 'border',
  noneBorder: 'none-border',
  full: 'full',
};
export const cardClasses = attachPrefixClasses(classes, 'card');
