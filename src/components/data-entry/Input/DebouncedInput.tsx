import { IInputProps, Input } from '@components';
import { forwardRef, useDeferredValue, useMemo, useState } from 'react';

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
          isClearable={args.isClearable}
          isError={args.isError}
          isSearch={args.isSearch}
          showCount={args.showCount}
          maxLength={args.maxLength}
          textLength={args.textLength}
          isShowAlwaysClear={args.isShowAlwaysClear}
          customPrefix={args.customPrefix}
          suffix={args.suffix}
          onSearch={args.onSearch}
          onPressEnter={args.onPressEnter}
          onPressEsc={args.onPressEsc}
          onClear={args.onClear}
        />
        {deferredQuery ? children : null}
      </div>
    );
  },
);
