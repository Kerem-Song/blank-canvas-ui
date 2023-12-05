import { Avatar as _Avatar } from './Avatar';
import { AvatarProps } from './Avatar.types';
import { AvatarGroup } from './AvatarGroup';

export * from './Avatar.types';
export * from './avatarClasses';
export * from './AvatarGroup.types';
export * from './avatarGroupClasses';

type CompoundedComponent = React.ForwardRefExoticComponent<
  AvatarProps & React.RefAttributes<HTMLElement>
> & {
  Group: typeof AvatarGroup;
};

export const Avatar = _Avatar as CompoundedComponent;
Avatar.Group = AvatarGroup;
