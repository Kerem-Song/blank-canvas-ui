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
        <button onClick={() => setIsOpen(!isOpen)}>Modal test button</button>
        <Modal {...args} isOpen={isOpen}></Modal>
      </>
    );
  },
  args: {
    message: '모달테스트',
    description: '상세 설명입니다 진행하시겠습니까?',
    overalyClassName: 'modalOverlay',
    confirmButton: '확인',
    callbackFunc: () => {
      console.log('@모달 확인');
    },
    cancelButton: '취소',
    customButton: '커스텀',
  },
};
