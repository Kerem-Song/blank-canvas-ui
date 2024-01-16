import { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';

import { AvatarGroup, clampAvatars } from './AvatarGroup';
import { AvatarGroupProps } from './AvatarGroup.types';
import { Avatar } from './index';

const FlexBox = ({
  className,
  children,
}: React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={classNames('flex items-center gap-4 p-2', className)}>{children}</div>
  );
};

const meta: Meta<AvatarGroupProps> = {
  title: 'components/data-display/Avatar/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AvatarGroupProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <FlexBox>
          <Avatar.Group {...args}>
            <Avatar alt="Cain" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Louis" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Lucy" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Ellie" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Boni" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Kerem" src="/static/images/avatar/6.jpg" />
            <Avatar alt="Nicole" src="/static/images/avatar/7.jpg" />
            <Avatar alt="John" src="/static/images/avatar/8.jpg" />
            <Avatar>+3</Avatar>
          </Avatar.Group>
        </FlexBox>
      </>
    );
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
  args: {
    component: 'div',
    variant: 'circular',
    size: 'md',
    className: '',
    style: {},
  },
};

/**
 * 아바타 그룹은 그룹 내 아바타의 최대 개수 또는 총 개수를 제어하기 위해 `clampAvatars` 기본 함수를 제공합니다.<br>
 * 더 넓은 옵션을 제공하려면 사용자가 재정의해서 사용할 수 있습니다.
 */
export const QuantityWithinAGroup: Story = {
  render: () => {
    const data = {
      people: [
        {
          alt: 'Cain',
          src: '/static/images/avatar/1.jpg',
        },
        {
          alt: 'Louis',
          src: '/static/images/avatar/2.jpg',
        },
        {
          alt: 'Lucy',
          src: '/static/images/avatar/4.jpg',
        },
        {
          alt: 'Ellie',
          src: '/static/images/avatar/5.jpg',
        },
      ],
      total: 24,
    };

    const { avatars, surplus } = clampAvatars(data.people, {
      max: 5,
      total: data.total,
    });

    return (
      <>
        <FlexBox>
          <Avatar.Group>
            {avatars.map((avatar) => (
              <Avatar key={avatar.alt} {...avatar} />
            ))}
            {!!surplus && <Avatar>+{surplus}</Avatar>}
          </Avatar.Group>
        </FlexBox>
      </>
    );
  },
};

/**
 * `flexDirection: row-reverse` CSS 속성을 사용하여 겹치는 순서를 바꿀 수 있습니다.
 */
export const OverlappingOrder: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Avatar.Group className="flex-row-reverse">
            <Avatar>+4k</Avatar>
            <Avatar alt="Boni" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Kerem" src="/static/images/avatar/6.jpg" />
            <Avatar alt="Nicole" src="/static/images/avatar/7.jpg" />
            <Avatar alt="John" src="/static/images/avatar/8.jpg" />
          </Avatar.Group>
        </FlexBox>
      </>
    );
  },
};
