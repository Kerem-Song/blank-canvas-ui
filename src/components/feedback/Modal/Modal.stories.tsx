import { Button } from '@components';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ISystemModalStatusType, Modal } from './Modal';

const meta: Meta<ISystemModalStatusType> = {
  title: 'components/feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '모달 팝업',
  },
};

export default meta;
type Story = StoryObj<ISystemModalStatusType>;

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
          callbackFunc={() => setIsOpen(false)}
          closeFunc={() => setIsOpen(false)}
          customFunc={() => setIsOpen(false)}
        ></Modal>
      </>
    );
  },
  args: {
    message: '모달테스트',
    description: '상세 설명입니다 진행하시겠습니까?',
    overalyClassName: 'modal-overlay',
    confirmButton: '확인',
    callbackFunc: () => {
      console.log('@모달 확인');
    },
    closeFunc: () => {
      console.log('@모달 취소');
    },
    customFunc: () => {
      console.log('@커스텀');
    },
    cancelButton: '취소',
    customButton: '커스텀',
    shouldCloseOnEsc: true,
  },
};
