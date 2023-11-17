import { Radio } from '@components';
import { Meta, StoryObj } from '@storybook/react';
import { InputHTMLAttributes } from 'react';

const meta: Meta = {
  title: 'components/data-entry/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<InputHTMLAttributes<HTMLInputElement>>;

export const TitleCounter: Story = {
  render: (args) => {
    return (
      <div>
        <Radio {...args}>test1</Radio>
        <Radio {...args}>test2</Radio>
      </div>
    );
  },
};
