import * as colors from 'tailwindcss/colors';

type ColorOnlyType = 'inherit' | 'current' | 'transparent' | 'black' | 'white';

export type TailwindTextColorType =
  | `text-${ColorOnlyType}`
  | `text-${keyof typeof colors}-${keyof typeof colors.gray}`;

export type TailwindBgColorType =
  | `bg-${ColorOnlyType}`
  | `bg-${keyof typeof colors}-${keyof typeof colors.gray}`;

export type TailwindHoverBgColorType =
  | `hover:bg-${ColorOnlyType}`
  | `hover:bg-${keyof typeof colors}-${keyof typeof colors.gray}`;
