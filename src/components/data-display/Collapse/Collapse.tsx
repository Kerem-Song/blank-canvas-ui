import { Button } from '@components/general/button/Button';
import { Divider } from '@components/Layout/Divider/Divider';
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

  const expandIconClass = classNames('expand-icon', { expand: isCollapsed });
  const childrenClass = classNames('children', { invisible: isCollapsed });
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="collapse-wrapper" key={key}>
      <div className="header" onClick={handleCollapse} role="presentation">
        {showIcon && expandIcon && expandIconPosition === 'start' ? (
          <Button variant="text" className={expandIconClass}>
            <img src={expandIcon} alt="expand-icon" />
          </Button>
        ) : null}
        <div className="label">
          <span className="label-content">{label}</span>
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
