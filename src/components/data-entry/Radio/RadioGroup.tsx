import { Flex, Radio } from '@components';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface IRadioOptions {
  id: number | string;
  name: string;
  value: number | string;
}

export const RadioGroup = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((args, ref) => {
  const { children, ...inputArgs } = args;
  const options: IRadioOptions[] = [];
  return (
    <Flex>
      {options.map((option) => (
        <Radio name={option.name} key={option.id}>
          <span>{option.name}</span>
        </Radio>
      ))}
    </Flex>
  );
});

RadioGroup.displayName = 'luna_Radio';
