import { Flex, Tag } from '@components';
import { Meta, StoryObj } from '@storybook/react';

import { ITagProps } from './Tag.types';

const meta: Meta<ITagProps> = {
  title: 'components/data-display/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '태그 표시',
  },
};

export default meta;
type Story = StoryObj<ITagProps>;

export const Default: Story = {
  render: () => {
    return (
      <Flex
        style={{ height: '100px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <Tag>Tag1</Tag>
        <Tag bordered={false}>none-bordered</Tag>
        <Tag
          closeIcon={true}
          onClose={() => {
            alert('클릭');
          }}
        >
          close TAG
        </Tag>
        <Tag color="red">Color tag</Tag>
      </Flex>
    );
  },
};
