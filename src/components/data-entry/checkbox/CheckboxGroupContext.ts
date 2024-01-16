import * as React from 'react';

export interface CheckboxGroupContextValue {
  name: string;
  value: Array<string>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | undefined>(
  undefined,
);

export default CheckboxGroupContext;
