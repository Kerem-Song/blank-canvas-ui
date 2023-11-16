import { TextAreaWithTitleCounter, TitleCounterProps } from "@components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta ={
  title: 'components/data-entry/TextAreaWithTitleCounter',
  component: TextAreaWithTitleCounter,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<TitleCounterProps>;

export const TitleCounter: Story = {
  render:(args) => {
    return (
      <div>
        <TextAreaWithTitleCounter {...args} />
      </div>
    )
  }
}
