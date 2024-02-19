import { forwardRef, useDeferredValue, useMemo, useState } from 'react';
import { Input } from '@components/data-entry/input/Input';

import { IDebounceProps } from './DebouncedInput.types';

const debounce = (debounceTimeout: number, callback: () => void) => {
  const delayDebounceFn = setTimeout(() => {
    callback();
  }, debounceTimeout);

  return () => clearTimeout(delayDebounceFn);
};

export const DebouncedInput = forwardRef<HTMLInputElement, IDebounceProps>(
  (args, ref) => {
    const [query, setQuery] = useState('');

    const { debounceTimeout, handleDebounce, children, ...inputProps } = args;
    const deferredQuery = useDeferredValue(query);

    const fetchDataList = useMemo(
      () => (val: string) => {
        try {
          setQuery(val);

          debounce(debounceTimeout, handleDebounce);
        } catch (error) {
          console.error('Error fetching product list:', error);
        }
      },
      [deferredQuery],
    );

    return (
      <div>
        <Input
          ref={ref}
          onChange={(e) => fetchDataList(e.currentTarget.value)}
          {...inputProps}
        />
        {deferredQuery ? children : null}
      </div>
    );
  },
);
