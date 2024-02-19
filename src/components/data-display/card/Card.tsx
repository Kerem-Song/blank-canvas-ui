import { forwardRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';

import { ICardProps } from './Card.types';
import { cardClasses } from './CardClasses';

import 'react-loading-skeleton/dist/skeleton.css';

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

  const rootClassName = classNames(
    cardClasses.root,
    {
      [cardClasses.rounded]: rounded,
    },
    bordered ? cardClasses.border : cardClasses.noneBorder,
  );

  const headClassName = classNames({
    [cardClasses.head.root]: title || extra,
    [cardClasses.small]: size === 'small',
    [cardClasses.head.rounded]: rounded,
  });

  const bodyClassName = classNames(cardClasses.body, {
    [cardClasses.small]: size === 'small',
  });

  return (
    <div
      ref={ref}
      {...props}
      style={{ ...style }}
      className={classNames(rootClassName, className)}
    >
      <div
        className={classNames(headClassName)}
        style={{ backgroundColor: titleBgColor }}
      >
        {loading ? (
          <Skeleton className={classNames(cardClasses.full)} />
        ) : (
          title && (
            <>
              <div
                className={classNames({ [cardClasses.head.title]: title })}
                style={{ color: titleColor }}
              >
                {title}
              </div>
              <div className={classNames({ [cardClasses.head.extra]: extra })}>
                {extra}
              </div>
            </>
          )
        )}
      </div>
      <div className={bodyClassName}>{loading ? <Skeleton count={2} /> : children}</div>
    </div>
  );
});
