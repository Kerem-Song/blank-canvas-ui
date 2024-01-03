import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('total 값을 설정하지 않았으면 page 값은 설정되지 않습니다.', () => {
    const { items } = renderHook(() => usePagination()).result.current;
    const target = items.filter((item) => item.page === 1);

    expect(target).toHaveLength(0);
  });

  it('기본적으로 이전과 다음 버튼은 표시됩니다.', () => {
    const { items } = renderHook(() => usePagination()).result.current;

    expect(items[0]).toHaveProperty('type', 'previous');
    expect(items[0]).toHaveProperty('disabled', true);
    expect(items[1]).toHaveProperty('type', 'next');
    expect(items[1]).toHaveProperty('disabled', true);
  });

  it('hidePrevButton === true 인 경우 이전 버튼은 표시되지 않습니다.', () => {
    const { items } = renderHook(() => usePagination({ hidePrevButton: true })).result
      .current;
    const target = items.filter((item) => item.type === 'previous');

    expect(target).toHaveLength(0);
  });

  it('hideNextButton === true 인 경우 다음 버튼은 표시되지 않습니다.', () => {
    const { items } = renderHook(() => usePagination({ hideNextButton: true })).result
      .current;
    const target = items.filter((item) => item.type === 'next');

    expect(target).toHaveLength(0);
  });

  it('총 2페이지 중에 1페이지를 선택한 경우에는 다음 버튼은 활성화되고 이전 버튼은 비활성화됩니다.', () => {
    const { items } = renderHook(() => usePagination({ total: 20, perPage: 10, page: 1 }))
      .result.current;

    expect(items[0]).toHaveProperty('type', 'previous');
    expect(items[0]).toHaveProperty('disabled', true);
    expect(items[3]).toHaveProperty('type', 'next');
    expect(items[3]).toHaveProperty('disabled', false);
    expect(items[3]).toHaveProperty('page', 2);
  });

  it('총 2페이지 중에 2페이지를 선택한 경우에는 다음 버튼은 비활성화되고 이전 버튼은 활성화됩니다.', () => {
    const { items } = renderHook(() => usePagination({ total: 20, perPage: 10, page: 2 }))
      .result.current;

    expect(items[0]).toHaveProperty('type', 'previous');
    expect(items[0]).toHaveProperty('disabled', false);
    expect(items[0]).toHaveProperty('page', 1);
    expect(items[3]).toHaveProperty('type', 'next');
    expect(items[3]).toHaveProperty('disabled', true);
  });

  it('showFirstButton === true 인 경우 첫번째 버튼이 표시됩니다.', () => {
    const { items } = renderHook(() => usePagination({ showFirstButton: true })).result
      .current;

    expect(items[0]).toHaveProperty('type', 'first');
    expect(items[0]).toHaveProperty('disabled', true);
  });

  it('showLastButton === true 인 경우 마지막 버튼이 표시됩니다.', () => {
    const { items } = renderHook(() => usePagination({ showLastButton: true })).result
      .current;

    expect(items[2]).toHaveProperty('type', 'last');
    expect(items[2]).toHaveProperty('disabled', true);
  });

  it('showFirstButton === true && 첫 번째 페이지가 선택되지 않았다면 활성화된 첫 번째 버튼이 표시됩니다.', () => {
    const { items } = renderHook(() =>
      usePagination({ showFirstButton: true, total: 20, perPage: 10, page: 2 }),
    ).result.current;

    expect(items[0]).toHaveProperty('type', 'first');
    expect(items[0]).toHaveProperty('disabled', false);
    expect(items[0]).toHaveProperty('page', 1);
  });

  it('showLastButton === true && 마지막 페이지가 선택되지 않았다면 활성화된 마지막 버튼이 표시됩니다.', () => {
    const { items } = renderHook(() =>
      usePagination({ showLastButton: true, total: 20, perPage: 10, page: 1 }),
    ).result.current;

    expect(items[4]).toHaveProperty('type', 'last');
    expect(items[4]).toHaveProperty('disabled', false);
    expect(items[4]).toHaveProperty('page', 2);
  });

  it('total === 100 인 경우에 끝 줄임표가 설정되지 않습니다.', () => {
    const { items } = renderHook(() => usePagination({ total: 100 })).result.current;
    const target = items.filter((item) => item.type === 'end-ellipsis');

    expect(target).toHaveLength(0);
  });

  it('total === 111 인 경우에 끝 줄임표가 설정됩니다.', () => {
    const { items } = renderHook(() => usePagination({ total: 111 })).result.current;
    const target = items.filter((item) => item.type === 'end-ellipsis');

    expect(target).toHaveLength(1);
  });

  it('count >= 8 인 경우 시작 줄임표과 끝 줄임표가 설정됩니다.', () => {
    const { items } = renderHook(() => usePagination({ total: 500, page: 8 })).result
      .current;
    const target = items.filter((item) =>
      ['start-ellipsis', 'end-ellipsis'].includes(item.type),
    );

    expect(target).toHaveLength(2);
    expect(target[0]).toHaveProperty('type', 'start-ellipsis');
    expect(target[0]).toHaveProperty('page', null);
    expect(target[1]).toHaveProperty('type', 'end-ellipsis');
    expect(target[1]).toHaveProperty('page', null);
  });

  it('maxPageCount === 0 이면 모든 페이지가 표시됩니다.', () => {
    const { items } = renderHook(() =>
      usePagination({ total: 500, perPage: 10, maxPageCount: 0 }),
    ).result.current;
    const target = items.filter((item) => item.type === 'page');

    expect(target).toHaveLength(50);
  });

  it('maxPageCount 늘릴 수 있습니다.', () => {
    const { items } = renderHook(() =>
      usePagination({ total: 500, page: 1, maxPageCount: 11 }),
    ).result.current;

    expect(
      items.filter((_, i) => i > 1 && i <= 11).every((item) => item.type === 'page'),
    ).toBeTruthy();
    expect(items[12]).toHaveProperty('type', 'end-ellipsis');
  });

  it('maxPageCount 줄일 수 있습니다.', () => {
    const { items } = renderHook(() =>
      usePagination({ total: 500, page: 1, maxPageCount: 9 }),
    ).result.current;

    expect(
      items.filter((_, i) => i > 1 && i <= 9).every((item) => item.type === 'page'),
    ).toBeTruthy();
    expect(items[10]).toHaveProperty('type', 'end-ellipsis');
  });

  it('boundaryCount을 늘릴 수 있습니다.', () => {
    const { items } = renderHook(() =>
      usePagination({ total: 500, page: 9, boundaryCount: 2 }),
    ).result.current;

    expect(
      items.filter((_, i) => i > 1 && i <= 2).every((item) => item.type === 'page'),
    ).toBeTruthy();
    expect(items[3]).toHaveProperty('type', 'start-ellipsis');
    expect(
      items.filter((_, i) => i > 4 && i <= 13).every((item) => item.type === 'page'),
    ).toBeTruthy();
    expect(items[14]).toHaveProperty('type', 'end-ellipsis');
  });

  it('boundaryCount을 줄일 수 있습니다.', () => {
    const { items } = renderHook(() =>
      usePagination({ total: 500, page: 8, boundaryCount: 0 }),
    ).result.current;

    expect(items[1]).toHaveProperty('type', 'start-ellipsis');
    expect(
      items.filter((_, i) => i > 1 && i <= 11).every((item) => item.type === 'page'),
    ).toBeTruthy();
    expect(items[12]).toHaveProperty('type', 'end-ellipsis');
  });
});
