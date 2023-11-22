import { Button, Divider } from '@components';
import classNames from 'classnames';
import { DOMAttributes, ReactNode, useState } from 'react';

export interface ICollapseProps extends DOMAttributes<HTMLDivElement> {
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

export const Collapse = ({
  label,
  key,
  showIcon,
  expandIcon,
  expandIconPosition,
  children,
}: ICollapseProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const expandIconClass = classNames('expand-icon', { expand: isCollapsed });
  const childrenClass = classNames('children', { invisible: isCollapsed });
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="collapse-wrapper" key={key}>
      <div className="header" onClick={handleCollapse} role="presentation">
        {showIcon && expandIcon && expandIconPosition === 'start' ? (
          <Button shape="ghost" className={expandIconClass}>
            <img src={expandIcon} alt="expand-icon" />
          </Button>
        ) : null}
        <div className="label">
          <span className="label-content">{label}</span>
        </div>
        {showIcon && expandIcon && expandIconPosition === 'end' ? (
          <Button shape="ghost" className={expandIconClass}>
            <img src={expandIcon} alt="expand-icon" />
          </Button>
        ) : null}
      </div>
      <Divider style={{ margin: '0' }} />

      <div className={childrenClass} data-collapsed={isCollapsed}>
        {children}
      </div>
    </div>
  );
};
