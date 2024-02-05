import '@styles/checkbox.css';

import IndeterminateRoundedIcon from '@assets/icons/ic_checkbox_indeterminate_rounded.svg?react';
import OutlineBlankRoundedIcon from '@assets/icons/ic_checkbox_outline_blank_rounded.svg?react';
import CheckboxRoundedIcon from '@assets/icons/ic_checkbox_rounded.svg?react';
import { useControlled } from '@hooks/useControlled';
import { composeRef } from '@modules/utils/composeRef';
import { createChainedFunction } from '@modules/utils/createChainedFunction';
import classNames from 'classnames';
import * as React from 'react';

import { CheckboxProps } from './Checkbox.types';
import { checkboxClasses as classes } from './checkboxClasses';
import CheckboxGroupContext from './CheckboxGroupContext';

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
    checked: checkedProp,
    defaultChecked,
    indeterminate,
    color = 'primary',
    disabled = false,
    id: idOverride,
    name: nameProp,
    slotProps = {},
    size = 'md',
    readOnly = false,
    required = false,
    label,
    onChange: onChangeProp,
    ...inputProps
  } = props;

  const defaultId = React.useId();
  const id = idOverride ?? defaultId;

  const checkboxGroup = React.useContext(CheckboxGroupContext);

  let name = nameProp;

  if (checkboxGroup) {
    name = checkboxGroup.name;
  }

  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    defaultValue: defaultChecked,
  });

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
    onChangeProp?.(event, event.target.checked);
  };

  const onChange = createChainedFunction(
    handleChange,
    checkboxGroup && checkboxGroup.onChange,
  );

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
          {...inputProps}
          {...inputSlot}
          type="checkbox"
          ref={inputRef}
          id={id}
          name={name}
          checked={checkedProp}
          defaultChecked={defaultChecked}
          className={classNames(classes.input, inputSlot.className)}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          {...(indeterminate && {
            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked#values
            'aria-checked': 'mixed',
          })}
          onChange={disabled ? undefined : onChange}
        />
        {icon}
      </span>
      {label && (
        <span className={classNames(classes.label, labelSlot.className)}>{label}</span>
      )}
    </label>
  );
});
