import { Flex } from '@components';
import { Meta, StoryObj } from '@storybook/react';

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
        <div>
          test
          <Divider borderStyle={args.borderStyle} type={args.type} />
          test1
          <Divider type={args.type} />
          test2
        </div>
      </Flex>
    );
  },
  args: {
    type: 'vertical',
    borderStyle: 'dashed',
  },
};
