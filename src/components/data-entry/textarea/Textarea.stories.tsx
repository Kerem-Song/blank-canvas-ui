import { Meta, StoryObj } from '@storybook/react';

import { Textarea } from './Textarea';
import { ITextareaProps } from './Textarea.types';

const meta: Meta = {
  title: 'components/data-entry/Textarea/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '텍스트 입력',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export default meta;

type Story = StoryObj<ITextareaProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <Textarea {...args} />
      </div>
    );
  },
  args: {
    maxRows: 5,
    minRows: 2,
    maxLength: 100,
    disabled: false,
  },
};
