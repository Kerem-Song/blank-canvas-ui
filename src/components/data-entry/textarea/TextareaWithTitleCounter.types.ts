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
}
