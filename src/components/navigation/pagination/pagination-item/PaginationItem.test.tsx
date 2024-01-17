import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PaginationItem } from './PaginationItem';
import {
  PaginationItemClasses,
  paginationItemClasses as classes,
} from './paginationItemClasses';

describe('<PaginationItem />', () => {
  it('렌더링 됩니다.', () => {
    const { container } = render(<PaginationItem />);
    const paginationItem = container.firstChild as HTMLElement;

    expect(paginationItem.classList.contains(classes.root)).toBeTruthy();
  });

  it('`selected={true}`인 경우 `selected` 클래스가 적용됩니다.', () => {
    const { container } = render(<PaginationItem selected />);
    const paginationItem = container.firstChild as HTMLElement;

    expect(paginationItem.classList.contains(classes.selected)).toBeTruthy();
  });

  it('처음 버튼이 랜더링 됩니다.', () => {
    const { container } = render(<PaginationItem page={1} type="first"></PaginationItem>);
    const paginationItem = container.firstChild as HTMLElement;

    expect(paginationItem.classList.contains(classes.firstLast)).toBeTruthy();
  });

  it('처음 버튼이 랜더링 됩니다.', () => {
    const { container } = render(<PaginationItem page={1} type="last"></PaginationItem>);
    const paginationItem = container.firstChild as HTMLElement;

    expect(paginationItem.classList.contains(classes.firstLast)).toBeTruthy();
  });

  it('이전 버튼이 랜더링 됩니다.', () => {
    const { container } = render(
      <PaginationItem page={1} type="previous"></PaginationItem>,
    );
    const paginationItem = container.firstChild as HTMLElement;

    expect(paginationItem.classList.contains(classes.previousNext)).toBeTruthy();
  });

  it('다음 버튼이 랜더링 됩니다.', () => {
    const { container } = render(<PaginationItem page={1} type="next"></PaginationItem>);
    const paginationItem = container.firstChild as HTMLElement;

    expect(paginationItem.classList.contains(classes.previousNext)).toBeTruthy();
  });

  it('시작 줄임표가 랜더링 됩니다.', () => {
    const { container } = render(
      <PaginationItem page={1} type="start-ellipsis"></PaginationItem>,
    );
    const paginationItem = container.firstChild as HTMLElement;

    expect(paginationItem.classList.contains(classes.ellipsis)).toBeTruthy();
  });

  it('끝 줄임표가 랜더링 됩니다.', () => {
    const { container } = render(
      <PaginationItem page={1} type="end-ellipsis"></PaginationItem>,
    );
    const paginationItem = container.firstChild as HTMLElement;

    expect(paginationItem.classList.contains(classes.ellipsis)).toBeTruthy();
  });
});

describe('prop: disabled', () => {
  it('`disabled` className이 적용됩니다.', () => {
    const { container } = render(<PaginationItem disabled />);
    const paginationItem = container.firstChild as HTMLElement;

    expect(paginationItem.classList.contains(classes.disabled)).toBeTruthy();
  });

  it('비활성화된 버튼을 렌더링해야 합니다.', () => {
    const { container } = render(<PaginationItem disabled />);
    const paginationItem = container.firstChild as HTMLElement;

    expect(paginationItem).toHaveProperty('disabled', true);
  });
});

describe('prop: size', () => {
  (
    [
      {
        key: 'sizeSmall',
        value: 'sm',
      },
      {
        key: 'sizeMedium',
        value: 'md',
      },
      {
        key: 'sizeLarge',
        value: 'lg',
      },
    ] as const
  ).forEach((size) => {
    it(`${size.value} size 적용됩니다.`, () => {
      const { container } = render(<PaginationItem size={size.value} />);

      expect(
        (container.firstChild as HTMLElement).classList.contains(
          classes[size.key as keyof PaginationItemClasses],
        ),
      ).toBeTruthy();
    });
  });
});

describe('prop: shape', () => {
  (
    [
      {
        key: 'shapeCircle',
        value: 'circle',
      },
      {
        key: 'shapeRound',
        value: 'round',
      },
    ] as const
  ).forEach((shape) => {
    it(`${shape.value} shape 적용됩니다.`, () => {
      const { container } = render(<PaginationItem shape={shape.value} />);

      expect(
        (container.firstChild as HTMLElement).classList.contains(
          classes[shape.key as keyof PaginationItemClasses],
        ),
      ).toBeTruthy();
    });
  });
});

describe('prop: variant', () => {
  (
    [
      {
        key: 'text',
        value: 'text',
      },
      {
        key: 'outlined',
        value: 'outlined',
      },
      {
        key: 'contained',
        value: 'contained',
      },
    ] as const
  ).forEach((variant) => {
    it(`${variant.value} variant 적용됩니다.`, () => {
      const { container } = render(<PaginationItem variant={variant.value} />);

      expect(
        (container.firstChild as HTMLElement).classList.contains(
          classes[variant.key as keyof PaginationItemClasses],
        ),
      ).toBeTruthy();
    });
  });

  (
    [
      {
        key: 'primary',
        value: 'containedPrimary',
      },
      {
        key: 'secondary',
        value: 'containedSecondary',
      },
    ] as const
  ).forEach((color) => {
    it(`contained variant가 ${color.key} color 와 같이 적용됩니다.`, () => {
      const { container } = render(
        <PaginationItem variant="contained" color={color.key} />,
      );

      expect(
        (container.firstChild as HTMLElement).classList.contains(
          classes[color.value as keyof PaginationItemClasses],
        ),
      ).toBeTruthy();
    });
  });

  (
    [
      {
        key: 'primary',
        value: 'outlinedPrimary',
      },
      {
        key: 'secondary',
        value: 'outlinedSecondary',
      },
    ] as const
  ).forEach((color) => {
    it(`outlined variant가 ${color.key} color 와 같이 적용됩니다.`, () => {
      const { container } = render(
        <PaginationItem variant="outlined" color={color.key} />,
      );

      expect(
        (container.firstChild as HTMLElement).classList.contains(
          classes[color.value as keyof PaginationItemClasses],
        ),
      ).toBeTruthy();
    });
  });

  (
    [
      {
        key: 'primary',
        value: 'textPrimary',
      },
      {
        key: 'secondary',
        value: 'textSecondary',
      },
    ] as const
  ).forEach((color) => {
    it(`text variant가 ${color.key} color 와 같이 적용됩니다.`, () => {
      const { container } = render(<PaginationItem variant="text" color={color.key} />);

      expect(
        (container.firstChild as HTMLElement).classList.contains(
          classes[color.value as keyof PaginationItemClasses],
        ),
      ).toBeTruthy();
    });
  });
});
