import classNames from 'classnames';
import React, { forwardRef, ReactNode } from 'react';

import { IRowProps } from './Row.types';

export const Row = forwardRef<HTMLDivElement, IRowProps>((args, ref) => {
  const {
    wrap = 'wrap',
    justify,
    gutter,
    align,
    children,
    style,
    className,
    ...props
  } = args;

  const rowValue = Array.isArray(gutter) ? gutter[1] : gutter ? gutter : 0;
  const colValue = Array.isArray(gutter) ? gutter[0] / 2 : gutter ? gutter / 2 : 0;
  const addStyleChildren = React.Children.map<ReactNode, ReactNode>(children, (child) => {
    const element = child as React.ReactElement<any>;
    return React.cloneElement(element, {
      paddingvalue: colValue,
      className: classNames('bc-row-box-border'),
    });
  });

  return (
    <div
      ref={ref}
      {...props}
      className={classNames('bc-row-box-border', 'flex', className)}
      style={{
        ...style,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: align,
        rowGap: `${rowValue}px`,
        marginLeft: `-${colValue}px`,
        marginRight: `-${colValue}px`,
      }}
    >
      {addStyleChildren}
    </div>
  );
});
