import { Textarea, ITextareaProps } from '@components';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'components/data-entry/Textarea/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '텍스트 입력',
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
    showCount: true,
    maxLength: 100,
  },
};
