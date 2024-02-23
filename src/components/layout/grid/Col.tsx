import { forwardRef } from 'react';
import classNames from 'classnames';

import { IColProps } from './Col.types';

export const Col = forwardRef<HTMLDivElement, IColProps>((args, ref) => {
  const { flex, span, order, children, style, paddingvalue, className, ...props } = args;
  const basis = span && span > 0 ? (span * 100) / 24 : 0;
  const basisValue = basis > 0 ? `0 0 ${basis}%` : 'none';
  const flexValue = flex
    ? flex === 'auto'
      ? `1 1 ${flex}`
      : typeof flex === 'string' && flex.search(/\s/) !== -1
        ? flex
        : typeof flex === 'number' || (typeof flex === 'string' && Number(flex))
          ? `${flex} ${flex} auto`
          : `0 0 ${flex}`
    : basisValue;
  const maxWidth = basis > 0 ? `${basis}%` : 'auto';
  return (
    <div
      ref={ref}
      {...props}
      className={classNames(className)}
      style={{
        display: span === 0 ? 'none' : 'block',
        maxWidth: maxWidth,
        flex: flexValue,
        padding: paddingvalue ? `0 ${paddingvalue}px` : '0',
        order,
      }}
    >
      <div style={{ ...style }} className={classNames('h-full')}>
        {children}
      </div>
    </div>
  );
});
