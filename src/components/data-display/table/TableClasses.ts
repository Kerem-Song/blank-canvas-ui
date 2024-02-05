import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  wrap: 'wrap',
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
  empty: 'empty',
  loading: 'loading',
};

export const tableClasses = attachPrefixClasses(classes, 'table', true);
