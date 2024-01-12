import { Meta, StoryObj } from '@storybook/react';

import { Spin } from './Spin';
import { ISpinProps } from './Spin.types';

const meta: Meta = {
  title: 'components/feedback/Spin',
  component: Spin,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '',
  },
};

export default meta;
type Story = StoryObj<ISpinProps>;

export const Default2: Story = {
  render: (args) => {
    return (
      <div style={{ height: 100, border: '1px solid' }}>
        <Spin
          tip={args.tip}
          size={args.size}
          color={args.color}
          type={args.type}
          delay={args.delay}
          spinning={args.spinning}
        />
      </div>
    );
  },
  args: {
    size: 35,
    color: 'pink',
    type: 'spinningBubbles',
    delay: 0,
    spinning: true,
  },
};

export const Tip: Story = {
  render: (args) => {
    return (
      <div style={{ height: 100, border: '1px solid' }}>
        <Spin tip={args.tip} type={args.type} />
      </div>
    );
  },
  args: {
    tip: 'loading...',
    type: 'spinningBubbles',
  },
};

export const Fullscreen: Story = {
  render: (args) => {
    return <Spin fullscreen={args.fullscreen} tip={args.tip} size={args.size} />;
  },
  args: {
    tip: 'loading...',
    size: 35,
    fullscreen: true,
  },
};

export const Indicator: Story = {
  render: (args) => {
    return (
      <div style={{ height: 100, border: '1px solid' }}>
        <Spin indicator={args.indicator} />
      </div>
    );
  },
  args: {
    indicator: <div>스핀테스트</div>,
  },
};
