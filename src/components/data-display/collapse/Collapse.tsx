import { useState } from 'react';
import { Button } from '@components/general/button/Button';
import { Divider } from '@components/layout/divider/Divider';
import classNames from 'classnames';

import { ICollapseProps } from './Collapse.types';
import { collapseClasses } from './CollapseClasses';

import '../../../styles/collapse.css';

export const Collapse = ({
  label,
  key,
  showIcon = false,
  expandIcon,
  expandIconPosition = 'end',
  children,
  className,
}: ICollapseProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const expandIconClass = classNames(collapseClasses.header.expandIcon, {
    expand: isCollapsed,
  });
  const childrenClass = classNames(collapseClasses.children, { invisible: isCollapsed });
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const rootClassName = classNames(collapseClasses.root, {}, className);

  return (
    <div className={rootClassName} key={key}>
      <div
        className={collapseClasses.header.root}
        onClick={handleCollapse}
        role="presentation"
      >
        {showIcon && expandIcon && expandIconPosition === 'start' ? (
          <Button variant="text" className={expandIconClass}>
            <img src={expandIcon} alt="expand-icon" />
          </Button>
        ) : null}
        <div className={collapseClasses.header.label.root}>
          <span className={collapseClasses.header.label.content}>{label}</span>
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
