import { attachPrefixClasses } from '@modules/utils';

const classes = {
  root: '',
  dot: 'dot',
  area: {
    root: '',
    align: 'align',
  },
};
export const badgeClasses = attachPrefixClasses(classes, 'badge');
