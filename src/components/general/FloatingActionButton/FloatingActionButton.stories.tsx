import IcImg3 from '@icons/ic_collapse_arrow_up.svg?react';
import IcImg from '@icons/ic_img.svg?react';
import IcImg2 from '@icons/ic_search.svg?react';
import { Meta, StoryObj } from '@storybook/react';

import { FloatingActionButton, IFloatingActionButtonProps } from './FloatingActionButton';

const meta: Meta = {
  title: 'components/general/FloatingActionButton',
  component: FloatingActionButton,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '플로팅 버튼',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export default meta;

type Story = StoryObj<IFloatingActionButtonProps>;

export const Default: Story = {
  render: (args) => {
    return <FloatingActionButton {...args}></FloatingActionButton>;
  },
  args: {
    shape: 'circle',
    icon: <IcImg />,
    callback: () => {
      alert('floating button');
    },
    right: 30,
    bottom: 50,
  },
};

export const Square: Story = {
  render: (args) => {
    return <FloatingActionButton {...args}></FloatingActionButton>;
  },
  args: {
    shape: 'square',
    icon: <IcImg />,
    callback: () => {
      alert('floating button');
    },
    right: 30,
    bottom: 50,
  },
};

export const Group: Story = {
  render: (args) => {
    return <FloatingActionButton {...args} />;
  },
  args: {
    shape: 'circle',
    icon: <IcImg />,
    callback: () => {
      alert('floating button');
    },
    right: 30,
    bottom: 50,
    menu: [
      {
        icon: <IcImg2 />,
        callback: () => {
          console.log('@1');
        },
      },
      {
        icon: <IcImg2 />,
        callback: () => {
          console.log('@2');
        },
      },
      {
        icon: <IcImg2 />,
        callback: () => {
          console.log('@3');
        },
      },
    ],
    closeIcon: <IcImg3 />,
  },
};
