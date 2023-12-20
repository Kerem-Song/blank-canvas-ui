import classNames from 'classnames';
import { pxToRem } from 'src/utils/utils';

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
  children?: React.ReactNode | React.ReactNode[];
  /**
   * badge의 방향 설정
   * @default right
   * @type 'right' | 'left'
   */
  direction?: 'right' | 'left';
  /**
   * 크기 지정 가능 px을 rem 계산하여 적용
   * @default 10
   * @type number | string;
   */
  size?: number | string;
}

export const Badge = ({
  color,
  count,
  dot,
  offset,
  overflowCount = 99,
  showZero,
  direction = 'right',
  size = 10,
  children,
  style,
  className,
  ...props
}: IBadgeProps) => {
  const division = Number.isNaN(count)
    ? Number(count?.toString().length)
    : Number(count?.toString().length);
  const digit = division < 2 ? 2 / 0.25 : division / 0.25;
  const tmpSize = typeof size !== 'number' ? Number(size.replace(/[^0-9]/g, '')) : size;
  const baseSize = 10;
  const fontSize =
    tmpSize > baseSize ? `${pxToRem(tmpSize)}rem` : `${pxToRem(baseSize)}rem`;
  const circle =
    tmpSize > baseSize ? `${pxToRem(tmpSize) / 2}rem` : `${pxToRem(baseSize) / 2}rem`;
  console.log(fontSize, circle);
  return (showZero && Number(count) === 0) ||
    Number(count) > 0 ||
    Number.isNaN(division) ? (
    <span {...props} className={classNames('base-badge-area')}>
      {children}
      {dot ? (
        <span
          className={classNames('base-dot-badge', className)}
          style={{
            ...style,
            width: circle,
            height: circle,
            right:
              direction !== 'left' ? (offset !== undefined ? -offset[0] : -2) : undefined,
            left:
              direction === 'left' ? (offset !== undefined ? -offset[0] : -2) : undefined,
            marginTop: offset !== undefined ? offset[1] : 0,
            background: color,
          }}
        ></span>
      ) : (
        <span
          className={classNames('base-badge', className)}
          style={{
            ...style,
            fontSize,
            paddingLeft: circle,
            paddingRight: circle,
            right:
              direction !== 'left'
                ? offset !== undefined
                  ? -offset[0]
                  : -digit
                : undefined,
            left:
              direction === 'left'
                ? offset !== undefined
                  ? -offset[0]
                  : -digit
                : undefined,
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
