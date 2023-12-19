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
    return <Modal isOpen={isOpen} overalyClassName={args.overalyClassName}></Modal>;
  },
  args: {},
};
