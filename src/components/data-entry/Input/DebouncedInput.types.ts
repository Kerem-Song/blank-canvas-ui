import { IInputProps } from './Input.types';

export interface IDebounceProps extends IInputProps {
  handleDebounce: () => void;
  debounceTimeout: number;
}
