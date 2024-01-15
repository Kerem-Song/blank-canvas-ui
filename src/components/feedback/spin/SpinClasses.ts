import { attachPrefixClasses } from '@modules/utils';

const classes = {
  root: '',
  area: 'area',
  option: {
    fullScreen: 'fullscreen',
    bgColor: 'bgColor',
    hidden: 'hidden',
  },
  children: 'children',
  indicator: 'indicator',
  inline: 'inline',
};
export const spinClasses = attachPrefixClasses(classes, 'spin');

// const classes = {
//     root: '',
//     direction: {
//       vertical: 'vertical',
//       horizontal: 'horizontal',
//     },
//   };
