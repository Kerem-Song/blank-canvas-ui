export interface IconContainerProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
}

export interface RatingProps
  extends Pick<React.HTMLAttributes<HTMLSpanElement>, 'className' | 'style'> {
  /**
   * Rating 정밀도, 증가 또는 감소 값.
   * @default 1
   */
  precision?: number;
  /**
   * 최대 Rating 값.
   * @default 5
   */
  max?: number;
  /**
   * Radio `input` 요소의 이름 속성값으로 양식 내에서 고유한 값.
   */
  name?: string;
  /**
   * 읽기전용 여부
   * `true` 인 경우 모든 hover 및 focus event 제거.
   * @default false
   */
  readOnly?: boolean;
  /**
   * 비활성화 여부.
   * @default false
   */
  disabled?: boolean;
  /**
   * `true`인 경우 선택한 아이콘만 강조.
   * @default false
   */
  highlightSelectedOnly?: boolean;
  /**
   * 아이콘 사이즈.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | number;
  /**
   * Rating 기본값. 비제어 컴포넌트일때 사용.
   * @default null
   */
  defaultValue?: number;
  /**
   * Rating 값.
   */
  value?: number | null;
  /**
   * 비어있을 때 표시되는 아이콘.
   * @default <StarBorderIcon size="24" />
   */
  emptyIcon?: React.ReactNode;
  /**
   * 채워졌을 때 표시되는 아이콘.
   * @default <StarIcon size="24" />
   */
  filledIcon?: React.ReactNode;
  /**
   * 아이콘을 포함하는 컴포넌트.
   * @default function IconContainer(props) {
   *   const { value, ...other } = props;
   *   return <span {...other} />;
   * }
   */
  IconContainerComponent?: React.ElementType<IconContainerProps>;
  /**
   * 값이 변경되면 호출할 콜백함수.
   * @param {React.SyntheticEvent} event 콜백 이벤트
   * @param {number|null} value 새로운값
   */
  onChange?: (e: React.SyntheticEvent, value: number | null) => void;
}
