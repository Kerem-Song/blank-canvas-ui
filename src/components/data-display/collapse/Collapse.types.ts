import { HTMLAttributes, ReactNode } from 'react';

export interface ICollapseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Collapse의 제목
   */
  label?: string | ReactNode;

  /**
   * Collpase의 key값
   */
  key?: string | number;

  /**
   * 클릭할 아이콘 노출 여부
   */
  showIcon?: boolean;

  /**
   * 노출 아이콘
   */
  expandIcon?: string;

  /**
   * 노출 아이콘의 위치
   * @default end
   */
  expandIconPosition?: 'start' | 'end';

  /**
   * 클릭 이후에 나오는 자식요소
   */
  children: ReactNode | ReactNode[];
}
