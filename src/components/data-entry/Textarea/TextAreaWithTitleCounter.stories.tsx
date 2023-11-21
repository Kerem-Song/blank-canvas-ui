import { TextAreaWithTitleCounter, TitleCounterProps } from '@components';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'components/data-entry/Textarea/TextAreaWithTitleCounter',
  component: TextAreaWithTitleCounter,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '제목과 입력 글자 수 표시가 가능한 텍스트 입력',
  },
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
  args: {
    label: 'title',
    direction: 'top',
    maxRows: 5,
    minRows: 2,
    showCount: true,
    isError: false,
    maxLength: 100,
  },
};
