import React from 'react';
import { isFragment } from 'react-is';

export interface Option {
  keepEmpty?: boolean;
}

export function toArray(
  children: React.ReactNode,
  option: Option = {},
): React.ReactElement[] {
  let ret: React.ReactElement[] = [];

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  React.Children.forEach(children, (child: any | any[]) => {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    } else if (isFragment(child) && child.props) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ret.push(child);
    }
  });

  return ret;
}
