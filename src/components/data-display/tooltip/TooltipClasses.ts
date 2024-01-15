import { attachPrefixClasses } from '@modules/utils';

const classes = {
  root: '',
  //   tooltip: {
  container: 'container',
  data: 'data',
  arrow: 'arrow',
  base: 'base',
  //   },

  //   tooltip:{
  //     root:'',
  //     arrow:'arrow',
  //     base:'base'
  //   }
  //   dot: 'dot',
  //   area: {
  //     root: '',
  //     align: 'align',
  //   },
};
export const tooltipClasses = attachPrefixClasses(classes, 'tooltip');
