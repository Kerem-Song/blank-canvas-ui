import { Switch } from '@components';
import { Meta, StoryObj } from '@storybook/react';
import { InputHTMLAttributes } from 'react';

const meta: Meta = {
  title: 'components/data-entry/Switch/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '스위치',
  },
};

export default meta;

type Story = StoryObj<InputHTMLAttributes<HTMLInputElement>>;

export const Default: Story = {
  render: (args) => {
    return (
      <Switch
        onChange={() => {
          alert('on click');
        }}
        checked={args.checked}
      />
    );
  },
};
