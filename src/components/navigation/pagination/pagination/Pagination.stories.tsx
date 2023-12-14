import { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';
import * as React from 'react';

import { Pagination } from '../pagination/Pagination';
import { PaginationProps } from '../pagination/Pagination.types';

const FlexBox = ({
  className,
  children,
}: React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={classNames('flex items-center gap-4 p-2', className)}>{children}</div>
  );
};

const meta: Meta<PaginationProps> = {
  title: 'components/navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PaginationProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <FlexBox>
        <Pagination {...args} />
      </FlexBox>
    );
  },
  args: {
    color: 'primary',
    shape: 'circle',
    size: 'sm',
    prefix: '',
    variant: 'contained',
    boundaryCount: 2,
    count: 50,
    disabled: false,
    hideNextButton: false,
    hidePrevButton: false,
    showFirstButton: true,
    showLastButton: true,
    siblingCount: 2,
  },
};
