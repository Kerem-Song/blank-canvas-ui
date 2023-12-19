import { Button, Divider, Flex, Row } from '@components';
import { useEffect } from 'react';
import ReactModal from 'react-modal';

export interface ISystemModalStatusType {
  isOpen: boolean;
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
      className={'modal'}
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
