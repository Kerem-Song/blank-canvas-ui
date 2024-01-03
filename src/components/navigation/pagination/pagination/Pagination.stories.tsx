import { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';
import * as React from 'react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import {
  reactRouterOutlets,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

import { Pagination } from '../pagination/Pagination';
import { PaginationProps } from '../pagination/Pagination.types';
import { PaginationItem } from '../paginationItem/PaginationItem';

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
  argTypes: {
    page: { control: { type: null } },
    defaultPage: { control: { type: null } },
  },
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
    shape: 'round',
    size: 'sm',
    prefix: '',
    variant: 'contained',
    boundaryCount: 1,
    total: 500,
    disabled: false,
    hideEllipsis: false,
    hideNextButton: false,
    hidePrevButton: false,
    showFirstButton: false,
    showLastButton: false,
    maxPageCount: 10,
  },
};

export const OutlinedPagination: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Pagination total={100} variant="outlined" color="default" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="outlined" color="primary" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="outlined" color="secondary" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="outlined" shape="round" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="outlined" shape="circle" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="outlined" disabled />
        </FlexBox>
      </>
    );
  },
};

export const ContainedPagination: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Pagination total={100} variant="contained" color="default" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="contained" color="primary" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="contained" color="secondary" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="contained" shape="round" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="contained" shape="circle" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="contained" disabled />
        </FlexBox>
      </>
    );
  },
};

export const TextPagination: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Pagination total={100} variant="text" color="default" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="text" color="primary" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="text" color="secondary" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="text" shape="round" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="text" shape="circle" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} variant="text" disabled />
        </FlexBox>
      </>
    );
  },
};

export const PaginationSize: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Pagination total={100} size="sm" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} size="md" />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} size="lg" />
        </FlexBox>
      </>
    );
  },
};

/**
 * 선택적으로 첫 페이지 및 마지막 페이지 단추를 활성화하거나 이전 페이지 및 다음 페이지 단추를 비활성화할 수 있습니다
 */
export const Buttons: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Pagination total={100} showFirstButton showLastButton />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} hidePrevButton hideNextButton />
        </FlexBox>
      </>
    );
  },
};

/**
 * 제어 아이콘을 사용자 지정할 수 있습니다.
 */
export const CustomIcons: Story = {
  render: () => {
    const ArrowBackIcon = () => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
        </svg>
      );
    };
    const ArrowForwardIcon = () => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
        </svg>
      );
    };

    return (
      <>
        <FlexBox>
          <Pagination
            total={100}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </FlexBox>
      </>
    );
  },
};

/**
 * `boundaryCount` prop을 사용하여 현재 페이지의 양쪽을 표시하고 `maxPageCount` prop을 사용하여 시작 페이지 번호와 끝 페이지 번호를 표시할 최대 자릿수를 지정할 수 있습니다.
 */
export const PaginationRanges: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Pagination total={100} defaultPage={6} />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} defaultPage={6} maxPageCount={1} boundaryCount={2} />
        </FlexBox>
        <FlexBox>
          <Pagination total={100} defaultPage={6} maxPageCount={3} boundaryCount={2} />
        </FlexBox>
      </>
    );
  },
};

/**
 * `page` 와 `onChange` 속성을 사용하여 Pagination을 제어할 수 있습니다.
 */
export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = React.useState(1);
    const onChange: PaginationProps['onChange'] = (event, page) => {
      console.log('onChange: ', event, page);
      setPage(page);
    };

    return (
      <>
        <FlexBox>
          <Pagination total={5000} page={page} onChange={onChange} />
        </FlexBox>
      </>
    );
  },
};

export const ThirdPartyReactRouting: Story = {
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlets([
        {
          path: 'inbox',
          element: <p>{window.location.search}</p>,
        },
      ]),
    }),
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1');

    return (
      <>
        <div>
          <p>
            React-Router: {location.pathname}
            {location.search}
          </p>
        </div>
        <FlexBox>
          <Pagination
            total={5000}
            page={page}
            renderItem={(item) => (
              <PaginationItem
                component={ReactRouterLink}
                to={{
                  search: `${item.page === 1 ? '' : `?page=${item.page}`}`,
                }}
                {...item}
              />
            )}
          />
        </FlexBox>
      </>
    );
  },
};
