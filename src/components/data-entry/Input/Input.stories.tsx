import { IInputProps, Input } from '@components';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'components/data-entry/Input/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '인풋',
  },
};

export default meta;

type Story = StoryObj<IInputProps>;

export const Default: Story = {
  render: (args) => {
    return <Input {...args} />;
  },
  args: {
    // showCount: true,
    isError: false,
    // isSearch: true,
    // isClearable: true,
    // isShowAlwaysClear: true,
    // customPrefix: '$',
    // suffix: 'USD',
    placeholder: '입력해주세요',
  },
};
