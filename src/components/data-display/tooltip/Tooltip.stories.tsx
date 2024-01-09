import { Tooltip } from '@components/data-display/tooltip';
import { Flex } from '@components/layout/flex';
import { Meta, StoryObj } from '@storybook/react';

import { ITooltipProps } from './Tooltip.types';

const meta: Meta<ITooltipProps> = {
  title: 'components/data-display/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '간단한 텍스트 팝업',
  },
};

export default meta;
type Story = StoryObj<ITooltipProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <Flex
        style={{ height: '600px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <div
          style={{
            background: 'green',
            width: '200px',
            overflow: 'hidden',
          }}
        >
          <Tooltip
            color={args.color}
            placement={args.placement}
            defaultOpen={args.defaultOpen}
            arrow={args.arrow}
            offset={args.offset}
            disable={args.disable}
            strategy={args.strategy}
            mouseEnterDelay={args.mouseEnterDelay}
            mouseLeaveDelay={args.mouseLeaveDelay}
            open={args.open}
            description={args.description}
            tooltipWidth={args.tooltipWidth}
            arrowClassName={args.arrowClassName}
            tooltipClassName={args.tooltipClassName}
          >
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi assumenda
              ullam, velit mollitia alias nemo odit distinctio? Explicabo illum
              reprehenderit id quia eius recusandae inventore tempore debitis laborum,
              amet dolorum.
            </div>
          </Tooltip>
        </div>
      </Flex>
    );
  },
  args: {
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus sapiente ipsam omnis harum dignissimos eos, unde atque enim necessitatibus aliquid perspiciatis nemo natus consequatur incidunt tempore, qui, sint ut nisi!',
    color: 'pink',
    placement: 'right',
    defaultOpen: false,
    arrow: true,
    offset: [0, 10],
    disable: false,
    strategy: 'fixed',
    mouseEnterDelay: 0,
    tooltipWidth: 150,
    mouseLeaveDelay: 0,
    tooltipClassName: 'tooltipClass',
    arrowClassName: 'arrowClass',
  },
};

export const notArrow: Story = {
  render: () => {
    return (
      <Flex
        style={{ height: '600px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <div
          style={{
            background: 'green',
            width: '200px',
            overflow: 'hidden',
          }}
        >
          <Tooltip
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit"
            arrow={false}
          >
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi assumenda
              ullam, velit mollitia alias nemo odit distinctio? Explicabo illum
              reprehenderit id quia eius recusandae inventore tempore debitis laborum,
              amet dolorum.
            </div>
          </Tooltip>
        </div>
      </Flex>
    );
  },
};

export const DefaultOpen: Story = {
  render: () => {
    return (
      <Flex
        style={{ height: '600px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <div
          style={{
            background: 'green',
            width: '200px',
            overflow: 'hidden',
          }}
        >
          <Tooltip
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit"
            defaultOpen={true}
          >
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi assumenda
              ullam, velit mollitia alias nemo odit distinctio? Explicabo illum
              reprehenderit id quia eius recusandae inventore tempore debitis laborum,
              amet dolorum.
            </div>
          </Tooltip>
        </div>
      </Flex>
    );
  },
};

export const mouseEnterDelay500_mouseLeaveDelay1000: Story = {
  render: () => {
    return (
      <Flex
        style={{ height: '600px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <div
          style={{
            background: 'green',
            width: '200px',
            overflow: 'hidden',
          }}
        >
          <Tooltip
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit"
            mouseLeaveDelay={1000}
            mouseEnterDelay={500}
          >
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi assumenda
              ullam, velit mollitia alias nemo odit distinctio? Explicabo illum
              reprehenderit id quia eius recusandae inventore tempore debitis laborum,
              amet dolorum.
            </div>
          </Tooltip>
        </div>
      </Flex>
    );
  },
};

export const Disable: Story = {
  render: () => {
    return (
      <Flex
        style={{ height: '600px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <div
          style={{
            background: 'green',
            width: '200px',
            overflow: 'hidden',
          }}
        >
          <Tooltip
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit"
            disable={true}
          >
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi assumenda
              ullam, velit mollitia alias nemo odit distinctio? Explicabo illum
              reprehenderit id quia eius recusandae inventore tempore debitis laborum,
              amet dolorum.
            </div>
          </Tooltip>
        </div>
      </Flex>
    );
  },
};

export const Offset: Story = {
  render: () => {
    return (
      <Flex
        style={{ height: '600px', border: '1px solid' }}
        justify="space-evenly"
        align="center"
      >
        <div
          style={{
            background: 'green',
            width: '200px',
            overflow: 'hidden',
          }}
        >
          <Tooltip description="offset 100, 100" offset={[100, 100]}>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi assumenda
              ullam, velit mollitia alias nemo odit distinctio? Explicabo illum
              reprehenderit id quia eius recusandae inventore tempore debitis laborum,
              amet dolorum.
            </div>
          </Tooltip>
        </div>
      </Flex>
    );
  },
};
