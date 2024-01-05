import 'react-loading-skeleton/dist/skeleton.css';

import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';

import { ICardProps } from './Card.types';

export const Card = ({
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
}: ICardProps) => {
  return (
    <div
      {...props}
      style={{ ...style }}
      className={classNames(
        'card',
        { 'card-rounded': rounded },
        bordered ? 'card-border' : 'card-none-border',
        className,
      )}
    >
      <div
        className={classNames(
          { 'card-head': title || extra },
          { 'card-small': size === 'small' },
          { 'card-head-rounded': rounded },
        )}
        style={{ backgroundColor: titleBgColor }}
      >
        {loading ? (
          <Skeleton className={classNames('card-full')} />
        ) : (
          <>
            <div
              className={classNames({ 'card-title': title })}
              style={{ color: titleColor }}
            >
              {title}
            </div>
            <div className={classNames({ 'card-extra': extra })}>{extra}</div>
          </>
        )}
      </div>
      <div className={classNames('card-body', { 'card-small': size === 'small' })}>
        {loading ? <Skeleton count={2} /> : children}
      </div>
    </div>
  );
};
