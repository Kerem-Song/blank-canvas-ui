import { attachPrefixClasses } from '@modules/utils';

const classes = {
  wrap: 'wrap',
  rounded: 'wrap-rounded',
  border: 'wrap-border',
  ['text-align']: {
    left: 'left',
    center: 'center',
    right: 'right',
  },
  size: {
    normal: 'normal',
    small: 'small',
  },
  sortable: 'sortable',
};

export const tableClasses = attachPrefixClasses(classes, 'table', true);
