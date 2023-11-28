import IndeterminateRoundedIcon from '@assets/icons/ic_checkbox_indeterminate_rounded.svg?react';
import OutlineBlankRoundedIcon from '@assets/icons/ic_checkbox_outline_blank_rounded.svg?react';
import CheckboxRoundedIcon from '@assets/icons/ic_checkbox_rounded.svg?react';
import { useControlled } from '@hooks/useControlled';
import { composeRef, generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import React, { useId } from 'react';

import { CheckboxProps } from './Checkbox.types';
import { checkboxClasses } from './checkboxClasses';

const defaultCheckedIcon = <CheckboxRoundedIcon />;
const defaultUncheckedIcon = <OutlineBlankRoundedIcon />;
const defaultIndeterminateIcon = <IndeterminateRoundedIcon />;

export const Checkbox = React.forwardRef(function Checkbox(
  props: CheckboxProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    checkedIcon = defaultCheckedIcon,
    uncheckedIcon = defaultUncheckedIcon,
    indeterminateIcon = defaultIndeterminateIcon,
    checked: checkedProps,
    defaultChecked,
    indeterminate,
    color = 'primary',
    disabled = false,
    id: idOverride,
    name,
    slotProps = {},
    size = 'sm',
    prefix,
    readOnly = false,
    required = false,
    label,
    onChange,
    ...other
  } = props;

  const defaultId = useId();
  const id = idOverride ?? defaultId;

  const [checked, setCheckedState] = useControlled({
    controlled: checkedProps,
    defaultValue: defaultChecked,
  });

  const classes = generatePrefixClasses(
    checkboxClasses,
    `${prefix ? `${prefix}-` : ''}checkbox`,
  );

  const rootSlot = slotProps.root ?? {};
  const checkboxSlot = slotProps.checkbox ?? {};
  const inputSlot = slotProps.input ?? {};
  const labelSlot = slotProps.label ?? {};

  const rootClassName = classNames(
    classes.root,
    {
      // checked
      [classes.checked]: checked,
      // indeterminate
      [classes.indeterminate]: indeterminate,
      // disabled
      [classes.disabled]: disabled,
      // color
      [classes.colorPrimary]: color === 'primary',
      [classes.colorSuccess]: color === 'success',
      [classes.colorSecondary]: color === 'secondary',
      [classes.colorError]: color === 'error',
      [classes.colorInfo]: color === 'info',
      [classes.colorWarning]: color === 'warning',
      [classes.colorDark]: color === 'dark',
      // size
      [classes.sizeSmall]: size === 'sm',
      [classes.sizeMedium]: size === 'md',
      [classes.sizeLarge]: size === 'lg',
    },
    rootSlot.className,
  );

  const inputRef = composeRef(inputSlot.ref, ref);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    setCheckedState(event.target.checked);
    onChange?.(event);
  };

  let icon = uncheckedIcon;

  if (checked) {
    icon = checkedIcon;
  } else if (indeterminate) {
    icon = indeterminateIcon;
  }

  return (
    <label {...rootSlot} className={rootClassName} htmlFor={id}>
      <span
        {...checkboxSlot}
        className={classNames(classes.checkbox, checkboxSlot.className)}
      >
        <input
          {...other}
          {...inputSlot}
          type="checkbox"
          ref={inputRef}
          id={id}
          name={name}
          checked={checked}
          className={classNames(classes.input, inputSlot.className)}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          {...(indeterminate && {
            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked#values
            'aria-checked': 'mixed',
          })}
          onChange={handleChange}
        />
        {icon}
      </span>
      {label && (
        <span className={classNames(classes.label, labelSlot.className)}>{label}</span>
      )}
    </label>
  );
});
