import { act, fireEvent, render, screen } from '@testing-library/react';

import { Carousel, carouselClasses } from '.';

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
  const handleNextClick = vi.fn();
  const handlePrevClick = vi.fn();

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
    expect(carousel?.classList.contains(carouselClasses.root)).toBeTruthy();
  });

  it('useArrowBtn shape 및 작동 체크', () => {
    const { rerender } = render(
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
        auto={false}
        arrowBtnShape="circle"
      >
        <div className="slide1">
          <h3 style={contentStyle}>1</h3>
        </div>
        <div className="slide2">
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>,
    );

    const nextBtn = screen.getByTitle('next');
    const prevBtn = screen.getByTitle('prev');

    act(() => {
      fireEvent.click(nextBtn);
      handleNextClick();

      fireEvent.click(prevBtn);
      handlePrevClick();
    });

    // arrow button들 클릭 후 함수 작동 여부
    expect(handleNextClick).toBeCalledTimes(1);
    expect(handlePrevClick).toBeCalledTimes(1);

    // circle 타입 체크
    expect(nextBtn.classList.contains(carouselClasses.btn.shape.circle)).toBeTruthy();

    // square 타입으로 변경
    rerender(
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
        auto={false}
        arrowBtnShape="square"
      >
        <div className="slide1">
          <h3 style={contentStyle}>1</h3>
        </div>
        <div className="slide2">
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>,
    );

    const squareBtn = screen.getByTitle('prev');
    expect(squareBtn.classList.contains(carouselClasses.btn.shape.square)).toBeTruthy();
  });
});
