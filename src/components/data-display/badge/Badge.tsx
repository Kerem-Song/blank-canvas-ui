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
  const division = Number.isNaN(count) ? 0 : Number(count?.toString().length);
  const cipher = 0.25;
  let overflowDivision = 2;
  if (overflowCount !== 99) {
    overflowDivision = overflowCount.toString().length;
  }
  let tmp = overflowDivision;
  if (Number(count) >= 0 && Number(count) > overflowCount) {
    tmp += 1;
  } else {
    tmp = division;
  }
  const digit = tmp < 2 ? 2 / cipher : tmp == 2 ? (tmp + 1) / cipher : tmp / cipher;
  const tmpSize = typeof size !== 'number' ? Number(size.replace(/[^0-9]/g, '')) : size;
  const baseSize = 10;
  const fontSize = tmpSize > baseSize ? `${util.rem(tmpSize)}` : `${util.rem(baseSize)}`;
  const circle = tmpSize > baseSize ? `${tmpSize / 32}rem` : `${baseSize / 32}rem`;

  return (showZero && Number(count) === 0) || Number(count) > 0 || dot ? (
    <span {...props} className={classNames('bc-badge-area')}>
      {children}
      {dot ? (
        <span
          className={classNames('bc-badge-dot', className)}
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
          className={classNames('bc-badge', className)}
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
          <span className={classNames('bc-badge-align')}>
            {typeof count === 'number' && overflowCount && overflowCount < count
              ? `${overflowCount}+`
              : count}
          </span>
        </span>
      )}
    </span>
  ) : (
    <span {...props} className={classNames('bc-badge-area')}>
      {children}
    </span>
  );
};
