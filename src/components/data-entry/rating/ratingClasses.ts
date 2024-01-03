export interface RatingClasses {
  /** 루트 요소에 적용되는 스타일입니다. */
  root: string;
  /** `size="sm"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeSmall: string;
  /** `size="md"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeMedium: string;
  /** `size="lg"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeLarge: string;
  /** 입력 구성 요소의 비활성화된 클래스에 적용되는 상태 클래스입니다. */
  disabled: string;
  /** `readOnly={true}`인 경우 루트 요소에 스타일이 적용됩니다. */
  readOnly: string;
  /** 포커스가 있는 경우 루트 요소에 적용되는 상태 클래스입니다. */
  focusVisible: string;
  /** 라벨 요소에 적용되는 스타일입니다. */
  label: string;
  /** 활성화된 "값 없음" 입력의 레이블에 적용되는 스타일입니다. */
  labelEmptyValueActive: string;
  /** 아이콘 래핑 요소에 적용되는 스타일입니다. */
  icon: string;
  /** 비어 있을 때 요소를 감싸는 아이콘에 스타일이 적용됩니다. */
  iconEmpty: string;
  /** 채워지면 요소를 감싸는 아이콘에 스타일이 적용됩니다. */
  iconFilled: string;
  /** 마우스를 올리면 아이콘 래핑 요소에 스타일이 적용됩니다. */
  iconHover: string;
  /** 포커스 시 아이콘 래핑 요소에 적용되는 스타일입니다. */
  iconFocus: string;
  /** 활성 상태일 때 아이콘 래핑 요소에 적용되는 스타일입니다. */
  iconActive: string;
  /** 시각적으로 숨겨진 입력 요소에 적용되는 스타일입니다. */
  visuallyHiddenInput: string;
  /** 소수점이 필요할 때 아이콘 래핑 요소에 적용되는 스타일입니다. */
  decimal: string;
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
