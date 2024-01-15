import { remUtil } from '@modules/utils/rem';
import classNames from 'classnames';
import { forwardRef } from 'react';
import ReactLoading from 'react-loading';

import { ISpinProps } from './Spin.types';
import { spinClasses } from './SpinClasses';

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

  const rootClassName = classNames(spinClasses.area, {
    [spinClasses.option.fullScreen]: fullscreen,
    [spinClasses.option.bgColor]: children,
    [spinClasses.option.hidden]: !spinning && !children,
  });

  const defaultClassName = classNames({
    [spinClasses.inline]: tip,
  });

  const indicatorClassName = classNames(spinClasses.indicator);

  const childrenClassName = classNames(spinClasses.root, {
    [spinClasses.children]: fullscreen || children,
    [spinClasses.option.hidden]: !spinning && children,
  });

  return (
    <div className={classNames(rootClassName, className)}>
      <div {...spinProps} className={classNames(childrenClassName)}>
        {indicator ? (
          <span className={classNames(indicatorClassName)} style={{ ...style }}>
            {indicator}
          </span>
        ) : (
          <span style={{ ...style }} className={classNames(defaultClassName)}>
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
