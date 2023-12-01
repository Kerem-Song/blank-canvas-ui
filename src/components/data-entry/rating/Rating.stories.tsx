import '../../../index.css';

import { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';
import { useState } from 'react';

import { Rating } from './Rating';
import { IconContainerProps, RatingProps } from './Rating.types';

const FlexBox = ({
  className,
  children,
}: React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={classNames('flex items-center gap-4 p-2', className)}>{children}</div>
  );
};

const meta: Meta<RatingProps> = {
  title: 'components/data-entry/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    name: { control: { type: null } },
    // highlightSelectedOnly: { control: { type: null } },
    emptyIcon: { control: { type: null } },
    filledIcon: { control: { type: null } },
    IconContainerComponent: { control: { type: null } },
    onChange: { control: { type: null } },
  },
};

export default meta;
type Story = StoryObj<RatingProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <FlexBox>
          <Rating name="default-value-1" defaultValue={3} {...args} />
        </FlexBox>
      </>
    );
  },
  parameters: {
    controls: {
      include: [
        'precision',
        'max',
        'size',
        'prefix',
        'readOnly',
        'disabled',
        'className',
        'onChange',
      ],
    },
  },
  argTypes: {
    value: { control: { type: null } },
  },
  args: {
    precision: 0.5,
    max: 5,
    size: 'md',
  },
};

/**
 * `value` 또는 `defaultValue` 속성을 사용하여 부동 소수점 숫자를 표시할 수 있습니다.
 * 허용되는 최소 증분 값을 변경하려면 `precision` 속성을 사용하세요.
 */
export const RatingPrecision: Story = {
  render: (args) => {
    return (
      <>
        <FlexBox>
          <Rating name="readyOnly-value-1" size={36} defaultValue={4.5} {...args} />
        </FlexBox>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['precision'],
    },
  },
  args: {
    precision: 0.5,
  },
};

/**
 * 읽기 전용이며 마우스와 키보드를 사용하여 상호 작용할 수 없습니다.
 */
export const ReadOnly: Story = {
  render: (args) => {
    return (
      <>
        <FlexBox>
          <Rating name="readyOnly-value-1" size={36} defaultValue={4.5} {...args} />
        </FlexBox>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['readOnly'],
    },
  },
  args: {
    readOnly: true,
  },
};

/**
 * 비활성 상태이며 마우스와 키보드를 사용하여 상호 작용할 수 없습니다.
 * 커서 모양이 변경됩니다.
 */
export const Disabled: Story = {
  render: (args) => {
    return (
      <>
        <FlexBox>
          <Rating name="disabled-value-1" size={36} defaultValue={4.5} {...args} />
        </FlexBox>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['disabled'],
    },
  },
  args: {
    disabled: true,
  },
};

/**
 * `size` 속성을 통해서 등급 사이즈를 설정할 수 있습니다.
 * `"sm"` | `"md"` | `"lg"` | `number` 값으로 설정 가능합니다.
 */
export const Size: Story = {
  render: (args) => {
    return (
      <>
        <FlexBox>
          <Rating name="disabled-value-1" {...args} />
        </FlexBox>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['size'],
    },
  },
  args: {
    size: 100,
  },
};

/**
 * `max` 속성을 통해서 등급 최대값을 설정할 수 있습니다.
 */
export const Max: Story = {
  render: (args) => {
    return (
      <>
        <FlexBox>
          <Rating name="disabled-value-1" size={36} {...args} />
        </FlexBox>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['max'],
    },
  },
  args: {
    max: 10,
  },
};

/**
 * `value` 와 `onChange` 속성을 사용하여 Rating을 제어할 수 있습니다.
 */
export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<number | null>(3);
    const onChange: RatingProps['onChange'] = (event, value) => {
      console.log('onChange: ', event, value);
      setValue(value);
    };

    return (
      <>
        <FlexBox>
          <Rating name="controlled-value-1" value={value} onChange={onChange} />
        </FlexBox>
      </>
    );
  },
  parameters: {
    controls: {
      exclude: /.*/g,
    },
  },
};

/**
 * `emptyIcon`와 `filledIcon` 속성을 통해서 아이콘을 재정의할 수 있습니다.
 */
export const CustomIcon: Story = {
  render: () => {
    const HeartBorderIcon = () => {
      return (
        <svg
          viewBox="0 0 24 24"
          color="#999"
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
        >
          <path
            d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z"
            fillRule="nonzero"
          />
        </svg>
      );
    };

    const HeartIcon = () => {
      return (
        <svg
          viewBox="0 0 24 24"
          color="#FF6647"
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
        >
          <path
            d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
            fillRule="nonzero"
          />
        </svg>
      );
    };

    return (
      <>
        <FlexBox>
          <Rating
            name="custom-icon-value-1"
            size={42}
            defaultValue={5}
            emptyIcon={<HeartBorderIcon />}
            filledIcon={<HeartIcon />}
          />
        </FlexBox>
      </>
    );
  },
};

/**
 * Rating 컴포넌트는 Radio Group 으로 구현되며, 자연스러운 동작을 위해서 `highlightSelectedOnly` 설정해야합니다.
 */
export const RadioGroup: Story = {
  render: (args) => {
    const AngryIcon = () => {
      return (
        <svg viewBox="0 0 24 24" color="#F44336">
          <circle cx="15.5" cy="9.5" r="1.5"></circle>
          <circle cx="8.5" cy="9.5" r="1.5"></circle>
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z"></path>
        </svg>
      );
    };

    const ConfuseIcon = () => {
      return (
        <svg viewBox="0 0 24 24" color="#FF9800">
          <circle cx="15.5" cy="9.5" r="1.5"></circle>
          <circle cx="8.5" cy="9.5" r="1.5"></circle>
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-3.5c.73 0 1.39.19 1.97.53.12-.14.86-.98 1.01-1.14-.85-.56-1.87-.89-2.98-.89-1.11 0-2.13.33-2.99.88.97 1.09.01.02 1.01 1.14.59-.33 1.25-.52 1.98-.52z"></path>
        </svg>
      );
    };

    const CalmIcon = () => {
      return (
        <svg viewBox="0 0 24 24" color="#FFEB3B">
          <circle cx="15.5" cy="9.5" r="1.5"></circle>
          <circle cx="8.5" cy="9.5" r="1.5"></circle>
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-4c-.73 0-1.38-.18-1.96-.52-.12.14-.86.98-1.01 1.15.86.55 1.87.87 2.97.87 1.11 0 2.12-.33 2.98-.88-.97-1.09-.01-.02-1.01-1.15-.59.35-1.24.53-1.97.53z"></path>
        </svg>
      );
    };

    const SmileIcon = () => {
      return (
        <svg viewBox="0 0 24 24" color="#CDDC39">
          <circle cx="15.5" cy="9.5" r="1.5"></circle>
          <circle cx="8.5" cy="9.5" r="1.5"></circle>
          <path d="M12 16c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2zm-.01-14C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
        </svg>
      );
    };

    const LaughIcon = () => {
      return (
        <svg viewBox="0 0 24 24" color="#4CAF50">
          <circle cx="15.5" cy="9.5" r="1.5"></circle>
          <circle cx="8.5" cy="9.5" r="1.5"></circle>
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5 4s4.22-1.66 5-4H7z"></path>
        </svg>
      );
    };

    const icons: Record<number, React.ReactElement> = {
      1: <AngryIcon />,
      2: <ConfuseIcon />,
      3: <CalmIcon />,
      4: <SmileIcon />,
      5: <LaughIcon />,
    };

    const FaceIcon = (props: IconContainerProps) => {
      const { value, ...rest } = props;

      return <span {...rest}>{icons[value]}</span>;
    };

    return (
      <>
        <FlexBox>
          <Rating
            name="icon-container-component-1"
            max={5}
            size={42}
            defaultValue={4}
            IconContainerComponent={FaceIcon}
            {...args}
          />
        </FlexBox>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['highlightSelectedOnly'],
    },
  },
  args: {
    highlightSelectedOnly: true,
  },
};
