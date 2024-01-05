import classNames from 'classnames';

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
  ...props
}: ITagProps) => {
  return (
    <span
      {...props}
      className={classNames('tag-area', { 'tag-bordered': bordered }, className)}
      style={{
        ...style,
        backgroundColor: color,
        borderColor: color,
        color: color ? 'white' : 'auto',
      }}
    >
      <span
        {...props}
        className={classNames('tag-pd')}
        style={{ display: icon ? 'tag-inline' : 'none' }}
      >
        {icon}
      </span>
      {children}
      <span
        {...props}
        className={classNames('tag-close', 'tag-pd')}
        onClick={onClose}
        style={{
          display: closeIcon ? 'tag-inline' : 'none',
          color: color ? 'white' : 'auto',
        }}
      >
        {closeIcon !== true ? closeIcon : <>&#88;</>}
      </span>
    </span>
  );
};
