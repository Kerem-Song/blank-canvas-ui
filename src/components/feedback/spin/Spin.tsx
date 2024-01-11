import { remUtil } from '@modules/utils/rem';
import classNames from 'classnames';
import { forwardRef } from 'react';
import ReactLoading from 'react-loading';

import { ISpinProps } from './Spin.types';

export const Spin = forwardRef<HTMLElement, ISpinProps>((props, ref) => {
  const {
    delay,
    indicator,
    type = 'spinningBubbles',
    tip,
    color = 'gray',
    fullscreen,
    className,
    style,
    size = 35,
    spinning = true,
    children,
    ...spinProps
  } = props;
  const tempWidth = typeof size !== 'number' ? remUtil.findNumber(size) : size;
  const width = tempWidth > 34 ? tempWidth : 35;

  return (
    <div
      className={classNames(
        'spin-area',
        { 'spin-fullscreen': fullscreen },
        { 'spin-bgColor': children },
        { 'spin-hidden': !spinning && !children },
      )}
    >
      <div
        {...spinProps}
        className={classNames({ 'spin-children': fullscreen || children }, 'spin', {
          'spin-hidden': !spinning && children,
        })}
      >
        {indicator ? (
          <span className={classNames('spin-indicator')} style={{ ...style }}>
            {indicator}
          </span>
        ) : (
          <span
            style={{ ...style }}
            className={classNames({
              'spin-inline': tip,
            })}
          >
            <ReactLoading
              type={type}
              color={color}
              height={width}
              width={width}
              delay={delay}
            />
          </span>
        )}
        {tip !== undefined && <div>{tip}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
});
