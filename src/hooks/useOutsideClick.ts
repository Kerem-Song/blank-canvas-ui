import { useEffect } from 'react';

export function useOutsideClick(ref: any, action: () => void, condition?: boolean) {
  useEffect(() => {
    document.addEventListener('click', (e) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      if (ref.current && !ref.current.contains(e.target)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log('@e target', e.target);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        console.log('@contain', ref.current?.contains(e.target));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log('@ref', ref, ref?.current);
        action();
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      if (ref.current && ref.current.contains(e.target)) {
        console.log('@포함');
      }
    });
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', action);
    };
  }, [action, ref, condition]);
}
