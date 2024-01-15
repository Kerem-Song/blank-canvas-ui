import { attachPrefixClasses } from '@modules/utils';

const classes = {
  root: '',
  area: 'area',
  direction: {
    vertical: 'vertical',
    horizontal: 'horizontal',
  },
};
export const dividerClasses = attachPrefixClasses(classes, 'divider');
