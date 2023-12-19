import classNames from 'classnames';

export interface ITagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 태그 안에 넣을 아이콘
   * @default null
   * @type ReactNode
   */
  icon?: React.ReactNode;
  /**
   * 태그 색상 설정 (글자색 하얀색)
   * @default ''
   * @type string
   */
  color?: string;
  /**
   * 태그 끝에 x 아이콘 추가할지 여부
   * 색상 변경시 글자색은 하얀색
   * @default false
   * @type React.ReactNode
   */
  closeIcon?: React.ReactNode;
  /**
   * 태그 테두리 여부
   * @default true
   * @type boolean
   */
  bordered?: boolean;
  /**
   * close 아이콘을 클릭했을 때 이벤트
   * @type (e)=>void
   */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * component를 전달
   * @type React.ReactNode | React.ReactNode[]
   */
  children: React.ReactNode | React.ReactNode[];
}

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
        style={{ display: icon ? 'inline-block' : 'none' }}
      >
        {icon}
      </span>
      {children}
      <span
        {...props}
        className={classNames('tag-close', 'tag-pd')}
        onClick={onClose}
        style={{
          display: closeIcon ? 'inline-block' : 'none',
          color: color ? 'white' : 'auto',
        }}
      >
        {closeIcon !== true ? closeIcon : <>&#88;</>}
      </span>
    </span>
  );
};
