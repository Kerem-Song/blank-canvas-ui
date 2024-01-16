import { Avatar as _Avatar } from './Avatar';
import { AvatarProps } from './Avatar.types';
import { AvatarGroup } from './AvatarGroup';

export type { AvatarProps } from './Avatar.types';
export type { AvatarGroupProps } from './AvatarGroup.types';

type CompoundedComponent = React.ForwardRefExoticComponent<
  AvatarProps & React.RefAttributes<HTMLElement>
> & {
  Group: typeof AvatarGroup;
};

export const Avatar = _Avatar as CompoundedComponent;
Avatar.Group = AvatarGroup;
