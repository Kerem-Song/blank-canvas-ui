import { TextAreaWithTitleCounter, TitleCounterProps } from '@components';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'components/data-entry/Textarea/TextAreaWithTitleCounter',
  component: TextAreaWithTitleCounter,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<TitleCounterProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <TextAreaWithTitleCounter {...args} />
      </div>
    );
  },
};
