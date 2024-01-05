import classNames from 'classnames';

import { IFlexProps } from './Flex.types';

export const Flex = ({
  vertical,
  wrap,
  justify,
  align,
  gap,
  children,
  reverse,
  style,
  className,
  ...props
}: IFlexProps) => {
  return (
    <div
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
};
