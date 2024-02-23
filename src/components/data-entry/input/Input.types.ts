import { InputHTMLAttributes, ReactNode } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input 높이 조절
   * sm: 미정
   * md: 32px
   * lg: 38px
   * @default md
   * @type "sm" | "md" | "lg"
   */
  controlSize?: 'sm' | 'md' | 'lg';

  /**
   * 숫자 카운터의 최대 길이('showCount' true일때만 확인 가능)
   *
   */
  maxLength?: number;

  /**
   * 숫자 카운터 노출 유무
   * @default false
   */
  showCount?: boolean;

  /**
   * Input의 검색창으로 쓰이는지 아닌지 유무
   * @type boolean
   * @default false
   */
  isSearch?: boolean;

  /**
   * Input에 입력된 글자 수 카운팅('showCount' true일때만 확인 가능)
   */
  textLength?: number;

  /**
   * Input의 에러 유무
   * @default false
   */
  isError?: boolean;

  /**
   * Input clear가능 여부
   * @default false
   */
  isClearable?: boolean;

  /**
   * Input이 항상 클리어 되는지 여부
   * @default false
   */
  isShowAlwaysClear?: boolean;

  /**
   * Input창 앞에 붙는 prefix(아이콘 혹은 기호 등)
   * @type ReactNode
   */
  customPrefix?: ReactNode;

  /**
   * Input창 뒤에 붙는 suffix(아이콘 혹은 기호 등)
   * @type ReactNode
   */
  suffix?: ReactNode;

  /**
   * Input에서 노출되는 title과 counter의 위치(label은 값이 없을 경우 노출되지 않음)
   * @type "top" | "bottom" | "inside"
   */
  direction?: 'top' | 'bottom' | 'inside';

  /**
   * 클릭했을 때 input: focus css 사용 여부
   */
  useFocus?: boolean;

  /**
   * Input border 사용 여부
   */
  useBorder?: boolean;

  /**
   * Input에서 Enter 입력 시 실행되는 함수
   * @param value
   * @returns
   */
  onPressEnter?: (value: string | undefined) => void;

  /**
   * Input이 search 모드일 때 실행되는 함수
   * @param value
   * @returns
   */
  onSearch?: (value: string | undefined) => void;

  /**
   * Input에서 esc누를 때 실행되는 함수
   * @returns
   */
  onPressEsc?: () => void;

  /**
   * Input이 clear될 경우 실행되는 함수
   * @returns
   */
  onClear?: () => void;
}
