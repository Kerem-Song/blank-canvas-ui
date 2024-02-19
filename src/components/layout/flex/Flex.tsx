import { forwardRef } from 'react';
import classNames from 'classnames';

import { IFlexProps } from './Flex.types';

export const Flex = forwardRef<HTMLDivElement, IFlexProps>((args, ref) => {
  const {
    vertical,
    wrap,
    justify = 'normal',
    align = 'normal',
    gap,
    children,
    reverse,
    style,
    className,
    ...props
  } = args;

  return (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'flex',
        vertical
          ? reverse
            ? 'flex-col-reverse'
            : 'flex-col'
          : reverse
            ? 'flex-row-reverse'
            : 'flex-row',
        className,
      )}
      style={{
        ...style,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: align,
        gap,
      }}
    >
      {children}
    </div>
  );
});
