import { InputHTMLAttributes } from 'react';

export interface ITextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  /**
   * 숫자 카운터의 최대 길이('showCount' true일때만 확인 가능)
   * @type number
   */
  maxLength?: number;

  /**
   * 숫자 카운터 노출 유무
   * @type boolean
   * @default false
   */
  showCount?: boolean;

  /**
   * Textarea의 최대 길이(길이 제한)
   * @type number
   */
  maxRows?: number;

  /**
   * Textarea의 최소 길이
   * @type number
   */
  minRows?: number;

  /**
   * Input의 에러 유무
   * @default false;
   */
  isError?: boolean;


  /**
   * Input에서 노출되는 title과 counter의 위치(label은 값이 없을 경우 노출되지 않음)
   * @type "top" | "bottom" | "inside"
   */
  direction?: 'top' | 'bottom' | 'inside';
}
