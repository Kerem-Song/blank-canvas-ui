import classNames from 'classnames';

export interface ICardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 카드의 타이틀 영역
   * @type React.ReactNode
   */
  title?: React.ReactNode;
  /**
   * 카드 타이틀 영역 오른쪽 영역
   * @type React.ReactNode
   */
  extra?: React.ReactNode;
  /**
   * 카드에 라운드를 줄지 선택
   * @default false
   * @type boolean
   */
  rounded?: boolean;
  /**
   * 카드 크기
   * @type 'small' | 'default'
   */
  size?: 'small' | 'default';
  /**
   * 타이틀 영역 색상
   * @type string
   */
  titleBgColor?: string;
  /**
   * 타이틀 색상
   * @type string
   */
  titleColor?: string;
  /**
   * 카드 테두리선 선택 여부
   * @default false
   * @type boolean
   */
  bordered?: boolean;
  /**
   * component를 전달
   * @type React.ReactNode | React.ReactNode[]
   */
  children: React.ReactNode | React.ReactNode[];
}

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
  ...props
}: ICardProps) => {
  return (
    <div
      {...props}
      className={classNames(
        'card',
        { 'card-rounded': rounded },
        bordered ? 'card-border' : 'card-none-border',
      )}
    >
      <div
        className={classNames(
          { 'card-head': title || extra },
          { 'card-small': size === 'small' },
        )}
        style={{ backgroundColor: titleBgColor }}
      >
        <div
          className={classNames({ 'card-title': title })}
          style={{ color: titleColor }}
        >
          {title}
        </div>
        <div className={classNames({ 'card-extra': extra })}>{extra}</div>
      </div>
      <div className={classNames('card-body', { 'card-small': size === 'small' })}>
        {children}
      </div>
    </div>
  );
};
