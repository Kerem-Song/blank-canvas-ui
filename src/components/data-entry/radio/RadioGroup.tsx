import '@styles/radio.css';

import { Flex } from '@components/layout/flex';
import { forwardRef } from 'react';

import { Radio } from './Radio';
import { radioClasses } from './RadioClasses';
import { IRadioOptions } from './RadioGroup.types';

export const RadioGroup = forwardRef<HTMLInputElement, IRadioOptions>((args, ref) => {
  const { style, options, name, disabled, vertical, gap, ...inputProps } = args;

  return (
    <Flex vertical={vertical} gap={gap} className={radioClasses.groupWrapper}>
      {options.map((option, i) => (
        <Radio
          name={name}
          key={i}
          disabled={option.disabled}
          checked={option.checked}
          defaultChecked={option.defaultChecked}
          {...inputProps}
        >
          <span>{option.label}</span>
        </Radio>
      ))}
    </Flex>
  );
});

RadioGroup.displayName = 'bc_radio_group';
