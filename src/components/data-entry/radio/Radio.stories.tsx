import { Radio } from '@components/data-entry/radio/Radio';
import { Meta, StoryObj } from '@storybook/react';
import { InputHTMLAttributes } from 'react';

const meta: Meta = {
  title: 'components/data-entry/Radio/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '라디오 버튼',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export default meta;

type Story = StoryObj<InputHTMLAttributes<HTMLInputElement>>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <Radio {...args}>test1</Radio>
        <Radio {...args}>test2</Radio>
      </div>
    );
  },
};