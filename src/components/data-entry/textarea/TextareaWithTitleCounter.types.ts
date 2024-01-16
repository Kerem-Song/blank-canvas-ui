import { ITextareaProps } from './Textarea.types';

export interface TitleCounterProps extends ITextareaProps {
  /**
   * Input의 title
   */
  label?: string;

  /**
   * Input title의 폰트 굵기(굵게/얇게)
   * @default false
   */
  isLight?: boolean;

  /**
   * Input에서 노출되는 title과 counter의 위치(label은 값이 없을 경우 노출되지 않음)
   * @type "top" | "bottom" | "inside"
   */
  direction?: 'top' | 'bottom' | 'inside';
}
