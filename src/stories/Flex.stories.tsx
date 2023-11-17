import { Meta, StoryObj } from '@storybook/react';
import { Flex, IFlexProps } from '@components';

const meta: Meta<IFlexProps> = {
  title: 'components/layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '각 요소들을 유동적으로 배치하는 레이아웃 배치 기능',
  },
};

export default meta;
type Story = StoryObj<IFlexProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ height: 100, border: '1px solid' }}>
        <Flex
          vertical={args.vertical}
          justify={args.justify}
          align={args.align}
          style={{ height: 100 }}
          gap={args.gap}
          wrap={args.wrap}
          reverse={args.reverse}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '25%',
                height: 30,
                backgroundColor: i % 2 ? '#1677ff' : '#1677ffbf',
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {i + 1}
            </div>
          ))}
        </Flex>
      </div>
    );
  },
  args: {
    vertical: false,
    justify: 'center',
    align: 'flex-end',
    gap: 10,
    wrap: 'nowrap',
    reverse: false,
  },
};
