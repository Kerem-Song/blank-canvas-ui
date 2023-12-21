import { Button, Divider, Flex, Row } from '@components';
import IcEsc from '@icons/ic_search_delete.svg?react';
import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import { HTMLAttributes, useEffect } from 'react';
import ReactModal from 'react-modal';

import { modalClasses } from './ModalClasses';

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
  size: 'sm' | 'md' | 'lg' | 'xl';

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
  overalyClassName: string;

  /**
   * overlay영역 클릭 시 모달의 닫힘 여부
   */
  shouldCloseOnOverlayClick?: boolean;

  /**
   * 키보드 esc 누를 시 모달의 닫힘 여부
   */
  shouldCloseOnEsc?: boolean;

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

// ReactModal.setAppElement('#root');

export const Modal = (modalInfo: IModalProps) => {
  const { className, prefix, style, children, size = 'sm', ...modalProps } = modalInfo;
  const classes = generatePrefixClasses(
    modalClasses,
    `${prefix ? `${prefix}-` : ''}modal`,
  );

  const rootClassName = classNames(
    classes.root,
    {
      // size
      [classes.sizeSmall]: size === 'sm',
      [classes.sizeMedium]: size === 'md',
      [classes.sizeLarge]: size === 'lg',
      [classes.sizeXLarge]: size === 'xl',
    },
    className,
  );

  const handleCancel = () => {
    modalInfo.cancelFunc?.();
  };

  const handleConfirm = () => {
    modalInfo.confirmFunc?.();
  };

  const handleCustom = () => {
    modalInfo.customFunc?.();
  };

  useEffect(() => {
    return () => {
      handleCancel();
    };
  }, []);

  return (
    <ReactModal
      appElement={document.body}
      className={rootClassName}
      isOpen={modalInfo.isOpen}
      overlayClassName={modalInfo.overalyClassName}
      shouldCloseOnOverlayClick={modalInfo.shouldCloseOnOverlayClick}
      shouldCloseOnEsc={modalInfo.shouldCloseOnEsc}
      onRequestClose={() => {
        modalInfo.cancelFunc?.();
      }}
      onAfterOpen={() => {
        modalInfo.onAfterOpen?.();
      }}
    >
      <div className="title">
        <h4>{modalInfo.message}</h4>
        {modalInfo.useEscButton ? (
          <Button
            variant="text"
            className="esc-btn"
            onClick={handleCancel}
            baseButton={true}
          />
        ) : null}
      </div>
      <Divider style={{ margin: 0 }} />
      <div className="content">{modalInfo.description}</div>
      {children ? <div className="children">{modalInfo.children}</div> : null}
      <Flex justify="end" gap={8} style={{ padding: '0 20px 20px 20px' }}>
        {modalInfo.cancelButton ? (
          <Button className="cancel-btn" onClick={handleCancel}>
            {modalInfo.cancelButton}
          </Button>
        ) : (
          <></>
        )}

        <Button
          className="confirm-btn"
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleConfirm}
        >
          {modalInfo.confirmButton}
        </Button>

        {modalInfo.customButton ? (
          <Button className="custom-btn" onClick={handleCustom}>
            {modalInfo.customButton}
          </Button>
        ) : null}
      </Flex>
    </ReactModal>
  );
};
