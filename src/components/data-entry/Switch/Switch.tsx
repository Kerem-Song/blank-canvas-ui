import { switchClasses } from '@components';
import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface ISwitchProps extends InputHTMLAttributes<HTMLInputElement> {
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

export const Switch = forwardRef<HTMLInputElement, ISwitchProps>((args, ref) => {
  const { prefix, className, switchSize = 'sm', color = 'green', ...switchProps } = args;
  const classes = generatePrefixClasses(
    switchClasses,
    `${prefix ? `${prefix}-` : ''}switch`,
  );

  const rootClassName = classNames(
    classes.root,

    className,
  );

  const switchBarClassName = classNames(
    'switch-bar',
    {
      // size
      [classes.sizeSmall]: switchSize === 'sm',
      [classes.sizeMedium]: switchSize === 'md',
      [classes.sizeLarge]: switchSize === 'lg',
      [classes.sizeXLarge]: switchSize === 'xl',

      // color
      [classes.blue]: color === 'blue',
      [classes.green]: color === 'green',
    },
    className,
  );

  return (
    <label className={classNames('switch-wrapper', rootClassName)}>
      <input
        id={args.id}
        type="checkbox"
        className="switch-input peer"
        ref={ref}
        checked={args.checked}
        onClick={(e) => e.stopPropagation()}
        onChange={args.onChange}
        disabled={args.disabled}
      />
      <label htmlFor={args.id} className="hidden" />
      <div className={switchBarClassName} />
    </label>
  );
});
