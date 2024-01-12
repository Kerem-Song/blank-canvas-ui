import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { ITagProps } from './Tag.types';

export const Tag = ({
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
}: ITagProps) => {
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

  return (
    <>
      {showOptions ? (
        <span
          {...props}
          className={classNames(
            'bc-tag-area',
            { 'bc-tag-bordered': bordered },
            className,
          )}
          style={{
            ...style,
            backgroundColor: color,
            borderColor: color,
            color: color ? 'white' : 'auto',
          }}
        >
          <span
            {...props}
            className={classNames('bc-tag-pd', 'bc-tag-icon')}
            style={{ display: icon ? 'bc-tag-inline' : 'none' }}
          >
            {icon}
          </span>
          {children}
          <span
            {...props}
            className={classNames('bc-tag-close', 'bc-tag-pd')}
            onClick={onClose}
            ref={closeRef}
            style={{
              display: closeIcon ? 'bc-tag-inline' : 'none',
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
};
