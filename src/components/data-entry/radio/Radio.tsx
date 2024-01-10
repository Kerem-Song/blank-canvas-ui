import { forwardRef, InputHTMLAttributes } from 'react';

export const Radio = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (args, ref) => {
    const { children, name, ...inputArgs } = args;

    return (
      <label className="bc-radio-container">
        <input
          {...inputArgs}
          className="bc-radio"
          type="radio"
          name={name}
          ref={ref}
          disabled={args.disabled}
          checked={args.checked}
          defaultChecked={args.defaultChecked}
        />
        {children}
      </label>
    );
  },
);

Radio.displayName = 'bc_radio';
