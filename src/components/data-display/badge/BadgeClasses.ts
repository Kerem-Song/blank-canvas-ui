import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

const classes = {
  root: '',
  dot: 'dot',
  area: {
    root: '',
    align: 'align',
  },
};
export const badgeClasses = attachPrefixClasses(classes, 'badge');
