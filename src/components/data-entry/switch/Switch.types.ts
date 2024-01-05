import { InputHTMLAttributes } from 'react';

export interface ISwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 스위치 타입
   * @default outside
   */
  switchType?: 'outside' | 'inside';

  /**
   * 스위치의 사이즈
   * @default sm
   */
  switchSize?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 스위치 클릭 후 색상
   * @default green
   */
  color?: 'blue' | 'green';
}
