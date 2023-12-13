import { setRef } from '../setRef';

/**
 * 참조를 하나의 참조 함수로 병합하여 참조 전달을 지원합니다.
 */
export function composeRef<Instance>(
  ...refs: Array<React.Ref<Instance> | undefined>
): React.RefCallback<Instance> | null {
  if (refs.every((ref) => ref === null)) {
    return null;
  }

  return (instance: Instance) => {
    refs.forEach((ref) => {
      setRef(ref, instance);
    });
  };
}
