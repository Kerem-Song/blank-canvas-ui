import { Meta, StoryObj } from '@storybook/react';

import { Flex } from '../flex';

import { Divider } from './Divider';
import { IDividerProps } from './Divider.types';

const meta: Meta = {
  title: 'components/layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '구분선으로 콘텐츠를 구분',
  },
};

export default meta;
type Story = StoryObj<IDividerProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <Flex style={{ height: 100, border: '1px solid' }} justify="center" align="center">
        <div style={{ width: '100%', margin: '20px' }}>
          test
          <Divider />
          test1
          <Divider />
          test2
        </div>
      </Flex>
    );
  },
  args: {},
};

export const Vertical: Story = {
  render: (args) => {
    return (
      <Flex style={{ height: 100, border: '1px solid' }} justify="center" align="center">
        <div>
          test
          <Divider type={args.type} />
          test1
          <Divider type={args.type} />
          test2
        </div>
      </Flex>
    );
  },
  args: {
    type: 'vertical',
  },
};

export const BorderStyle: Story = {
  render: (args) => {
    return (
      <Flex style={{ height: 100, border: '1px solid' }} justify="center" align="center">
        <div>
          test
          <Divider borderStyle={args.borderStyle} type={args.type} />
          test1
          <Divider borderStyle={args.borderStyle} type={args.type} />
          test2
        </div>
      </Flex>
    );
  },
  args: {
    // type: '',
    borderStyle: 'dashed',
  },
};
