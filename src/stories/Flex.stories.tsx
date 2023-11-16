import { Meta, StoryObj } from '@storybook/react';
import { Flex, IFlexProps } from '@components';

const meta: Meta = {
  title: 'components/layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '각 요소들을 유동적으로 배치하는 레이아웃 배치 기능',
  },
  argTypes: {
    vertical: {
      description: '아이템들이 배치되는 축의 방향을 결정',
      table: {
        type: { summary: 'boolean' },
      },
    },
    justify: {
      type: 'string',
      description: '메인축 방향으로 아이템을 정렬하는 속성 ',
      table: {
        type: {
          summary:
            'flex-start | space-between | center | space-between | space-around | space-evenly',
        },
      },
    },
    align: {
      type: 'string',
      description: '수직축 방향',
      table: {
        type: { summary: 'flex-start | flex-end | center' },
      },
    },
    gap: {
      type: 'number',
      description: '행과 열 사이의 간격 (gutters)을 설정',
      table: {
        type: { summary: 'number' },
      },
    },
    wrap: {
      type: 'string',
      description:
        '컨테이너가 더 이상 아이템들을 한 줄에 담을 여유 공간이 없을 때 아이템 줄바꿈을 어떻게 할지 결정하는 속성',
    },
    reverse: {
      description: '아이템 역순 배치할지 결정',
      table: {
        type: { summary: 'boolean' },
      },
    },
    style: {
      description: 'css 속성 설정',
    },
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
