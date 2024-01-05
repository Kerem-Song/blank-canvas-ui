import { carouselClasses } from '@components/data-display/carousel/CarouselClasses';
import { Col, Row } from '@components/layout';
import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { util } from 'src/utils/utils';

import { ICarouselProps } from './Carousel.types';

export const Carousel = forwardRef<HTMLDivElement, ICarouselProps>((args, ref) => {
  const {
    prefix,
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
  const CAROUSEL_LIMIT = limit;

  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState({
    marginLeft: `${util.rem(current * -(CAROUSEL_WIDTH ?? 0))}`,
    transition: 'none',
  });

  const length = children.length;

  const classes = generatePrefixClasses(
    carouselClasses,
    `${prefix ? `${prefix}-` : ''}carousel`,
  );

  const rootClassName = classNames(
    classes.root,
    {
      // 캐로셀 버튼과 indicator의 opacity
      [classes.opacity30]: opacity === 30,
      [classes.opacity50]: opacity === 50,
      [classes.opacity70]: opacity === 70,
    },
    className,
  );

  const arrowBtnClassName = classNames(
    'carousel-btn',
    {
      // 캐로셀 버튼의 shape
      [classes.btnSquare]: arrowBtnShape === 'square',
      [classes.btnCircle]: arrowBtnShape === 'circle',
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
      marginLeft: `${util.rem(current * -(CAROUSEL_WIDTH ?? 0))}`,
      transition: 'all 0.3s ease-out',
    });

    setCarouselIndex({ id: viewId, index: current });

    if (auto) {
      const delaySlider = setTimeout(() => {
        setCurrent((prev) => (prev === children.length - 1 ? 0 : prev + 1));
        setStyle({
          ...style,
          marginLeft: `${util.rem(-1 * -(CAROUSEL_WIDTH ?? 0))}`,
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
    <div
      className={classNames('carousel-wrapper', rootClassName)}
      ref={carouselWrapperRef}
    >
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
        <div
          style={{ display: 'flex', ...style }}
          className={classNames('carousel-content-wrapper', { auto: auto })}
        >
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
              style={{ bottom: `${util.rem(dotsBottom)}` }}
            ></button>
          ))}
        </div>
      ) : null}

      {type === 'default' && useArrowBtn ? (
        <Row
          className="arrow-btn-wrapper"
          style={{
            marginTop: `-${util.rem(arrowBtnMarginTop)}`,
          }}
        >
          <Col>
            <button
              className={arrowBtnClassName}
              onClick={handlePrevClick}
              disabled={current === 0}
              data-button={'prev'}
            />
          </Col>
          <Col>
            <button
              className={arrowBtnClassName}
              onClick={handleNextClick}
              disabled={NextDisabled()}
              data-button={'next'}
            />
          </Col>
        </Row>
      ) : null}
    </div>
  );
});
