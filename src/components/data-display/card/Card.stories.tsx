import { Card } from '@components/data-display/card';
import { Flex } from '@components/layout/flex';
import { Meta, StoryObj } from '@storybook/react';

import { ICardProps } from './Card.types';

const meta: Meta<ICardProps> = {
  title: 'components/data-display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '카드형 컨테이너',
  },
};

export default meta;
type Story = StoryObj<ICardProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <Flex
        style={{ height: '150px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <Card
          title={args.title}
          // extra={args.extra}
          rounded={args.rounded}
          bordered={args.bordered}
          size={args.size}
          // titleBgColor={args.titleBgColor}
          // titleColor={args.titleColor}
        >
          <p> 카드 내용 </p>
        </Card>
      </Flex>
    );
  },
  args: {
    title: '제목',
    // extra: <a href="#">More</a>,
    rounded: false,
    bordered: true,
    size: 'default',
    // titleBgColor: 'yellow',
    // titleColor: 'green',
  },
};

export const Color: Story = {
  render: (args) => {
    return (
      <Flex
        style={{ height: '150px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <Card
          title={args.title}
          titleBgColor={args.titleBgColor}
          titleColor={args.titleColor}
        >
          <p> 카드 내용 </p>
        </Card>
      </Flex>
    );
  },
  args: {
    title: '제목',
    titleBgColor: 'yellow',
    titleColor: 'green',
  },
};

export const Extra: Story = {
  render: (args) => {
    return (
      <Flex
        style={{ height: '150px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <Card title={args.title} extra={args.extra}>
          <p> 카드 내용 </p>
        </Card>
      </Flex>
    );
  },
  args: {
    title: '제목',
    extra: <a href="#">More</a>,
  },
};

export const Bordered: Story = {
  render: (args) => {
    return (
      <Flex
        style={{ height: '150px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <Card title={args.title} bordered={false}>
          <p> 카드 내용 </p>
        </Card>
      </Flex>
    );
  },
  args: {
    title: '제목',
  },
};

export const Size: Story = {
  render: (args) => {
    return (
      <Flex
        style={{ height: '150px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <Card title={args.title} size={'small'}>
          <p> 카드 내용 </p>
        </Card>
      </Flex>
    );
  },
  args: {
    title: '제목',
  },
};

export const Rounded: Story = {
  render: (args) => {
    return (
      <Flex
        style={{ height: '150px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <Card title={args.title} rounded>
          <p> 카드 내용 </p>
        </Card>
      </Flex>
    );
  },
  args: {
    title: '제목',
  },
};

export const Loading: Story = {
  render: (args) => {
    return (
      <Flex
        style={{ height: '150px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <Card title={args.title} loading>
          <p> 카드 내용 </p>
        </Card>
      </Flex>
    );
  },
  args: {
    title: '제목',
    extra: <a href="#">More</a>,
  },
};
