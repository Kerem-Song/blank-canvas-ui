import { InputHTMLAttributes, forwardRef } from "react";

export const Radio = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((args, ref) => {
  const { children, ...inputArgs } = args;
  return (
    <label className="radio-container">
      <input
        {...inputArgs}
        className="radio"
        type="radio"
        name={args.name}
        ref={ref}
      />
      {children}
    </label>
  );
});

Radio.displayName = "luna_Radio";
