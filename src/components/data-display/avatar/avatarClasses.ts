export interface AvatarClasses {
  /** 루트 요소에 적용되는 스타일입니다. */
  root: string;
  /** `src` 또는 `srcSet`이 아닌 경우 루트 요소에 스타일이 적용됩니다. */
  colorDefault: string;
  /** `variant="circular"`인 경우 루트 요소에 스타일이 적용됩니다. */
  circular: string;
  /** `variant="rounded"`인 경우 루트 요소에 스타일이 적용됩니다. */
  rounded: string;
  /** `variant="square"`인 경우 루트 요소에 스타일이 적용됩니다. */
  square: string;
  /** `size="sm"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeSmall: string;
  /** `size="md"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeMedium: string;
  /** `size="lg"`인 경우 루트 요소에 적용되는 클래스 이름입니다. */
  sizeLarge: string;
  /** `src` 또는 `srcSet`이 정의된 경우 img 요소에 적용되는 스타일. */
  img: string;
  /** 대체 아이콘에 적용되는 스타일 */
  fallback: string;
}

export type AvatarClassKey = keyof AvatarClasses;

export const avatarClasses: AvatarClasses = {
  root: '',
  colorDefault: 'colorDefault',
  circular: 'circular',
  rounded: 'rounded',
  square: 'square',
  sizeSmall: 'sm',
  sizeMedium: 'md',
  sizeLarge: 'lg',
  img: 'img',
  fallback: 'fallback',
};
