import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  /** 루트 요소에 적용되는 스타일입니다. */
  root: '',
  /** 입력 구성 요소의 비활성화된 클래스에 적용되는 상태 클래스입니다. */
  disabled: 'disabled',
  /** `readOnly={true}`인 경우 루트 요소에 스타일이 적용됩니다. */
  readOnly: 'readOnly',
  /** 포커스가 있는 경우 루트 요소에 적용되는 상태 클래스입니다. */
  focusVisible: 'focusVisible',
  /** 라벨 요소에 적용되는 스타일입니다. */
  label: 'label',
  /** 아이콘 래핑 요소에 적용되는 스타일입니다. */
  icon: 'icon',
  /** 비어 있을 때 요소를 감싸는 아이콘에 스타일이 적용됩니다. */
  iconEmpty: 'iconEmpty',
  /** 채워지면 요소를 감싸는 아이콘에 스타일이 적용됩니다. */
  iconFilled: 'iconFilled',
  /** 마우스를 올리면 아이콘 래핑 요소에 스타일이 적용됩니다. */
  iconHover: 'iconHover',
  /** 포커스 시 아이콘 래핑 요소에 적용되는 스타일입니다. */
  iconFocus: 'iconFocus',
  /** 활성 상태일 때 아이콘 래핑 요소에 적용되는 스타일입니다. */
  iconActive: 'iconActive',
  /** 소수점이 필요할 때 아이콘 래핑 요소에 적용되는 스타일입니다. */
  decimal: 'decimal',
  visuallyHiddenInput: 'visuallyHiddenInput',
  /** 활성화된 "값 없음" 입력의 레이블에 적용되는 스타일입니다. */
  labelEmptyValueActive: 'labelEmptyValueActive',
  /** `size="sm"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeSmall: 'sm',
  /** `size="md"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeMedium: 'md',
  /** `size="lg"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeLarge: 'lg',
} as const;

export const ratingClasses = attachPrefixClasses(classes, 'rating', false);

export type RatingClasses = typeof ratingClasses;
