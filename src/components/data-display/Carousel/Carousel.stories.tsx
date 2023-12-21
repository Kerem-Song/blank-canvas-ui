import { Meta, StoryObj } from '@storybook/react';

import { Carousel, ICarouselProps } from '.';

const meta: Meta = {
  title: 'components/data-display/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '캐로셀(슬라이더)',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export default meta;

type Story = StoryObj<ICarouselProps>;

export const Default: Story = {
  render: (args) => {
    const contentStyle: React.CSSProperties = {
      height: '160px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    };

    const handleDeleteButton = (index: number) => {
      console.log('@handle delete btn');
    };

    const handleAddButton = (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log('@handle add btn');
    };
    const setCarouselIndex = ({ id, index }: { id: string; index: number }) => {};

    return (
      <Carousel {...args}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
        <div>
          <h3 style={contentStyle}>5</h3>
        </div>
        <div>
          <h3 style={contentStyle}>6</h3>
        </div>
        <div>
          <h3 style={contentStyle}>7</h3>
        </div>
        <div>
          <h3 style={contentStyle}>8</h3>
        </div>
        <div>
          <h3 style={contentStyle}>9</h3>
        </div>
      </Carousel>
    );
  },
  args: {
    viewId: 'viewId',
    // width:{1140},
    index: 0,
    limit: 9,
    setCarouselIndex: () => {
      console.log('@handle set carousel index btn');
    },
    addCarousel: () => {
      console.log('@handle add btn');
    },
    deleteCarousel: () => {
      console.log('@handle delete btn');
    },
    dotsBottom: 150,
  },
};
