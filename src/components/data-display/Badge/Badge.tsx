import classNames from 'classnames';

export interface IBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * badge 색상 적용
   * @default bg-rose-500
   * @type string
   */
  color?: string;
  /**
   * badge 내용 적용
   * @default
   * @type React.ReactNode
   */
  count?: React.ReactNode;
  /**
   * badge 대신 점으로 표현해서 사용하고 싶은 경우 사용
   * @default false
   * @type boolean
   */
  dot?: boolean;
  /**
   * badge의 위치를 왼쪽, 위쪽으로 옮길 수 있음
   * @default
   * @type [number | string, number | string]
   */
  offset?: [number | string, number | string];
  /**
   * 설정한 숫자를 넘길 경우, + 붙음
   * @default 99
   * @type number
   */
  overflowCount?: number;
  /**
   * count가 0인 경우 0을 보여줄지 선택 사항
   * @default false
   * @type boolean
   */
  showZero?: boolean;
  /**
   * component를 전달
   */
  children: React.ReactNode | React.ReactNode[];
}

export const Badge = ({
  color,
  count,
  dot,
  offset,
  overflowCount = 99,
  showZero,
  children,
  style,
  ...props
}: IBadgeProps) => {
  const division = Number.isNaN(count)
    ? Number(count?.toString().length)
    : Number(count?.toString().length);
  const digit = division < 2 ? 2 / 0.25 : division / 0.25;

  return (showZero && Number(count) === 0) ||
    Number(count) > 0 ||
    Number.isNaN(division) ? (
    <span {...props} className={classNames('base-badge-area')}>
      {children}
      {dot ? (
        <span
          className={classNames('base-dot-badge')}
          style={{
            ...style,
            right: offset !== undefined ? -offset[0] : -1,
            marginTop: offset !== undefined ? offset[1] : 0,
            background: color,
          }}
        ></span>
      ) : (
        <span
          className={classNames('base-badge', `-right-[${division}]`)}
          style={{
            ...style,
            right: offset !== undefined ? -offset[0] : -digit,
            marginTop: offset !== undefined ? offset[1] : 0,
            background: color,
          }}
        >
          <span className={classNames('align-middle')}>
            {typeof count === 'number' && overflowCount && overflowCount < count
              ? `${overflowCount}+`
              : count}
          </span>
        </span>
      )}
    </span>
  ) : (
    <span {...props} className={classNames('base-badge-area')}>
      {children}
    </span>
  );
};
