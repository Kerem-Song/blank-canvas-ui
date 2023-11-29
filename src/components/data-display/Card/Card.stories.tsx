import { Card, Flex, ICardProps } from '@components';
import { Meta, StoryObj } from '@storybook/react';

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
          extra={args.extra}
          rounded={args.rounded}
          bordered={args.bordered}
          size={args.size}
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
    extra: <a href="#">More</a>,
    rounded: false,
    bordered: true,
    size: 'default',
    titleBgColor: 'yellow',
    titleColor: 'green',
  },
};
