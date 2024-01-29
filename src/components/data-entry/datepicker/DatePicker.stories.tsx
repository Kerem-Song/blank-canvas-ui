import { Flex } from '@components/layout/flex';
import { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '.';
import { IDatePickerProps } from './DatePicker.types';

const meta: Meta<IDatePickerProps> = {
  title: 'components/data-entry/DatePicker',
  component: DatePicker,

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<IDatePickerProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <Flex>
        <DatePicker {...args} />
      </Flex>
    );
  },
  args: {},
};
