import { Button } from '@components/general/button/Button';
import { Divider } from '@components/layout/divider';
import { Flex } from '@components/layout/flex';
import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import { useEffect } from 'react';
import ReactModal from 'react-modal';

import { IModalProps } from './Modal.types';
import { modalClasses } from './ModalClasses';

// ReactModal.setAppElement('#root');

export const Modal = (modalInfo: IModalProps) => {
  const {
    className,
    prefix = 'bc',
    style,
    children,
    size = 'sm',
    ...modalProps
  } = modalInfo;
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
      <div className="bc-title">
        <h4>{modalInfo.message}</h4>
        {modalInfo.useEscButton ? (
          <Button
            variant="text"
            className="bc-esc-btn"
            onClick={handleCancel}
            baseButton={true}
          />
        ) : null}
      </div>
      <Divider style={{ margin: 0 }} />
      <div className="bc-content">{modalInfo.description}</div>
      {children ? <div className="bc-children">{modalInfo.children}</div> : null}
      <Flex justify="end" gap={8} style={{ padding: '0 20px 20px 20px' }}>
        {modalInfo.cancelButton ? (
          <Button className="bc-cancel-btn" onClick={handleCancel}>
            {modalInfo.cancelButton}
          </Button>
        ) : (
          <></>
        )}

        <Button
          className="bc-confirm-btn"
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleConfirm}
        >
          {modalInfo.confirmButton}
        </Button>

        {modalInfo.customButton ? (
          <Button className="bc-custom-btn" onClick={handleCustom}>
            {modalInfo.customButton}
          </Button>
        ) : null}
      </Flex>
    </ReactModal>
  );
};
