import { InputHTMLAttributes, forwardRef } from 'react';

export const Radio = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (args, ref) => {
    const { children, name, ...inputArgs } = args;
    console.log('@name, ', name);
    return (
      <label className="radio-container">
        <input
          {...inputArgs}
          className="radio"
          type="radio"
          name={name}
          ref={ref}
          disabled={args.disabled}
        />
        {children}
      </label>
    );
  },
);

Radio.displayName = 'luna_Radio';
