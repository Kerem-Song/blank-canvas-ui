import { IInputProps } from './Input.types';

export interface IInputWithTitleCounterProps extends IInputProps {
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
