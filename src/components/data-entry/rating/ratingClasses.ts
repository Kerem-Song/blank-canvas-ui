export interface RatingClasses {
  root: string;
  /** 입력 구성 요소의 비활성화된 클래스에 적용되는 상태 클래스입니다. */
  disabled: string;
  readOnly: string;
  focusVisible: string;
  label: string;
  icon: string;
  iconEmpty: string;
  iconFilled: string;
  iconHover: string;
  iconFocus: string;
  iconActive: string;
  decimal: string;
  labelEmptyValueActive: string;
  visuallyHiddenInput: string;
  /** `size="sm"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeSmall: string;
  /** `size="md"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeMedium: string;
  /** `size="lg"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeLarge: string;
}

export type RatingClassKey = keyof RatingClasses;

export const ratingClasses: RatingClasses = {
  root: '',
  disabled: 'disabled',
  readOnly: 'readOnly',
  focusVisible: 'focusVisible',
  label: 'label',
  icon: 'icon',
  iconEmpty: 'iconEmpty',
  iconFilled: 'iconFilled',
  iconHover: 'iconHover',
  iconFocus: 'iconFocus',
  iconActive: 'iconActive',
  decimal: 'decimal',
  visuallyHiddenInput: 'visuallyHiddenInput',
  labelEmptyValueActive: 'labelEmptyValueActive',
  sizeSmall: 'sm',
  sizeMedium: 'md',
  sizeLarge: 'lg',
};
