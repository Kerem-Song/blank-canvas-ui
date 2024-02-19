import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Col, Row } from '@components/layout';
import { remUtil } from '@modules/utils/rem';
import classNames from 'classnames';

import { ICarouselProps } from './Carousel.types';
import { carouselClasses } from './CarouselClasses';

export const Carousel = forwardRef<HTMLDivElement, ICarouselProps>((args, ref) => {
  const {
    className,
    viewId,
    width,
    type = 'default',
    children,
    index = 0,
    limit,
    readOnly,
    useArrowBtn = true,
    arrowBtnMarginTop = 0,
    arrowBtnShape = 'square',
    useIndicator = true,
    dotsBottom = 20,
    opacity = 30,
    auto = true,
    delay = 3000,
    addCarousel,
    deleteCarousel,
    setCarouselIndex,
    ...carouselProps
  } = args;

  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselWrapperWidth = carouselWrapperRef.current?.offsetWidth;
  const CAROUSEL_WIDTH = width ?? carouselWrapperWidth;
  const CAROUSEL_LIMIT = limit ?? children.length;

  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `${remUtil.rem(current * -(CAROUSEL_WIDTH ?? 0))}`,
    transition: 'none',
  });

  const length = children.length;

  const rootClassName = classNames(
    carouselClasses.root,
    {
      // 캐로셀 버튼과 indicator의 opacity
      [carouselClasses.opacity.op30]: opacity === 30,
      [carouselClasses.opacity.op50]: opacity === 50,
      [carouselClasses.opacity.op70]: opacity === 70,
    },
    className,
  );

  const arrowBtnClassName = classNames(
    carouselClasses.btn.root,
    {
      // 캐로셀 버튼의 shape
      [carouselClasses.btn.shape.square]: arrowBtnShape === 'square',
      [carouselClasses.btn.shape.circle]: arrowBtnShape === 'circle',
    },
    className,
  );

  useEffect(() => {
    if (!index) {
      setCurrent(0);
    } else {
      setCurrent(index);
    }
  }, [index]);

  useEffect(() => {
    setStyle({
      marginLeft: `${remUtil.rem(current * -(CAROUSEL_WIDTH ?? 0))}`,
      transition: 'all 0.3s ease-out',
    });

    setCarouselIndex({ id: viewId, index: current });

    if (auto) {
      const delaySlider = setTimeout(() => {
        setCurrent((prev) => (prev === children.length - 1 ? 0 : prev + 1));

        setStyle({
          ...style,
          marginLeft: `${remUtil.rem(-1 * -(CAROUSEL_WIDTH ?? 0))}`,
        });
      }, delay);

      return () => clearTimeout(delaySlider);
    }
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

  return (
    <div className={classNames(rootClassName)} ref={carouselWrapperRef}>
      {type === 'editable' && addCarousel && deleteCarousel && (
        <Row justify="space-between" align="center" className="bc-carousel-btn-wrapper">
          <Row justify="center" align="center" gutter={4}>
            <Col>
              <button
                className={carouselClasses.btn.root}
                onClick={(e) => {
                  addCarousel(e);
                  setCurrent(length);
                }}
                disabled={length === CAROUSEL_LIMIT || readOnly}
                data-button={'add'}
              />
            </Col>
            <Col>
              <button
                className={carouselClasses.btn.root}
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
            <p className={carouselClasses.page}>
              {current >= children.length
                ? undefined
                : `${current + 1}/${children.length}`}
            </p>
          </Col>
          <Row justify="center" align="center" gutter={4}>
            <Col>
              <button
                className={carouselClasses.btn.root}
                onClick={handlePrevClick}
                disabled={current === 0}
                data-button={'prev'}
              />
            </Col>
            <Col>
              <button
                className={carouselClasses.btn.root}
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
          width: `${remUtil.rem(CAROUSEL_WIDTH ?? 0)}`,
        }}
        className={carouselClasses.component}
      >
        <div
          style={{ display: 'flex', ...style }}
          className={classNames(carouselClasses.contentWrapper, { auto: auto })}
        >
          {children.map((child, i) => {
            return (
              <div
                style={{ width: `${remUtil.rem(CAROUSEL_WIDTH ?? 0)}`, flex: 'none' }}
                key={`card-wrap-${i}`}
              >
                {i === current
                  ? child
                  : !readOnly && (
                      <div style={{ width: `${remUtil.rem(CAROUSEL_WIDTH ?? 0)}` }}></div>
                    )}
              </div>
            );
          })}
        </div>
      </div>

      {useIndicator ? (
        <div className={carouselClasses.dots}>
          {children.map((child, i) => (
            <button
              className={carouselClasses.dotsBtn}
              data-carousel-index={current === i}
              key={i}
              onClick={() => setCurrent(i)}
              style={{ bottom: `${remUtil.rem(dotsBottom)}` }}
            ></button>
          ))}
        </div>
      ) : null}

      {type === 'default' && useArrowBtn ? (
        <Row
          className={carouselClasses.arrowBtnWrapper}
          style={{
            marginTop: `-${remUtil.rem(arrowBtnMarginTop)}`,
          }}
        >
          <Col>
            <button
              className={arrowBtnClassName}
              onClick={handlePrevClick}
              disabled={current === 0}
              data-button={'prev'}
              title={'prev'}
            />
          </Col>
          <Col>
            <button
              className={arrowBtnClassName}
              onClick={handleNextClick}
              disabled={NextDisabled()}
              data-button={'next'}
              title={'next'}
            />
          </Col>
        </Row>
      ) : null}
    </div>
  );
});
