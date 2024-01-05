import { Meta, StoryObj } from '@storybook/react';

import { Col, Row } from '.';
import { IRowProps } from './Row.types';

const meta: Meta<IRowProps> = {
  title: 'components/layout/Grid/Row',
  component: Row,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '',
  },
};

export default meta;
type Story = StoryObj<IRowProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ height: 300, border: '1px solid' }}>
        <Row
          align={args.align}
          wrap={args.wrap}
          gutter={args.gutter}
          justify={args.justify}
          style={{ backgroundColor: '#dcdcdc' }}
        >
          <Col style={{ backgroundColor: 'skyblue' }} span={6}>
            span 6
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} span={6}>
            span 6
          </Col>
          <Col style={{ backgroundColor: 'skyblue' }} span={6}>
            span 6
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} span={6}>
            span 6
          </Col>
          <Col style={{ backgroundColor: 'skyblue' }} span={6}>
            span 6
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} span={6}>
            span 6
          </Col>
          <Col style={{ backgroundColor: 'skyblue' }} span={6}>
            span 6
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} span={6}>
            span 6
          </Col>
        </Row>
      </div>
    );
  },
  args: {
    gutter: [2, 4],
    wrap: 'wrap',
    justify: 'flex-start',
    align: 'center',
  },
};
