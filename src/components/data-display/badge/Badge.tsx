import classNames from 'classnames';
import { util } from 'src/utils/utils';

import { IBadgeProps } from './Badge.types';

export const Badge = ({
  color,
  count,
  dot,
  offset,
  overflowCount = 99,
  showZero,
  direction = 'right',
  size = 10,
  children,
  style,
  className,
  ...props
}: IBadgeProps) => {
  const division = Number.isNaN(count)
    ? Number(count?.toString().length)
    : Number(count?.toString().length);
  const digit = division < 2 ? 2 / 0.25 : division / 0.25;
  const tmpSize = typeof size !== 'number' ? Number(size.replace(/[^0-9]/g, '')) : size;
  const baseSize = 10;
  const fontSize = tmpSize > baseSize ? `${util.rem(tmpSize)}` : `${util.rem(baseSize)}`;
  const circle = tmpSize > baseSize ? `${tmpSize / 32}rem` : `${baseSize / 32}rem`;

  return (showZero && Number(count) === 0) ||
    Number(count) > 0 ||
    Number.isNaN(division) ? (
    <span {...props} className={classNames('badge-area')}>
      {children}
      {dot ? (
        <span
          className={classNames('badge-dot', className)}
          style={{
            ...style,
            width: circle,
            height: circle,
            right:
              direction !== 'left' ? (offset !== undefined ? -offset[0] : -2) : undefined,
            left:
              direction === 'left' ? (offset !== undefined ? -offset[0] : -2) : undefined,
            marginTop: offset !== undefined ? offset[1] : 0,
            background: color,
          }}
        ></span>
      ) : (
        <span
          className={classNames('badge', className)}
          style={{
            ...style,
            fontSize,
            paddingLeft: circle,
            paddingRight: circle,
            right:
              direction !== 'left'
                ? offset !== undefined
                  ? -offset[0]
                  : -digit
                : undefined,
            left:
              direction === 'left'
                ? offset !== undefined
                  ? -offset[0]
                  : -digit
                : undefined,
            marginTop: offset !== undefined ? offset[1] : 0,
            background: color,
          }}
        >
          <span className={classNames('badge-align')}>
            {typeof count === 'number' && overflowCount && overflowCount < count
              ? `${overflowCount}+`
              : count}
          </span>
        </span>
      )}
    </span>
  ) : (
    <span {...props} className={classNames('badge-area')}>
      {children}
    </span>
  );
};
