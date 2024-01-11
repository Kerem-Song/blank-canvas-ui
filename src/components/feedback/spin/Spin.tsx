import classNames from 'classnames';
import { forwardRef } from 'react';
import ReactLoading from 'react-loading';
import { util } from 'src/utils/utils';

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
  const tempWidth = typeof size !== 'number' ? util.findNumber(size) : size;
  const width = tempWidth > 34 ? tempWidth : 35;

  return (
    <div
      className={classNames(
        'bc-spin-area',
        { 'bc-spin-fullscreen': fullscreen },
        { 'bc-spin-bgColor': children },
        { 'bc-spin-hidden': !spinning && !children },
      )}
    >
      <div
        {...spinProps}
        className={classNames({ 'bc-spin-children': fullscreen || children }, 'bc-spin', {
          'bc-spin-hidden': !spinning && children,
        })}
      >
        {indicator ? (
          <span className={classNames('bc-spin-indicator')} style={{ ...style }}>
            {indicator}
          </span>
        ) : (
          <span
            style={{ ...style }}
            className={classNames({
              'bc-spin-inline': tip,
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
