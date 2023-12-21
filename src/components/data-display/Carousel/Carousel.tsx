import { Col, Row } from '@components';
import React, { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { pxToRem, util } from 'src/utils/utils';

export interface ICarouselProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 캐로셀이 할당되는 view id
   */
  viewId: string;

  /**
   * 캐로셀의 넓이(지정하지 않을 경우 carousel-component의 전체 넓이로 지정)
   */
  width?: number;

  /**
   * 캐로셀 타입(edit 버전 선택시 캐로셀 슬라이드를 추가 및 삭제할 수 있는 기능)
   * @default 'default'
   */
  type: 'default' | 'editable';

  /**
   * 캐로셀에 들어갈 슬라이드 내용들
   */
  children: React.ReactNode[];

  /**
   * 슬라이드가 시작하는 인덱스(index = 3 => 3번 인덱스 슬라이드부터 시작)
   * @default 0
   */
  index: number;

  /**
   *  보여줄 슬라이드의 갯수
   */
  limit: number;

  /**
   * readonly 속성
   */
  readOnly?: boolean;

  /**
   * 캐로셀 indicator 버튼 사용 여부
   * @default true
   */
  useIndicator?: boolean;

  /**
   * 캐로셀 슬라이더 갯수와 일치하는 indicator 버튼의 위치를 bottom css속성으로 조절
   */
  dotsBottom?: number;

  /**
   * 캐로셀 추가 버튼을 누를 때 실행되는 함수
   * @param e
   */
  addCarousel?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * 캐로셀 삭제 버튼을 누를 때 실행되는 함수
   * @param e
   */
  deleteCarousel?: (e: number) => void;

  /**
   * 중앙 store에서 처음 보여줄 슬라이드의 index를 저장할 경우 사용
   * @param id
   * @param index
   */
  setCarouselIndex: ({ id, index }: { id: string; index: number }) => void;
}

export const Carousel = forwardRef<HTMLDivElement, ICarouselProps>((args, ref) => {
  const {
    viewId,
    width,
    type = 'default',
    children,
    index = 0,
    limit,
    readOnly,
    useIndicator = true,
    dotsBottom,
    addCarousel,
    deleteCarousel,
    setCarouselIndex,
    ...carouselProps
  } = args;

  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselWrapperWidth = carouselWrapperRef.current?.offsetWidth;
  const CAROUSEL_WIDTH = width ?? carouselWrapperWidth;
  const CAROUSEL_LIMIT = limit;

  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `${util.rem(current * -(CAROUSEL_WIDTH ?? 0))}`,
    transition: 'none',
  });

  const length = children.length;

  useEffect(() => {
    if (!index) {
      setCurrent(0);
    } else {
      setCurrent(index);
    }
  }, [index]);

  useEffect(() => {
    setStyle({
      marginLeft: `${util.rem(current * -(CAROUSEL_WIDTH ?? 0))}`,
      transition: 'all 0.3s ease-out',
    });

    setCarouselIndex({ id: viewId, index: current });
  }, [current]);

  const NextDisabled = () => {
    if (current + 1 > Math.min(current + 1, length - 1, CAROUSEL_LIMIT - 1)) {
      return true;
    }

    if (
      readOnly &&
      current >= Math.min(current + 1, children.length - 1, CAROUSEL_LIMIT - 1)
    ) {
      return true;
    }

    return false;
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (NextDisabled()) {
      return;
    }
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent(current !== 0 ? current - 1 : 0);
  };

  console.log('@util.rem(CAROUSEL_WIDTH ?? 0)', util.rem(CAROUSEL_WIDTH ?? 0));

  return (
    <div className="carousel-wrapper" ref={carouselWrapperRef}>
      {type === 'editable' && addCarousel && deleteCarousel && (
        <Row justify="space-between" align="center" className="carousel-btn-wrapper">
          <Row justify="center" align="center" gutter={4}>
            <Col>
              <button
                className="carousel-btn"
                onClick={(e) => {
                  addCarousel(e);
                  setCurrent(length);
                }}
                disabled={current === CAROUSEL_LIMIT - 1 || readOnly}
                data-button={'add'}
              />
            </Col>
            <Col>
              <button
                className="carousel-btn"
                onClick={(e) => {
                  deleteCarousel(current);
                  setCurrent(current === 0 ? 0 : current - 1);
                }}
                disabled={length === 1 || readOnly}
                data-button={'delete'}
              />
            </Col>
          </Row>

          <Col>
            <p className="page">
              {current >= children.length
                ? undefined
                : `${current + 1}/${children.length}`}
            </p>
          </Col>
          <Row justify="center" align="center" gutter={4}>
            <Col>
              <button
                className="carousel-btn"
                onClick={handlePrevClick}
                disabled={current === 0}
                data-button={'prev'}
              />
            </Col>
            <Col>
              <button
                className="carousel-btn"
                onClick={handleNextClick}
                disabled={NextDisabled()}
                data-button={'next'}
              />
            </Col>
          </Row>
        </Row>
      )}
      <div
        role="presentation"
        style={{
          width: `${util.rem(CAROUSEL_WIDTH ?? 0)}`,
        }}
        className="carousel-component"
      >
        <div style={{ display: 'flex', ...style }} className="carousel-content-wrapper">
          {children.map((child, i) => {
            return (
              <div
                style={{ width: `${util.rem(CAROUSEL_WIDTH ?? 0)}`, flex: 'none' }}
                key={`card-wrap-${i}`}
              >
                {i === current
                  ? child
                  : !readOnly && (
                      <div style={{ width: `${util.rem(CAROUSEL_WIDTH ?? 0)}` }}></div>
                    )}
              </div>
            );
          })}
        </div>
      </div>
      {useIndicator ? (
        <div className="dots">
          {children.map((child, i) => (
            <button
              className="dots-button"
              data-carousel-index={current === i}
              key={i}
              onClick={() => setCurrent(i)}
            ></button>
          ))}
        </div>
      ) : null}
    </div>
  );
});
