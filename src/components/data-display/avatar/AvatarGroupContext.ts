import * as React from 'react';

import { AvatarGroupTypeMap } from './AvatarGroup.types';

interface AvatarGroupContextValue
  extends Pick<AvatarGroupTypeMap['props'], 'size' | 'variant'> {
  component?: React.ElementType;
}

const AvatarGroupContext = React.createContext<AvatarGroupContextValue | undefined>(
  undefined,
);

export default AvatarGroupContext;
