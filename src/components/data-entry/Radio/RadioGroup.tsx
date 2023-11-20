import { Flex, Radio } from '@components';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface IRadioOption {
  /**
   * 라디오 title
   */
  label: string;

  /**
   * 라디오 value
   */
  value: string | number;

  /**
   * 라디오 미사용 여부
   * @default false
   */
  disabled?: boolean;
}

export interface IRadioOptions extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 라디오 옵션사항
   */
  options: IRadioOption[];

  /**
   * 수평, 수직 여부
   * @default false
   */
  vertical?: boolean;

  /**
   * Radio 사이의 gap
   * @type number
   * @default 0
   */
  gap?: React.CSSProperties['gap'];
}

export const RadioGroup = forwardRef<HTMLInputElement, IRadioOptions>((args, ref) => {
  const { style, options, name, disabled, vertical, gap, ...inputProps } = args;

  return (
    <Flex vertical={vertical} gap={gap}>
      {options.map((option, i) => (
        <Radio name={name} key={i} disabled={option.disabled}>
          <span>{option.label}</span>
        </Radio>
      ))}
    </Flex>
  );
});

RadioGroup.displayName = 'luna_radio_group';
