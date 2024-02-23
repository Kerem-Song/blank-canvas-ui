import { useState } from 'react';
import { Button } from '@components/general/button/Button';
import { Meta, StoryObj } from '@storybook/react';

import { Modal } from './Modal';
import { IModalProps } from './Modal.types';

const meta: Meta<IModalProps> = {
  title: 'components/feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '모달 팝업',
  },
};

export default meta;
type Story = StoryObj<IModalProps>;

export const Default: Story = {
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
      <>
        <Button onClick={() => setIsOpen(!isOpen)}>Modal test button</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          shouldCloseOnEsc={true}
          tabIndex={-1}
          confirmFunc={() => setIsOpen(false)}
          cancelFunc={() => setIsOpen(false)}
          customFunc={() => setIsOpen(false)}
        ></Modal>
      </>
    );
  },
  args: {
    message: '모달테스트',
    description: '상세 설명입니다 진행하시겠습니까?',
    // overalyClassName: 'bc-modal-overlay',
    confirmButton: '확인',
    confirmFunc: () => {
      console.log('@모달 확인');
    },
    cancelFunc: () => {
      console.log('@모달 취소');
    },
    customFunc: () => {
      console.log('@커스텀');
    },
    cancelButton: '취소',
    customButton: '커스텀',
    shouldCloseOnEsc: true,
    size: 'xl',
  },
};
