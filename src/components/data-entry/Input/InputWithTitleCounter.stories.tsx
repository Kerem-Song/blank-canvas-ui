import { Meta, StoryObj } from '@storybook/react';
import { InputWithTitleCounter } from './InputWithTitleCounter';
import { IInputWithTitleCounterProps } from '@components';

const meta: Meta = {
  title: 'components/data-entry/Input/InputWithTitleCounter',
  component: InputWithTitleCounter,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<IInputWithTitleCounterProps>;

export const Default: Story = {
  render: (args) => {
    return <InputWithTitleCounter {...args} />;
  },
  args: {
    direction: 'top',
    showCount: true,
    isError: false,
    label: 'title',
    maxLength: 100,
  },
};
