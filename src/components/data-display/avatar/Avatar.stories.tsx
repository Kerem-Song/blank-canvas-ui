import StarIcon from '@assets/icons/ic_star.svg?react';
import { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';

import { Avatar } from './Avatar';
import { AvatarProps } from './Avatar.types';

const FlexBox = ({
  className,
  children,
}: React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={classNames('flex items-center gap-4 p-2', className)}>{children}</div>
  );
};

const meta: Meta<AvatarProps> = {
  title: 'components/data-display/Avatar/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <FlexBox>
          <Avatar {...args} />
        </FlexBox>
      </>
    );
  },
  args: {
    alt: 'Bear',
    src: 'https://images.unsplash.com/photo-1619476266550-bc9f04e57952?w=480',
    srcSet: `
      https://images.unsplash.com/photo-1619476266550-bc9f04e57952?w=120 1x,
      https://images.unsplash.com/photo-1619476266550-bc9f04e57952?w=480 2x,
    `,
    sizes: ``,
    component: 'div',
    children: 'Bear',
    variant: 'circular',
    size: 'md',
    className: '',
    style: {},
    imgProps: {},
  },
};

/**
 * 간단한 문자가 포함된 아바타는 문자열을 `children` 속성으로 전달하여 생성할 수 있습니다.
 */
export const LetterAvatars: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Avatar>J</Avatar>
          <Avatar style={{ backgroundColor: '#ff5722' }}>N</Avatar>
          <Avatar style={{ backgroundColor: '#007fff' }}>AB</Avatar>
        </FlexBox>
      </>
    );
  },
};

/**
 * 아이콘 아바타는 아이콘을 `children` 속성으로 전달하여 생성할 수 있습니다.
 */
export const IconAvatars: Story = {
  render: () => {
    const EmojiSunglassesIcon = () => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75M7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116" />
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0" />
        </svg>
      );
    };

    const EtcIcon = () => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 13 16">
          <path d="M6.048 3.323c.022.277-.13.523-.338.55-.21.026-.397-.176-.419-.453-.022-.277.13-.523.338-.55.21-.026.397.176.42.453Zm2.265-.24c-.603-.146-.894.256-.936.333-.027.048-.008.117.037.15.045.035.092.025.119-.003.361-.39.751-.172.829-.129l.011.007c.053.024.147.028.193-.098.023-.063.017-.11-.006-.142-.016-.023-.089-.08-.247-.118Z" />
          <path d="M11.727 6.719c0-.022.01-.375.01-.557 0-3.07-1.45-6.156-5.015-6.156-3.564 0-5.014 3.086-5.014 6.156 0 .182.01.535.01.557l-.72 1.795a25.85 25.85 0 0 0-.534 1.508c-.68 2.187-.46 3.093-.292 3.113.36.044 1.401-1.647 1.401-1.647 0 .979.504 2.256 1.594 3.179-.408.126-.907.319-1.228.556-.29.213-.253.43-.201.518.228.386 3.92.246 4.985.126 1.065.12 4.756.26 4.984-.126.052-.088.088-.305-.2-.518-.322-.237-.822-.43-1.23-.557 1.09-.922 1.594-2.2 1.594-3.178 0 0 1.041 1.69 1.401 1.647.168-.02.388-.926-.292-3.113a25.78 25.78 0 0 0-.534-1.508l-.72-1.795ZM9.773 5.53a.095.095 0 0 1-.009.096c-.109.159-1.554.943-3.033.943h-.017c-1.48 0-2.925-.784-3.034-.943a.098.098 0 0 1-.018-.055c0-.015.004-.028.01-.04.13-.287 1.43-.606 3.042-.606h.017c1.611 0 2.912.319 3.042.605Zm-4.32-.989c-.483.022-.896-.529-.922-1.229-.026-.7.344-1.286.828-1.308.483-.022.896.529.922 1.23.027.7-.344 1.286-.827 1.307Zm2.538 0c-.484-.022-.854-.607-.828-1.308.027-.7.44-1.25.923-1.23.483.023.853.608.827 1.309-.026.7-.439 1.251-.922 1.23ZM2.928 8.99c.213.042.426.081.639.117v2.336s1.104.222 2.21.068V9.363c.326.018.64.026.937.023h.017c1.117.013 2.474-.136 3.786-.396.097.622.151 1.386.097 2.284-.146 2.45-1.6 3.99-3.846 4.012h-.091c-2.245-.023-3.7-1.562-3.846-4.011-.054-.9 0-1.663.097-2.285Z" />
        </svg>
      );
    };

    return (
      <>
        <FlexBox>
          <Avatar
            variant="square"
            size="lg"
            style={{ backgroundColor: '#198754', color: 'rgb(250, 175, 0)' }}
          >
            <StarIcon />
          </Avatar>
          <Avatar variant="rounded" size="lg" style={{ backgroundColor: '#6528e0' }}>
            <EmojiSunglassesIcon />
          </Avatar>
          <Avatar
            size="lg"
            style={{
              border: '1px solid darkgray',
              backgroundColor: '#f8f9fa',
              color: '#212529',
            }}
          >
            <EtcIcon />
          </Avatar>
        </FlexBox>
      </>
    );
  },
};

/**
 * `size` 속성을 사용하여 아바타의 크기를 변경할 수 있습니다.
 * `sm` | `md` | `lg` | `number`
 *
 * `number` 타입의 스타일은 <code>{ width: `${size}px`, height: `${size}px`, font-size: `${size / 2}px`}</code> 으로 적용됩니다.
 */
export const Sizes: Story = {
  render: () => {
    const CookieIcon = () => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m4.5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          <path d="M8 0a7.963 7.963 0 0 0-4.075 1.114c-.162.067-.31.162-.437.28A8 8 0 1 0 8 0m3.25 14.201a1.5 1.5 0 0 0-2.13.71A7.014 7.014 0 0 1 8 15a6.967 6.967 0 0 1-3.845-1.15 1.5 1.5 0 1 0-2.005-2.005A6.967 6.967 0 0 1 1 8c0-1.953.8-3.719 2.09-4.989a1.5 1.5 0 1 0 2.469-1.574A6.985 6.985 0 0 1 8 1c1.42 0 2.742.423 3.845 1.15a1.5 1.5 0 1 0 2.005 2.005A6.967 6.967 0 0 1 15 8c0 .596-.074 1.174-.214 1.727a1.5 1.5 0 1 0-1.025 2.25 7.033 7.033 0 0 1-2.51 2.224Z" />
        </svg>
      );
    };

    const imageProps = {
      src: 'https://images.unsplash.com/photo-1606922731315-8a9c372cc274?w=1000',
      alt: '쿠키',
    };

    return (
      <>
        <FlexBox>
          <Avatar size="sm" alt={imageProps.alt} src="/"></Avatar>
          <Avatar size="md" alt={imageProps.alt} src="/"></Avatar>
          <Avatar size="lg" alt={imageProps.alt} src="/"></Avatar>
          <Avatar size={100} alt={imageProps.alt} src="/"></Avatar>
        </FlexBox>
        <FlexBox>
          <Avatar size="sm" {...imageProps} />
          <Avatar size="md" {...imageProps} />
          <Avatar size="lg" {...imageProps} />
          <Avatar size={100} {...imageProps} />
        </FlexBox>
        <FlexBox>
          <Avatar size="sm" alt={imageProps.alt}>
            <CookieIcon />
          </Avatar>
          <Avatar size="md" alt={imageProps.alt}>
            <CookieIcon />
          </Avatar>
          <Avatar size="lg" alt={imageProps.alt}>
            <CookieIcon />
          </Avatar>
          <Avatar size={100} alt={imageProps.alt}>
            <CookieIcon />
          </Avatar>
        </FlexBox>
      </>
    );
  },
};

/**
 * 변형이 필요한 경우 `variant` 속성을 사용하세요.
 * `circular` | `square` | `rounded`
 */
export const Variants: Story = {
  render: () => {
    const imageProps = {
      src: 'https://images.unsplash.com/photo-1503516459261-40c66117780a?w=1000',
      alt: '바닷가에 앉아 있는 뼈 불을 가진 남자와 여자',
    };

    return (
      <>
        <FlexBox>
          <Avatar variant="circular" size={100} {...imageProps} />
          <Avatar variant="rounded" size={100} {...imageProps} />
          <Avatar variant="square" size={100} {...imageProps} />
        </FlexBox>
      </>
    );
  },
};

/**
 * 아바타 이미지를 로드하는 중에 오류가 발생하면 구성 요소는 다음 순서에 따라 대체 이미지로 대체됩니다.<br>
 * - `children` 속성
 * - 대체 텍스트의 첫 글자
 * - 일반 아바타 아이콘
 */
export const Fallbacks: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Avatar
            style={{ backgroundColor: '#44b700' }}
            alt="Remy Sharp"
            src="/broken-image.png"
          >
            B
          </Avatar>
          <Avatar
            style={{ backgroundColor: '#44b700' }}
            alt="Remy Sharp"
            src="/broken-image.png"
          />
          <Avatar src="/broken-image.png" />
        </FlexBox>
      </>
    );
  },
};
