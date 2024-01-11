import { render, screen } from '@testing-library/react';

import { Carousel } from '.';

describe('<Carousel />', () => {
  const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const setCarouselIndex = vi.fn();
  const handleAddButton = vi.fn();
  const handleDeleteButton = vi.fn();

  it('렌더링 체크', () => {
    render(
      <Carousel
        viewId="test"
        type="default"
        index={0}
        limit={2}
        setCarouselIndex={setCarouselIndex}
        addCarousel={handleAddButton}
        deleteCarousel={handleDeleteButton}
        title={'carousel'}
      >
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>,
    );

    const carousel = screen.getByRole('presentation').parentElement;
    expect(carousel?.classList.contains('bc-carousel')).toBeTruthy();
  });

  it('useArrowBtn 작동 체크', () => {
    render(
      <Carousel
        viewId="test"
        type="default"
        index={0}
        limit={2}
        setCarouselIndex={setCarouselIndex}
        addCarousel={handleAddButton}
        deleteCarousel={handleDeleteButton}
        title={'carousel'}
        useArrowBtn={true}
      >
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>,
    );

    const carousel = screen.getByRole('presentation').parentElement;
    // const nextBtn = screen.getByRole('button', { name: 'next' });
  });
});
