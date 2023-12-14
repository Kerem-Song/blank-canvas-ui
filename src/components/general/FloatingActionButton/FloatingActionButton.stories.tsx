import IcImg from '@icons/ic_img.svg?react';
import { Meta, StoryObj } from '@storybook/react';

import { FloatingActionButton, IFloatingActionButtonProps } from './FloatingActionButton';

const meta: Meta = {
  title: 'components/general/FloatingActionButton/FloatingActionButton',
  component: FloatingActionButton,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '플로팅 버튼',
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
  },
};
