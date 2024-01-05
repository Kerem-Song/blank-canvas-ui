import { Flex } from '@components/Layout/Flex/Flex';
import { forwardRef } from 'react';

import { Radio } from './Radio';
import { IRadioOptions } from './RadioGroup.types';

export const RadioGroup = forwardRef<HTMLInputElement, IRadioOptions>((args, ref) => {
  const { style, options, name, disabled, vertical, gap, ...inputProps } = args;

  return (
    <Flex vertical={vertical} gap={gap} className="radio-group-wrapper">
      {options.map((option, i) => (
        <Radio name={name} key={i} disabled={option.disabled} {...inputProps}>
          <span>{option.label}</span>
        </Radio>
      ))}
    </Flex>
  );
});

RadioGroup.displayName = 'luna_radio_group';
