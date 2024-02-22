import { HTMLAttributes } from 'react';

export interface IModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 모달 오픈 여부
   */
  isOpen: boolean;

  /**
   * 모달의 사이즈
   * @type 'sm' | 'md' | 'lg' | 'xl'
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 모달의 제목 또는 header 메시지
   */
  message?: React.ReactNode;

  /**
   * 모달의 상세 메시지
   */
  description?: React.ReactNode;

  /**
   * 확인 버튼 문구
   */
  confirmButton?: string;

  /**
   * 취소 버튼 문구
   */
  cancelButton?: string;

  /**
   * 커스텀 버튼 문구
   */
  customButton?: string;

  /**
   * message(제목이나 header 메시지) 위치의 오른쪽 영역 esc(x 모양버튼) 버튼 사용 유무
   * @default false
   */
  useEscButton?: boolean;

  /**
   * overlay영역 class name
   */
  overalyClassName?: string;

  /**
   * overlay영역 클릭 시 모달의 닫힘 여부
   */
  shouldCloseOnOverlayClick?: boolean;

  /**
   * 키보드 esc 누를 시 모달의 닫힘 여부
   */
  shouldCloseOnEsc?: boolean;

  /**
   * 화면 뒷쪽 dim처리 사용 여부
   */
  useDim?: boolean;

  /**
   * 모달이 열린 후 실행되어야 할 함수
   */
  onAfterOpen?: () => void;

  /**
   * 확인 버튼을 누를 때 실행되는 함수
   */
  confirmFunc?: () => void;

  /**
   * 취소 버튼을 누를 때 실행되는 함수
   */
  cancelFunc?: () => void;

  /**
   * 커스텀 버튼 누를 때 실행되는 함수
   */
  customFunc?: () => void;
}
