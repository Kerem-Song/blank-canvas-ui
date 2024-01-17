import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

const classes = {
  /** 루트 요소에 적용되는 스타일입니다. */
  root: '',
  /** `src` 또는 `srcSet`이 아닌 경우 루트 요소에 스타일이 적용됩니다. */
  colorDefault: 'colorDefault',
  /** `variant="circular"`인 경우 루트 요소에 스타일이 적용됩니다. */
  circular: 'circular',
  /** `variant="rounded"`인 경우 루트 요소에 스타일이 적용됩니다. */
  rounded: 'rounded',
  /** `variant="square"`인 경우 루트 요소에 스타일이 적용됩니다. */
  square: 'square',
  /** `size="sm"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeSmall: 'sm',
  /** `size="md"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeMedium: 'md',
  /** `size="lg"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeLarge: 'lg',
  /** `src` 또는 `srcSet`이 정의된 경우 img 요소에 적용되는 스타일. */
  img: 'img',
  /** 대체 아이콘에 적용되는 스타일 */
  fallback: 'fallback',
} as const;

export const avatarClasses = attachPrefixClasses(classes, 'avatar', false);

export type AvatarClasses = typeof avatarClasses;
