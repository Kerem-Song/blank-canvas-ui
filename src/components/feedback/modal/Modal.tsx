import { useEffect } from 'react';
import ReactModal from 'react-modal';
import { Button } from '@components/general/button/Button';
import { Divider } from '@components/layout/divider';
import { Flex } from '@components/layout/flex';
import classNames from 'classnames';

import { IModalProps } from './Modal.types';
import { modalClasses } from './ModalClasses';

export const Modal = (modalInfo: IModalProps) => {
  const {
    className,
    style,
    children,
    size = 'sm',
    useDim = false,
    dividerDirection = 'bottom',
    ...modalProps
  } = modalInfo;

  const rootClassName = classNames(
    modalClasses.root,
    {
      // size
      [modalClasses.size.small]: size === 'sm',
      [modalClasses.size.medium]: size === 'md',
      [modalClasses.size.large]: size === 'lg',
      [modalClasses.size.xLarge]: size === 'xl',
    },
    className,
  );

  const overlayClassname = classNames(
    modalInfo.overalyClassName,
    useDim && 'bc-modal-overlay',
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
      overlayClassName={overlayClassname}
      shouldCloseOnOverlayClick={modalInfo.shouldCloseOnOverlayClick}
      shouldCloseOnEsc={modalInfo.shouldCloseOnEsc}
      onRequestClose={() => {
        modalInfo.cancelFunc?.();
      }}
      onAfterOpen={() => {
        modalInfo.onAfterOpen?.();
      }}
    >
      <div className={modalClasses.title}>
        <h4>{modalInfo.message}</h4>
        {modalInfo.useEscButton ? (
          <Button
            variant="text"
            className={modalClasses.btn.esc}
            onClick={handleCancel}
            baseButton={true}
            title={'esc'}
          />
        ) : null}
      </div>
      {dividerDirection === 'top' || dividerDirection === 'all' ? (
        <Divider style={{ margin: 0 }} />
      ) : null}
      <div className={modalClasses.content}>{modalInfo.description}</div>
      {children ? (
        <div className={modalClasses.children}>{modalInfo.children}</div>
      ) : null}
      {dividerDirection === 'bottom' || dividerDirection === 'all' ? (
        <Divider style={{ margin: 0 }} />
      ) : null}
      <Flex justify="end" gap={8} style={{ padding: '12px' }}>
        {modalInfo.cancelButton ? (
          <Button className={modalClasses.btn.cancel} onClick={handleCancel}>
            {modalInfo.cancelButton}
          </Button>
        ) : (
          <></>
        )}

        <Button
          className={modalClasses.btn.confirm}
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleConfirm}
        >
          {modalInfo.confirmButton}
        </Button>

        {modalInfo.customButton ? (
          <Button className={modalClasses.btn.custom} onClick={handleCustom}>
            {modalInfo.customButton}
          </Button>
        ) : null}
      </Flex>
    </ReactModal>
  );
};
