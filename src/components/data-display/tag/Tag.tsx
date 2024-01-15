import classNames from 'classnames';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { ITagProps } from './Tag.types';
import { tagClasses } from './TagClasses';

export const Tag = forwardRef<HTMLSpanElement, ITagProps>((args, ref) => {
  const {
    icon,
    color,
    closeIcon,
    bordered = true,
    onClose,
    children,
    style,
    className,
    visible,
    ...props
  } = args;
  const [showOptions, setShowOptions] = useState<boolean>(true);

  const closeRef = useRef<HTMLSpanElement>(null);
  const close = (e: Event) => {
    if (e.defaultPrevented) {
      return;
    }
    const temp = e.target as HTMLElement;
    if (closeRef.current && closeRef.current.contains(temp)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', close);
    return () => {
      window.removeEventListener('click', close);
    };
  }, []);

  const rootClassName = classNames(tagClasses.root, {
    [tagClasses.option.bordered]: bordered,
  });

  const iconClassName = classNames(
    tagClasses.option.pd,
    tagClasses.option.icon,
    icon ? [tagClasses.option.inline] : [tagClasses.option.hidden],
  );

  const closeClassName = classNames(
    tagClasses.option.close,
    tagClasses.option.pd,
    closeIcon ? [tagClasses.option.inline] : [tagClasses.option.hidden],
  );

  return (
    <>
      {showOptions ? (
        <span
          ref={ref}
          {...props}
          className={classNames(rootClassName, className)}
          style={{
            ...style,
            backgroundColor: color,
            borderColor: color,
            color: color ? 'white' : 'auto',
          }}
        >
          <span {...props} className={classNames(iconClassName)}>
            {icon}
          </span>
          {children}
          <span
            {...props}
            className={classNames(closeClassName)}
            onClick={onClose}
            ref={closeRef}
            style={{
              color: color ? 'white' : 'auto',
            }}
          >
            {closeIcon !== true ? closeIcon : <>&#88;</>}
          </span>
        </span>
      ) : (
        <></>
      )}
    </>
  );
});
