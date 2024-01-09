import { Button } from '@components/general/button/Button';
import { Divider } from '@components/layout/divider/Divider';
import classNames from 'classnames';
import { useState } from 'react';

import { ICollapseProps } from './Collapse.types';

export const Collapse = ({
  label,
  key,
  showIcon = false,
  expandIcon,
  expandIconPosition = 'end',
  children,
}: ICollapseProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const expandIconClass = classNames('bc-expand-icon', { expand: isCollapsed });
  const childrenClass = classNames('bc-children', { invisible: isCollapsed });
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bc-collapse-wrapper" key={key}>
      <div className="bc-header" onClick={handleCollapse} role="presentation">
        {showIcon && expandIcon && expandIconPosition === 'start' ? (
          <Button variant="text" className={expandIconClass}>
            <img src={expandIcon} alt="expand-icon" />
          </Button>
        ) : null}
        <div className="bc-label">
          <span className="bc-label-content">{label}</span>
        </div>
        {showIcon && expandIcon && expandIconPosition === 'end' ? (
          <Button variant="text" className={expandIconClass}>
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
