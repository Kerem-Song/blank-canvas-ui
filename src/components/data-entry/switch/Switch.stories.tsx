import { Meta, StoryObj } from '@storybook/react';

import { Switch } from './Switch';
import { ISwitchProps } from './Switch.types';

const meta: Meta = {
  title: 'components/data-entry/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '스위치',
  },
};

export default meta;

type Story = StoryObj<ISwitchProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <Switch
        onChange={() => {
          alert('on click');
        }}
        checked={args.checked}
        color={args.color}
        switchSize={args.switchSize}
        switchType={args.switchType}
      />
    );
  },
};
