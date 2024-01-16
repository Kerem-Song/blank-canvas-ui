import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses';

const classes = {
  /** 루트 요소에 적용된 스타일. */
  root: '',
};

export const avatarGroupClasses = attachPrefixClasses(classes, 'avatar-group', false);

export type AvatarGroupClasses = typeof avatarGroupClasses;
