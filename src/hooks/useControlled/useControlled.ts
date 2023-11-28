import { useCallback, useRef, useState } from 'react';

import { UseControlledProps } from './useControlled.types';

/**
 * 프로퍼티(controlled)가 전달되면 해당 프로퍼티 값을 사용하고,
 * 그렇지 않으면 useState로 내부의 상태를 사용하는 훅
 */
export const useControlled = <T = unknown>(props: UseControlledProps<T>) => {
  const { controlled, defaultValue } = props;

  const { current: isControlled } = useRef(controlled !== undefined);
  const [valueState, setValueState] = useState(defaultValue);
  const value = isControlled ? controlled : valueState;

  const setValueIfUncontrolled = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setValueState(newValue);
      }
    },
    [isControlled],
  );

  return [value as T, setValueIfUncontrolled] as const;
};
