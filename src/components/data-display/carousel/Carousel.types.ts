import { HTMLAttributes } from 'react';

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
  type?: 'default' | 'editable';

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
  limit?: number;

  /**
   * readonly 속성
   */
  readOnly?: boolean;

  /**
   * 캐로셀 이동 버튼 사용 유무(editable에서는 기본 제공)
   */
  useArrowBtn?: boolean;

  /**
   * 캐로셀 이동 버튼의 수직(vertical)위치(숫자 입력시 rem으로 환산 됨)
   */
  arrowBtnMarginTop?: number;

  /**
   * 캐로셀 이동 버튼의 모양
   * @default 'square'
   */
  arrowBtnShape?: 'square' | 'circle';

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
   * arrow button, indicator button의 opacity. 속성을 주지 않을 경우 기본이 100인 상태
   * @default 30
   */
  opacity?: 30 | 50 | 70;

  /**
   * 슬라이더 자동 슬라이딩 여부
   * @defalt false
   */
  auto?: boolean;

  /**
   * 슬라이더 작동이 auto일 경우 delay(ms단위 1000ms = 1초)
   * @default 3000
   */
  delay?: number;

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
