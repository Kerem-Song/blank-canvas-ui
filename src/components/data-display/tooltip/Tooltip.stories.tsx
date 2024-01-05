import { Flex, Tooltip } from '@components';
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
            text={args.text}
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
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus sapiente ipsam omnis harum dignissimos eos, unde atque enim necessitatibus aliquid perspiciatis nemo natus consequatur incidunt tempore, qui, sint ut nisi!',
    color: 'pink',
    placement: 'right',
    defaultOpen: true,
    arrow: true,
    offset: [0, 10],
    disable: false,
    strategy: 'fixed',
    mouseEnterDelay: 2,
    tooltipWidth: 150,
    open: true,
    mouseLeaveDelay: 2,
    tooltipClassName: 'tooltipClass',
    arrowClassName: 'arrowClass',
  },
};
