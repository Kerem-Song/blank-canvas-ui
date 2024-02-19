import { Meta, StoryObj } from '@storybook/react';

import { IRowProps } from './Row.types';
import { Col, Row } from '.';

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
        >
          <Col style={{ backgroundColor: 'skyblue' }} span={24}>
            col
          </Col>
        </Row>

        <Row
          align={args.align}
          wrap={args.wrap}
          gutter={args.gutter}
          justify={args.justify}
          style={{ margin: '8px 0' }}
        >
          <Col style={{ backgroundColor: 'skyblue' }} span={12}>
            col span 12
          </Col>
          <Col style={{ backgroundColor: 'skyblue' }} span={12}>
            col span 12
          </Col>
        </Row>

        <Row
          align={args.align}
          wrap={args.wrap}
          gutter={args.gutter}
          justify={args.justify}
          style={{ margin: '8px 0' }}
        >
          <Col style={{ backgroundColor: 'skyblue' }} span={8}>
            col span 8
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} span={8}>
            col span 8
          </Col>
          <Col style={{ backgroundColor: 'skyblue' }} span={8}>
            col span 8
          </Col>
        </Row>

        <Row
          align={args.align}
          wrap={args.wrap}
          gutter={args.gutter}
          justify={args.justify}
        >
          <Col style={{ backgroundColor: 'skyblue' }} span={6}>
            col span 6
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} span={6}>
            col span 6
          </Col>
          <Col style={{ backgroundColor: 'skyblue' }} span={6}>
            col span 6
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} span={6}>
            col span 6
          </Col>
        </Row>
      </div>
    );
  },
  args: {
    gutter: [5, 5],
    wrap: 'wrap',
    justify: 'flex-start',
    align: 'center',
  },
};

export const Gutter: Story = {
  render: () => {
    return (
      <div style={{ height: 300, border: '1px solid' }}>
        <Row gutter={[20, 20]} style={{ backgroundColor: '#dcdcdc' }}>
          <Col style={{ backgroundColor: 'skyblue' }} span={6}>
            col span 6
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} span={6}>
            col span 6
          </Col>
          <Col style={{ backgroundColor: 'skyblue' }} span={6}>
            col span 6
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} span={6}>
            col span 6
          </Col>
          <Col style={{ backgroundColor: 'skyblue' }} span={6}>
            col span 6
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} span={6}>
            col span 6
          </Col>
          <Col style={{ backgroundColor: 'skyblue' }} span={6}>
            col span 6
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} span={6}>
            col span 6
          </Col>
        </Row>
      </div>
    );
  },
};
