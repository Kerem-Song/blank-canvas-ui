export interface UseControlledProps<T = unknown> {
  /**
   * 제어될 때 구성요소 값을 보유합니다.
   */
  controlled?: T;
  /**
   * 제어되지 않은 경우 기본값입니다.
   */
  defaultValue?: T;
}
