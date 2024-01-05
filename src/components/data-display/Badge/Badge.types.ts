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
   * 최소값 10 그보다 작으면 적용안됨
   * @default 10
   * @type number | string;
   */
  size?: number | string;
}
