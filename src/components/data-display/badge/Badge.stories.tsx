import { Badge, Flex } from '@components';
import { Meta, StoryObj } from '@storybook/react';

import { IBadgeProps } from './Badge.types';

const meta: Meta = {
  title: 'components/data-display/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: 'Badge 적용 컴포넌트',
  },
};

export default meta;
type Story = StoryObj<IBadgeProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <Flex style={{ height: 100, border: '1px solid' }} justify="center" align="center">
        <Badge
          count={args.count}
          overflowCount={args.overflowCount}
          color={args.color}
          dot={args.dot}
          showZero={args.showZero}
        >
          <div style={{ border: '1px solid' }}>test</div>
        </Badge>
      </Flex>
    );
  },
  args: {
    color: '',
    count: 1,
    dot: false,
    overflowCount: 99,
    showZero: false,
  },
};
