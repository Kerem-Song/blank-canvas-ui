import { Meta, StoryObj } from '@storybook/react';

import { RadioGroup } from './RadioGroup';
import { IRadioOptions } from './RadioGroup.types';

const meta: Meta = {
  title: 'components/data-entry/Radio/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '라디오 버튼이 여러개 있는 컴포넌트',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export default meta;

type Story = StoryObj<IRadioOptions>;

export const Default: Story = {
  render: (args) => {
    return (
      <RadioGroup
        options={args.options}
        name={args.name}
        vertical={args.vertical}
        gap={args.gap}
      />
    );
  },
  args: {
    name: 'test1',
    options: [
      { label: '1', value: '1', defaultChecked: true },
      { label: '2', value: 2 },
      { label: '3', value: '3', disabled: true },
      { label: '4', value: '4' },
    ],
    vertical: false,
    gap: 20,
  },
};
