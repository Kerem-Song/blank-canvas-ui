import { ChangeEvent, ReactNode } from 'react';

export interface AutocompleteProps<T extends object> {
  items?: T[];
  defaultValue?: T;
  displayName?: keyof T;
  valuePath?: keyof T;
  isDisabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  maxLength?: number;
  create?: (value: string | undefined) => T | undefined;
  onChangeValue?: (value: T | undefined) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: any;
  isError?: boolean;
}
