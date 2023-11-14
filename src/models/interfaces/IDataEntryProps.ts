import { ChangeEvent, FocusEvent } from "react";
export interface IDataEntryProps {
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string | number;
  isError?: boolean;
  required?: boolean;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
