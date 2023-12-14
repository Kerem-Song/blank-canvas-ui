import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('page의 기본값이 설정됩니다.', () => {
    const { items } = renderHook(() => usePagination()).result.current;

    expect(items).toHaveLength(3);
    expect(items[1]).toHaveProperty('page', 1);
  });

  it('기본적으로 이전 및 다음 버튼이 비활성화됩니다.', () => {
    const { items } = renderHook(() => usePagination()).result.current;

    expect(items[0]).toHaveProperty('type', 'previous');
    expect(items[0]).toHaveProperty('disabled', true);
    expect(items[2]).toHaveProperty('type', 'next');
    expect(items[2]).toHaveProperty('disabled', true);
  });

  it('count > 1 인 경우 다음 버튼은 활성화되고 이전 버튼은 비활성화됩니다.', () => {
    const { items } = renderHook(() => usePagination({ count: 2 })).result.current;

    expect(items[0]).toHaveProperty('type', 'previous');
    expect(items[0]).toHaveProperty('disabled', true);
    expect(items[3]).toHaveProperty('type', 'next');
    expect(items[3]).toHaveProperty('disabled', false);
    expect(items[3]).toHaveProperty('page', 2);
  });

  it('page === count 인 경우 다음 버튼은 비활성화되고 이전 버튼은 활성화됩니다.', () => {
    const { items } = renderHook(() => usePagination({ count: 2, page: 2 })).result
      .current;

    expect(items[0]).toHaveProperty('type', 'previous');
    expect(items[0]).toHaveProperty('disabled', false);
    expect(items[0]).toHaveProperty('page', 1);
    expect(items[3]).toHaveProperty('type', 'next');
    expect(items[3]).toHaveProperty('disabled', true);
  });

  it('showFirstButton === true 인 경우 비활성화된 첫번째 버튼이 설정됩니다.', () => {
    const { items } = renderHook(() => usePagination({ showFirstButton: true })).result
      .current;

    expect(items[0]).toHaveProperty('type', 'first');
    expect(items[0]).toHaveProperty('disabled', true);
    expect(items[0]).toHaveProperty('page', 1);
  });

  it('showLastButton === true 인 경우 마지막 버튼이 설정됩니다.', () => {
    const { items } = renderHook(() => usePagination({ showLastButton: true })).result
      .current;

    expect(items[3]).toHaveProperty('type', 'last');
    expect(items[3]).toHaveProperty('disabled', true);
    expect(items[3]).toHaveProperty('page', 1);
  });

  it('showFirstButton === true && page > 인 경우 활성화된 첫 번째 버튼이 설정됩니다.', () => {
    const { items } = renderHook(() =>
      usePagination({ showFirstButton: true, count: 2, page: 2 }),
    ).result.current;

    expect(items[0]).toHaveProperty('type', 'first');
    expect(items[0]).toHaveProperty('disabled', false);
    expect(items[0]).toHaveProperty('page', 1);
  });

  it('showLastButton === true && page < count 인 경우 활성화된 마지막 버튼이 설정됩니다.', () => {
    const { items } = renderHook(() => usePagination({ showLastButton: true, count: 2 }))
      .result.current;

    expect(items[4]).toHaveProperty('type', 'last');
    expect(items[4]).toHaveProperty('disabled', false);
    expect(items[4]).toHaveProperty('page', 2);
  });

  it('count <= 7 인 경우 줄임표가 설정되지 않습니다.', () => {
    const { items } = renderHook(() => usePagination({ count: 7 })).result.current;

    expect(items[1]).toHaveProperty('page', 1);
    expect(items[2]).toHaveProperty('page', 2);
    expect(items[3]).toHaveProperty('page', 3);
    expect(items[4]).toHaveProperty('page', 4);
    expect(items[5]).toHaveProperty('page', 5);
    expect(items[6]).toHaveProperty('page', 6);
    expect(items[7]).toHaveProperty('page', 7);
  });

  it('count >= 8 인 경우 기본적으로 끝 줄임표가 설정됩니다.', () => {
    const { items } = renderHook(() => usePagination({ count: 8 })).result.current;

    expect(items).toHaveLength(9);
    expect(items[2]).toHaveProperty('page', 2);
    expect(items[6]).toHaveProperty('type', 'end-ellipsis');
    expect(items[6]).toHaveProperty('page', null);
  });

  it('page >= 5 인 경우 시작 줄임표가 설정됩니다.', () => {
    const { items } = renderHook(() => usePagination({ count: 8, page: 5 })).result
      .current;

    expect(items[2]).toHaveProperty('type', 'start-ellipsis');
    expect(items[2]).toHaveProperty('page', null);
    expect(items[6]).toHaveProperty('page', 7);
  });

  it('count >= 9 인 경우 시작 줄임표와 끝 줄임표가 설정됩니다.', () => {
    const { items } = renderHook(() => usePagination({ count: 9, page: 5 })).result
      .current;

    expect(items).toHaveLength(9);
    expect(items[2]).toHaveProperty('type', 'start-ellipsis');
    expect(items[2]).toHaveProperty('page', null);
    expect(items[6]).toHaveProperty('type', 'end-ellipsis');
    expect(items[6]).toHaveProperty('page', null);
  });

  it('siblingCount을 줄일 수 있습니다.', () => {
    const { items } = renderHook(() =>
      usePagination({ count: 7, page: 4, siblingCount: 0 }),
    ).result.current;

    expect(items).toHaveLength(7);
    expect(items[2]).toHaveProperty('type', 'start-ellipsis');
    expect(items[3]).toHaveProperty('page', 4);
    expect(items[4]).toHaveProperty('type', 'end-ellipsis');
  });

  it('siblingCount을 늘릴 수 있습니다.', () => {
    const { items } = renderHook(() =>
      usePagination({ count: 11, page: 6, siblingCount: 2 }),
    ).result.current;

    expect(items).toHaveLength(11);
    expect(items[2]).toHaveProperty('type', 'start-ellipsis');
    expect(items[3]).toHaveProperty('page', 4);
    expect(items[4]).toHaveProperty('page', 5);
    expect(items[5]).toHaveProperty('page', 6);
    expect(items[6]).toHaveProperty('page', 7);
    expect(items[7]).toHaveProperty('page', 8);
    expect(items[8]).toHaveProperty('type', 'end-ellipsis');
  });

  it('boundaryCount을 늘릴 수 있습니다.', () => {
    const { items } = renderHook(() =>
      usePagination({ count: 11, page: 6, boundaryCount: 2 }),
    ).result.current;

    expect(items).toHaveLength(11);
    expect(items[1]).toHaveProperty('page', 1);
    expect(items[2]).toHaveProperty('page', 2);
    expect(items[3]).toHaveProperty('type', 'start-ellipsis');
    expect(items[7]).toHaveProperty('type', 'end-ellipsis');
    expect(items[8]).toHaveProperty('page', 10);
    expect(items[9]).toHaveProperty('page', 11);
  });
});
