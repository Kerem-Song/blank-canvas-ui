import classNames from 'classnames';

import { IDividerProps } from './Divider.types';

export const Divider = ({
  type,
  borderStyle,
  style,
  className,
  ...props
}: IDividerProps) => {
  return (
    <div
      {...props}
      className={classNames(
        type === 'vertical' ? 'divider-vertical' : 'divider',
        className,
      )}
      style={{ ...style, borderStyle: borderStyle }}
    ></div>
  );
};
