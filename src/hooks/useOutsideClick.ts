/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from 'react';

export function useOutsideClick(ref: any, action: () => void, condition?: boolean) {
  useEffect(() => {
    document.addEventListener('click', (e) => {
      // 조건이 있을때는 클릭 무효화
      if (condition) {
        return;
      }
      if (ref.current && !ref.current.contains(e.target)) {
        action();
      }
    });
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', action);
    };
  }, [action, ref, condition]);
}

export function useOutsideEventClick(
  ref: any,
  action: (e: Event) => void,
  condition?: boolean,
) {
  useEffect(() => {
    document.addEventListener('click', (e: Event) => {
      action(e);
    });
    return () => {
      document.removeEventListener('click', action);
    };
  }, [action, ref, condition]);
}
