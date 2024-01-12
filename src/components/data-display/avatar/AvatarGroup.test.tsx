import { generatePrefixClasses } from '@modules/utils/generatePrefixClasses';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar, avatarClasses, avatarGroupClasses } from './index';

const groupClasses = generatePrefixClasses(avatarGroupClasses, 'bc-avatar-group');
const itemClasses = generatePrefixClasses(avatarClasses, 'bc-avatar');

describe('<Avatar.Group />', () => {
  it('렌더링 됩니다.', () => {
    const { container } = render(<Avatar.Group />);

    expect(
      (container.firstChild as HTMLElement).classList.contains(groupClasses.root),
    ).toBeTruthy();
  });

  it('context value를 제공합니다.', () => {
    const { container } = render(
      <Avatar.Group variant="rounded" size="sm">
        <Avatar src="/" />
      </Avatar.Group>,
    );

    const avatar = container.firstChild?.firstChild as HTMLElement;
    expect(avatar.classList.contains(itemClasses.root)).toBeTruthy();
    expect(avatar.classList.contains(itemClasses.sizeSmall)).toBeTruthy();
    expect(avatar.classList.contains(itemClasses.rounded)).toBeTruthy();
  });
});
