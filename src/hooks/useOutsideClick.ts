import { useEffect } from 'react';

export function useOutsideClick(ref: any, action: () => void, condition?: boolean) {
  useEffect(() => {
    document.addEventListener('click', (e) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
