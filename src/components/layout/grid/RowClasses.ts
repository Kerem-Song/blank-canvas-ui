import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

const classes = {
  root: '',
  boxBorder: 'box-border',
};
export const rowClasses = attachPrefixClasses(classes, 'row');
