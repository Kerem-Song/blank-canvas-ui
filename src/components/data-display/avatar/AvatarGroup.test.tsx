import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './Avatar';
import { avatarClasses } from './avatarClasses';
import { AvatarGroup } from './AvatarGroup';
import { avatarGroupClasses } from './avatarGroupClasses';

describe('<Avatar.Group />', () => {
  it('렌더링 됩니다.', () => {
    const { container } = render(<AvatarGroup />);

    expect(
      (container.firstChild as HTMLElement).classList.contains(avatarGroupClasses.root),
    ).toBeTruthy();
  });

  it('context value를 제공합니다.', () => {
    const { container } = render(
      <AvatarGroup variant="rounded" size="sm">
        <Avatar src="/" />
      </AvatarGroup>,
    );

    const avatar = container.firstChild?.firstChild as HTMLElement;
    expect(avatar.classList.contains(avatarClasses.root)).toBeTruthy();
    expect(avatar.classList.contains(avatarClasses.sizeSmall)).toBeTruthy();
    expect(avatar.classList.contains(avatarClasses.rounded)).toBeTruthy();
  });
});
