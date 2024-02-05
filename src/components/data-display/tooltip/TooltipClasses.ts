import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

const classes = {
  root: '',
  container: 'container',
  data: 'data',
  arrow: 'arrow',
  base: 'base',
};
export const tooltipClasses = attachPrefixClasses(classes, 'tooltip');
