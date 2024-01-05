import { Button } from '@components/general/button/Button';
import { Divider } from '@components/Layout/Divider/Divider';
import { Flex } from '@components/Layout/Flex/Flex';
import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import { useEffect } from 'react';
import ReactModal from 'react-modal';

import { IModalProps } from './Modal.types';
import { modalClasses } from './ModalClasses';

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
