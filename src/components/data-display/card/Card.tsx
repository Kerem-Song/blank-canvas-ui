import 'react-loading-skeleton/dist/skeleton.css';

import classNames from 'classnames';
import { forwardRef } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ICardProps } from './Card.types';

export const Card = forwardRef<HTMLDivElement, ICardProps>((args, ref) => {
  const {
    title,
    extra,
    size,
    titleBgColor,
    titleColor,
    rounded,
    bordered = true,
    children,
    style,
    className,
    loading,
    ...props
  } = args;
  return (
    <div
      ref={ref}
      {...props}
      style={{ ...style }}
      className={classNames(
        'bc-card',
        { 'bc-card-rounded': rounded },
        bordered ? 'bc-card-border' : 'bc-card-none-border',
        className,
      )}
    >
      <div
        className={classNames(
          { 'bc-card-head': title || extra },
          { 'bc-card-small': size === 'small' },
          { 'bc-card-head-rounded': rounded },
        )}
        style={{ backgroundColor: titleBgColor }}
      >
        {loading ? (
          <Skeleton className={classNames('bc-card-full')} />
        ) : (
          <>
            <div
              className={classNames({ 'bc-card-title': title })}
              style={{ color: titleColor }}
            >
              {title}
            </div>
            <div className={classNames({ 'bc-card-extra': extra })}>{extra}</div>
          </>
        )}
      </div>
      <div className={classNames('bc-card-body', { 'bc-card-small': size === 'small' })}>
        {loading ? <Skeleton count={2} /> : children}
      </div>
    </div>
  );
});
