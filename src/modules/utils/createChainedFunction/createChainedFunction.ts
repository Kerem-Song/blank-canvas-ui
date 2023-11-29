/**
 * 안전한 함수 연결.
 *
 * 필요한 경우에만 새 기능을 생성합니다.
 * 그렇지 않으면 기존 함수를 다시 전달하거나 null을 전달합니다.
 */
export function createChainedFunction<Args extends any[], This>(
  ...funcs: Array<((this: This, ...args: Args) => any) | undefined | null>
): (this: This, ...args: Args) => void {
  return funcs.reduce<(this: This, ...args: Args) => void>(
    (acc, func) => {
      if (func == null) {
        return acc;
      }

      return function chainedFunction(...args) {
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {},
  );
}
