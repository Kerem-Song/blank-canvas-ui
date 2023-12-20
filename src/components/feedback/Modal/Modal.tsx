import { Button, Divider, Flex, Row } from '@components';
import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import { HTMLAttributes, useEffect } from 'react';
import ReactModal from 'react-modal';

import { modalClasses } from './ModalClasses';

export interface ISystemModalStatusType extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  size: 'sm' | 'md' | 'lg' | 'xl';
  message?: React.ReactNode;
  description?: React.ReactNode;
  confirmButton?: string;
  cancelButton?: string;
  customButton?: string;
  overalyClassName: string;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;
  onAfterOpen?: () => void;
  callbackFunc?: () => void;
  cancelFunc?: () => void;
  closeFunc?: () => void;
  customFunc?: () => void;
}

export const Modal = (modalInfo: ISystemModalStatusType) => {
  const { className, prefix, style, children, ...modalProps } = modalInfo;
  const classes = generatePrefixClasses(
    modalClasses,
    `${prefix ? `${prefix}-` : ''}modal`,
  );

  const rootClassName = classNames(
    classes.root,
    {
      // size
      [classes.sizeSmall]: modalProps.size === 'sm',
      [classes.sizeMedium]: modalProps.size === 'md',
      [classes.sizeLarge]: modalProps.size === 'lg',
      [classes.sizeXLarge]: modalProps.size === 'xl',
    },
    className,
  );

  const handleClose = () => {
    modalInfo.closeFunc?.();
  };

  const handleConfirm = () => {
    modalInfo.callbackFunc?.();
  };

  const handleCustom = () => {
    modalInfo.customFunc?.();
  };

  useEffect(() => {
    return () => {
      handleClose();
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
        modalInfo.closeFunc?.();
      }}
      onAfterOpen={() => {
        modalInfo.onAfterOpen?.();
      }}
    >
      <div className="title">
        <h4>{modalInfo.message}</h4>
      </div>
      <Divider style={{ margin: 0 }} />
      <div className="content">{modalInfo.description}</div>
      {children ? <div className="children">{modalInfo.children}</div> : null}
      <Flex justify="end" gap={8} style={{ padding: '0 20px 20px 20px' }}>
        {modalInfo.cancelButton ? (
          <Button className="cancelBtn" onClick={handleClose}>
            {modalInfo.cancelButton}
          </Button>
        ) : (
          <></>
        )}

        <Button
          className="confirmBtn"
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleConfirm}
        >
          {modalInfo.confirmButton}
        </Button>

        {modalInfo.customButton ? (
          <Button className="customBtn" onClick={handleCustom}>
            {modalInfo.customButton}
          </Button>
        ) : null}
      </Flex>
    </ReactModal>
  );
};
