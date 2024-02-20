import { CheckboxProps } from './Checkbox.types';

export interface CheckboxOption
  extends Pick<
    CheckboxProps,
    'label' | 'id' | 'disabled' | 'readOnly' | 'required' | 'slotProps' | 'onChange'
  > {
  /**
   * 현재 선택된 값을 설정하는 데 사용됩니다.
   */
  value: string;
}

export interface CheckboxGroupProps
  extends Pick<
    CheckboxProps,
    | 'name'
    | 'disabled'
    | 'checkedIcon'
    | 'uncheckedIcon'
    | 'readOnly'
    | 'required'
    // | 'size'
    | 'color'
    | 'slotProps'
  > {
  className?: string;
  style?: React.CSSProperties;
  /**
   * 현재 선택된 값을 설정하는 데 사용됩니다. DOM API는 이를 문자열로 변환합니다.
   */
  value?: Array<string>;
  /**
   * 기본 선택 값. 비제어 컴포넌트일때 사용합니다.
   */
  defaultValue?: Array<string>;
  /**
   * Group 옵션을 지정합니다.
   * @default []
   */
  options?: Array<CheckboxOption | string>;
  /**
   * 값이 변경되면 호출할 콜백함수.
   * @param {React.ChangeEvent<HTMLInputElement>} event 콜백의 이벤트 소스입니다.
   * @param {string} value 선택한 값입니다.
   * @param {string[]} checkedValues 선택된 값의 집합입니다.
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
    checkedValues: string[],
  ) => void;
}
