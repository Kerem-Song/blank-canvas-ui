import IcImg3 from '@icons/ic_collapse_arrow_up.svg';
import IcImg from '@icons/ic_img.svg';
import IcImg2 from '@icons/ic_search.svg';
import { Meta, StoryObj } from '@storybook/react';

import { FloatingActionButton } from './FloatingActionButton';
import { IFloatingActionButtonProps } from './FloatingActionButton.types';

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
    icon: IcImg,
    callback: () => {
      alert('floating button');
    },
    right: 0,
    bottom: 0,
  },
};

export const Square: Story = {
  render: (args) => {
    return <FloatingActionButton {...args}></FloatingActionButton>;
  },
  args: {
    shape: 'square',
    icon: IcImg,
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
    icon: IcImg,
    callback: () => {
      alert('floating button');
    },
    right: 30,
    bottom: 50,
    menu: [
      {
        icon: IcImg2,
        callback: () => {
          console.log('@1');
        },
        tooltip: 'test1',
        badge: { count: 1 },
      },
      {
        icon: IcImg2,
        callback: () => {
          console.log('@2');
        },
        tooltip: 'test2',
        badge: { count: 2 },
      },
      {
        icon: IcImg2,
        callback: () => {
          console.log('@3');
        },
        badge: { count: 3 },
      },
    ],
    closeIcon: IcImg3,
    trigger: 'click',
    useBadge: true,
  },
};
