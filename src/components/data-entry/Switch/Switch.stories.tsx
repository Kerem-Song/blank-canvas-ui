import { ISwitchProps, Switch } from '@components';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'components/data-entry/Switch/Switch',
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
      />
    );
  },
};
