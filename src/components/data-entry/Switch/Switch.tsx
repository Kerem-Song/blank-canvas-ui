import { forwardRef, InputHTMLAttributes } from 'react';

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
        <div className="switch-bar peer peer-checked:bg-green-200 peer-checked:after:translate-x-3/4 peer-checked:after:bg-green-400 peer-focus:ring-green-500" />
      </label>
    );
  },
);
