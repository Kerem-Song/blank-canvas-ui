import { Checkbox as _Checkbox } from './Checkbox';
import { CheckboxProps } from './Checkbox.types';
import { CheckboxGroup } from './CheckboxGroup';

export * from './Checkbox.types';
export * from './CheckboxGroup.types';

type CompoundedComponent = React.ForwardRefExoticComponent<
  CheckboxProps & React.RefAttributes<HTMLInputElement>
> & {
  Group: typeof CheckboxGroup;
};

export const Checkbox = _Checkbox as CompoundedComponent;
Checkbox.Group = CheckboxGroup;
