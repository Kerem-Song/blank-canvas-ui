import { Tag } from '@components/data-display/tag';
import { Flex } from '@components/layout/flex';
import IcSearch from '@icons/ic_search.svg?react';
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
        justify="center"
        align="center"
      >
        <Tag>Tag1</Tag>
      </Flex>
    );
  },
};

export const color: Story = {
  render: () => {
    return (
      <Flex
        style={{ height: '100px', border: '1px solid' }}
        justify="space-around"
        align="center"
      >
        <Tag color="red">red</Tag>
        <Tag color="green">green</Tag>
        <Tag color="#2db7f5">#2db7f5</Tag>
        <Tag color="#f50">#f50</Tag>
      </Flex>
    );
  },
};

export const Bordered: Story = {
  render: () => {
    return (
      <Flex
        style={{ height: '100px', border: '1px solid' }}
        justify="center"
        align="center"
      >
        <Tag bordered={false}>none-bordered</Tag>
      </Flex>
    );
  },
};

export const Icon: Story = {
  render: () => {
    return (
      <Flex
        style={{ height: '100px', border: '1px solid' }}
        justify="center"
        align="center"
      >
        <Tag icon={<IcSearch />}>icon</Tag>
      </Flex>
    );
  },
};

export const onClose: Story = {
  render: () => {
    return (
      <Flex
        style={{ height: '100px', border: '1px solid' }}
        justify="space-around"
        align="center"
      >
        <Tag
          closeIcon={true}
          onClose={() => {
            alert('클릭');
          }}
        >
          close TAG
        </Tag>
      </Flex>
    );
  },
};
