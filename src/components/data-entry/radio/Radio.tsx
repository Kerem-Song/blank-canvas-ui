import { forwardRef, InputHTMLAttributes } from 'react';

import { radioClasses } from './RadioClasses';

export const Radio = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (args, ref) => {
    const { children, name, ...inputArgs } = args;

    return (
      <label className={radioClasses.container}>
        <input
          {...inputArgs}
          className={radioClasses.root}
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
