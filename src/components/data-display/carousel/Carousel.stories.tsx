import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Carousel } from './Carousel';
import { ICarouselProps } from './Carousel.types';

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
const carousels = [
  {
    num: 1,
  },
  {
    num: 2,
  },
  {
    num: 3,
  },
  {
    num: 4,
  },
  {
    num: 5,
  },
  {
    num: 6,
  },
  {
    num: 7,
  },
];
export const Default: Story = {
  render: (args) => {
    const contentStyle: React.CSSProperties = {
      height: '160px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    };

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
    setCarouselIndex: () => {},
    addCarousel: () => {},
    deleteCarousel: () => {},
    dotsBottom: 9,
    arrowBtnMarginTop: 100,
    opacity: 30,
  },
};

export const Editable: Story = {
  render: function Render(args) {
    const [state, setState] = useState<{ num: number }[]>(carousels);

    const contentStyle: React.CSSProperties = {
      height: '160px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    };

    const addCarousel = () => {
      setState(state.concat({ num: carousels.length + 1 }));
    };
    console.log('@add', state);
    console.log('@arg', args.index);
    const deleteCarousel = (index: number) => {
      console.log('@index:', index);
      const frontPart = state.slice(0, index);
      const lastPart = state.slice(index + 1); // index to end of array

      setState([...frontPart, ...lastPart]);
    };

    return (
      <Carousel
        {...args}
        addCarousel={addCarousel}
        deleteCarousel={(cur: number) => deleteCarousel(cur)}
      >
        {state.map((carousel) => (
          <div key={carousel.num}>
            <h3 style={contentStyle}>{carousel.num}</h3>
          </div>
        ))}
      </Carousel>
    );
  },
  args: {
    viewId: 'viewId',
    type: 'editable',
    index: 0,
    limit: 9,
    setCarouselIndex: () => {},
    addCarousel: () => {},
    deleteCarousel: () => {},
    dotsBottom: 10,
  },
};
