import { IDataEntryProps, IHasChildren, IHasClassNameNStyle } from "@models";
import { forwardRef } from "react";

export interface IRadioProps
  extends IHasChildren,
    IDataEntryProps,
    IHasClassNameNStyle {
  disabled?: boolean;
  checked?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, IRadioProps>((args, ref) => {
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
