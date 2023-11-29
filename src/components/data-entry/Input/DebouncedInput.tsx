import { IInputProps, Input } from '@components';
import { forwardRef, useDeferredValue, useMemo, useRef, useState } from 'react';

export interface IDebounceProps extends IInputProps {
  handleDebounce: () => void;
  debounceTimeout: number;
}

const debounce = (debounceTimeout: number, callback: () => void) => {
  const delayDebounceFn = setTimeout(() => {
    callback();
  }, debounceTimeout);

  return () => clearTimeout(delayDebounceFn);
};

export const DebouncedInput = forwardRef<HTMLInputElement, IDebounceProps>(
  (args, ref) => {
    const [query, setQuery] = useState('');

    const { debounceTimeout, handleDebounce, ...inputProps } = args;
    const deferredQuery = useDeferredValue(query);

    const fetchDataList = useMemo(
      () => (val: string) => {
        try {
          console.log('@val', val);
          console.log('@debounce time', debounceTimeout);
          setQuery(val);

          debounce(debounceTimeout, handleDebounce);
        } catch (error) {
          console.error('Error fetching product list:', error);
        }
      },
      [deferredQuery],
    );
    console.log('@deferred query', deferredQuery);
    return <Input ref={ref} onChange={(e) => fetchDataList(e.currentTarget.value)} />;
  },
);
