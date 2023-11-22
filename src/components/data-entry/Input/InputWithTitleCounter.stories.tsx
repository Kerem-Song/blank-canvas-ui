import { Meta, StoryObj } from '@storybook/react';
import { InputWithTitleCounter } from './InputWithTitleCounter';
import { IInputWithTitleCounterProps } from '@components';

const meta: Meta = {
  title: 'components/data-entry/Input/InputWithTitleCounter',
  component: InputWithTitleCounter,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '제목과 입력한 글자수 표시가 가능한 입력창',
  },
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
    customPrefix: '$',
    suffix: 'USD',
    disabled: false,
  },
};
