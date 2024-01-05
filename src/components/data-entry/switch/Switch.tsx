import { Flex } from '@components/Layout/Flex/Flex';
import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import { forwardRef } from 'react';

import { ISwitchProps } from './Switch.types';
import { switchClasses } from './SwitchClasses';

export const Switch = forwardRef<HTMLInputElement, ISwitchProps>((args, ref) => {
  const {
    prefix,
    className,
    switchType = 'outside',
    switchSize = 'sm',
    color = 'green',
    ...switchProps
  } = args;
  const classes = generatePrefixClasses(
    switchClasses,
    `${prefix ? `${prefix}-` : ''}switch`,
  );

  const rootClassName = classNames(
    classes.root,
    {
      // type {
      [classes.inside]: switchType === 'inside',
      [classes.outside]: switchType === 'outside',
    },
    className,
  );
  const switchBarClassName = classNames(
    'switch-bar',
    {
      // size
      [classes.sizeSmall]: switchSize === 'sm',
      [classes.sizeMedium]: switchSize === 'md',
      [classes.sizeLarge]: switchSize === 'lg',
      [classes.sizeXLarge]: switchSize === 'xl',

      // color
      [classes.blue]: color === 'blue',
      [classes.green]: color === 'green',
    },
    className,
  );

  return (
    <Flex vertical>
      <label className={classNames('switch-wrapper', rootClassName)}>
        <input
          id={args.id}
          type="checkbox"
          className="switch-input peer"
          ref={ref}
          checked={args.checked}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={args.onChange}
          disabled={args.disabled}
          {...switchProps}
        />
        <label htmlFor={args.id} className="hidden" />
        <div className={switchBarClassName} />
      </label>
    </Flex>
  );
});
