import { forwardRef } from 'react';
import { Flex } from '@components/layout/flex';
import classNames from 'classnames';

import { ISwitchProps } from './Switch.types';
import { switchClasses } from './SwitchClasses';

export const Switch = forwardRef<HTMLInputElement, ISwitchProps>((args, ref) => {
  const {
    className,
    switchType = 'outside',
    switchSize = 'sm',
    color = 'green',
    ...switchProps
  } = args;

  const rootClassName = classNames(
    switchClasses.root,
    switchClasses.wrapper,
    {
      // shape
      [switchClasses.shape.inside]: switchType === 'inside',
      [switchClasses.shape.outside]: switchType === 'outside',
    },
    className,
  );
  const switchBarClassName = classNames(
    switchClasses.bar,
    {
      // size
      [switchClasses.size.small]: switchSize === 'sm',
      [switchClasses.size.medium]: switchSize === 'md',
      [switchClasses.size.large]: switchSize === 'lg',
      [switchClasses.size.xLarge]: switchSize === 'xl',

      // color
      [switchClasses.color.blue]: color === 'blue',
      [switchClasses.color.green]: color === 'green',
    },
    className,
  );

  return (
    <Flex align="center">
      <label className={classNames(rootClassName)}>
        <input
          id={args.id}
          type="checkbox"
          className={`${switchClasses.input} peer`}
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
