export function setRef<T>(
  ref:
    | React.MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined,
  node: T | null,
): void {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref) {
    ref.current = node;
  }
}
