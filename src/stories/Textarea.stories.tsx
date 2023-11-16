import { Textarea, TextareaProps } from "@components";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta ={
  title: 'components/data-entry/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<TextareaProps>;

export const Default: Story = {
  render: (args) => {
    return(
      <div>
        <Textarea {...args} />
      </div> 
    )
  },
}


