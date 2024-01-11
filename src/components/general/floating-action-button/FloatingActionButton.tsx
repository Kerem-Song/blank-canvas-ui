import { Badge } from '@components/data-display/badge/Badge';
import { Tooltip } from '@components/data-display/tooltip/Tooltip';
import { useOutsideClick } from '@hooks';
import { generatePrefixClasses } from '@modules/utils';
import { remUtil } from '@modules/utils/rem';
import classNames from 'classnames';
import { forwardRef, useRef, useState } from 'react';

import { IFloatingActionButtonProps } from './FloatingActionButton.types';
import { floatingActionButtonClasses } from './FloatingActionButtonClasses';

export const FloatingActionButton = forwardRef<
  HTMLButtonElement,
  IFloatingActionButtonProps
>((args, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const floatingAtionButtonRef = useRef<HTMLDivElement>(null);
  const {
    className,
    prefix = 'bc',
    shape = 'circle',
    trigger = 'click',
    style,
    icon,
    description,
    right = 30,
    bottom = 50,
    closeIcon,
    menu,
    children,
    badge,
    useBadge = false,
    tooltip,
    callback,
    onOpenChange,
    ...buttonProps
  } = args;

  const classes = generatePrefixClasses(
    floatingActionButtonClasses,
    `${prefix ? `${prefix}-` : ''}floating-action-button`,
  );

  const rootClassName = classNames(
    classes.root,
    {
      // disabled
      [classes.disabled]: args['aria-disabled'],

      // shape
      [classes.circle]: args.shape === 'circle',
      [classes.square]: args.shape === 'square',

      // group menu trigger(hover or click)
      [classes.triggerClick]: args.trigger === 'click',
      [classes.triggerHover]: args.trigger === 'hover',
      [classes.badgeCounter]: args.useBadge === true,
    },
    className,
  );

  const handleClick = () => {
    if (trigger === 'click') {
      menu && setIsOpen(!isOpen);
      callback();
    }
  };

  const badgeCounter = menu?.reduce((sum, obj) => {
    return sum + Number(obj.badge?.count);
  }, 0);

  useOutsideClick(floatingAtionButtonRef, () => {
    setIsOpen(false);
  });

  return (
    <div
      className={classNames('bc-floating-action-button-wrapper wrapper', {
        open: isOpen,
        'bc-badge-counter': useBadge,
      })}
      style={{ right: `${remUtil.rem(right)}`, bottom: `${remUtil.rem(bottom)}` }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        trigger === 'hover' && menu && setIsOpen(false);
      }}
      ref={floatingAtionButtonRef}
      {...buttonProps}
    >
      {menu?.map((item, i) => (
        <Badge
          key={i}
          count={item.badge?.count}
          overflowCount={item.badge?.overflowCount}
          color={item.badge?.color}
          dot={item.badge?.dot}
          showZero={item.badge?.showZero}
          offset={[5, 10]}
        >
          <Tooltip
            description={item.tooltip ?? ''}
            disable={!item.tooltip}
            placement="left"
          >
            <div
              className={classNames(rootClassName, {
                'bc-hidden-menu': menu,
                open: isOpen,
              })}
            >
              <button
                className={classNames('bc-hidden-button')}
                onClick={item.callback}
                key={i}
              >
                <div
                  className="bc-icon"
                  style={{ backgroundImage: `url(${item.icon})` }}
                />
                <div className="bc-description">{item.description}</div>
              </button>
            </div>
          </Tooltip>
        </Badge>
      ))}
      <Badge
        count={badgeCounter}
        overflowCount={badge?.overflowCount}
        color={badge?.color}
        dot={badge?.dot}
        showZero={badge?.showZero}
        offset={[3, 10]}
      >
        <Tooltip description={tooltip ?? ''} disable={!tooltip} placement="left">
          <div
            className={rootClassName}
            onMouseEnter={(e) => {
              e.stopPropagation();
              trigger === 'hover' && menu && setIsOpen(true);
            }}
          >
            <button onClick={handleClick}>
              <div
                className="bc-icon"
                style={{ backgroundImage: isOpen ? `url(${closeIcon})` : `url(${icon})` }}
              />
              <div className="bc-description">{description}</div>
            </button>
          </div>
        </Tooltip>
      </Badge>
    </div>
  );
});
