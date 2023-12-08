import { Col, Divider, IColProps, Row } from '@components';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<IColProps> = {
  title: 'components/layout/Grid/Col',
  component: Col,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: '',
  },
};

export default meta;
type Story = StoryObj<IColProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ height: 100, border: '1px solid' }}>
        <Row wrap={'wrap'} gutter={2} style={{ backgroundColor: '#dcdcdc' }}>
          <Col style={{ backgroundColor: 'skyblue' }} flex={args.flex} span={args.span}>
            flex
          </Col>
          <Col style={{ backgroundColor: 'yellowgreen' }} flex="auto">
            auto
          </Col>
        </Row>
      </div>
    );
  },
  args: {
    flex: '200px',
    span: 1,
    gutter: 2,
  },
};

export const OrderCol: Story = {
  render: () => {
    return (
      <div style={{ height: 100, border: '1px solid' }}>
        <Row>
          <Col span={6} order={4} style={{ backgroundColor: 'yellowgreen' }}>
            1 col-order-4
          </Col>
          <Col span={6} order={3} style={{ backgroundColor: 'skyblue' }}>
            2 col-order-3
          </Col>
          <Col span={6} order={2} style={{ backgroundColor: 'yellowgreen' }}>
            3 col-order-2
          </Col>
          <Col span={6} order={1} style={{ backgroundColor: 'skyblue' }}>
            4 col-order-1
          </Col>
        </Row>
      </div>
    );
  },
};

export const FlexCol: Story = {
  render: () => {
    return (
      <div style={{ height: 100, border: '1px solid' }}>
        <Row>
          <Col flex={2} style={{ backgroundColor: 'skyblue' }}>
            2 / 5
          </Col>
          <Col flex={3} style={{ backgroundColor: 'yellowgreen' }}>
            3 / 5
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col flex="100px" style={{ backgroundColor: 'skyblue' }}>
            100px
          </Col>
          <Col flex="auto" style={{ backgroundColor: 'yellowgreen' }}>
            Fill Rest
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col flex="1 1 200px" style={{ backgroundColor: 'skyblue' }}>
            1 1 200px
          </Col>
          <Col flex="0 1 300px" style={{ backgroundColor: 'yellowgreen' }}>
            0 1 300px
          </Col>
        </Row>
        <Divider />
        <Row wrap={'nowrap'}>
          <Col flex="none" style={{ backgroundColor: 'skyblue' }}>
            <div style={{ padding: '0 16px' }}>none</div>
          </Col>
          <Col flex="auto" style={{ backgroundColor: 'yellowgreen' }}>
            auto with no-wrap
          </Col>
        </Row>
      </div>
    );
  },
};