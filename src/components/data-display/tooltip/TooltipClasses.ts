import { attachPrefixClasses } from '@modules/utils';

const classes = {
  root: '',
  container: 'container',
  data: 'data',
  arrow: 'arrow',
  base: 'base',
};
export const tooltipClasses = attachPrefixClasses(classes, 'tooltip');
