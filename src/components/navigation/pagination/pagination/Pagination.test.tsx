import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { paginationItemClasses } from '../pagination-item/paginationItemClasses';

import { Pagination } from './Pagination';
import { paginationClasses } from './paginationClasses';

describe('<PaginationItem />', () => {
  it('렌더링 됩니다.', () => {
    const { container } = render(<Pagination />);
    const pagination = container.firstChild as HTMLElement;

    expect(pagination.classList.contains(paginationClasses.root)).toBeTruthy();
  });

  it('aria-current가 정상적으로 적용됩니다.', () => {
    const { getAllByRole } = render(<Pagination total={30} page={1} />);

    // previous, page 1
    const [, page1] = getAllByRole('button');
    expect(page1.getAttribute('aria-current')).toBe('true');
  });

  it('다른 페이지를 클릭하면 onChange가 실행됩니다.', () => {
    const handleChange = vi.fn();
    const { getAllByRole } = render(
      <Pagination total={30} page={1} onChange={handleChange} />,
    );

    // previous, page 1, page 2
    const [, , page2] = getAllByRole('button');
    page2.click();

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('줄임표를 클릭할 때 onChange를 실행하면 안 됩니다.', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Pagination total={111} page={1} onChange={handleChange} />,
    );

    const ellipsisDiv = container.querySelector(
      `.${paginationItemClasses.ellipsis}`,
    ) as HTMLElement;

    ellipsisDiv.click();

    expect(ellipsisDiv).not.toBeNull();
    expect(handleChange).toHaveBeenCalledTimes(0);
  });
});
