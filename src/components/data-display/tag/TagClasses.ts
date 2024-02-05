import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

const classes = {
  root: '',
  option: {
    pd: 'pd',
    inline: 'inline',
    icon: 'icon',
    close: 'close',
    hidden: 'hidden',
    bordered: 'bordered',
  },
};
export const tagClasses = attachPrefixClasses(classes, 'tag');
