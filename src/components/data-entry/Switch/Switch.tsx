import { InputHTMLAttributes, forwardRef } from 'react';

export const Switch = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (args, ref) => {
    return (
      <label className="switch-wrapper ">
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
        <div className="switch-bar peer peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300" />
      </label>
    );
  },
);
