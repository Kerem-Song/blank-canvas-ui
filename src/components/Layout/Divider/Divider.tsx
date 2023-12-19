import classNames from 'classnames';

export interface IDividerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 선이 그어질 방향을 결정
   * @default 'horizontal'
   * @type string
   */
  type?: 'horizontal' | 'vertical';

  /**
   * css 속성 설정
   * `solid` `dotted` `dashed`
   * @default 'solid'
   * @type string
   */
  borderStyle?: React.CSSProperties['borderStyle'];
}

export const Divider = ({
  type,
  borderStyle,
  style,
  className,
  ...props
}: IDividerProps) => {
  return (
    <div
      {...props}
      className={classNames(
        type === 'vertical' ? 'divider-vertical' : 'divider',
        className,
      )}
      style={{ ...style, borderStyle: borderStyle }}
    ></div>
  );
};
