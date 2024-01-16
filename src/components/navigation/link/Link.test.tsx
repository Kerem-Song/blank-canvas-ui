import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Link } from './Link';
import { LinkClasses, linkClasses as classes } from './linkClasses';

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

describe('<Link />', () => {
  it('렌더링 됩니다.', () => {
    const { container } = render(<Link />);

    expect(
      (container.firstChild as HTMLElement).classList.contains(classes.root),
    ).toBeTruthy();
  });

  it('자식 요소가 랜더링 됩니다.', () => {
    const { queryByText } = render(<Link href="/">Home</Link>);

    expect(queryByText('Home')).not.toEqual(null);
  });
});

describe('이벤트 콜백', () => {
  it('이벤트 콜백을 실행됩니다.', () => {
    const onClick = vi.fn();
    const onBlur = vi.fn();
    const onFocus = vi.fn();
    const onKeyUp = vi.fn();
    const onKeyDown = vi.fn();
    const onMouseDown = vi.fn();
    const onMouseLeave = vi.fn();
    const onMouseUp = vi.fn();

    const { container } = render(
      <Link
        href="/"
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
      >
        Home
      </Link>,
    );
    const anchor = container.querySelector('a') as HTMLAnchorElement;

    fireEvent.mouseDown(anchor);
    expect(onMouseDown).toHaveBeenCalledTimes(1);

    fireEvent.mouseUp(anchor);
    expect(onMouseUp).toHaveBeenCalledTimes(1);

    fireEvent.click(anchor);
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.focus(anchor);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(anchor);
    expect(onKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.keyUp(anchor);
    expect(onKeyUp).toHaveBeenCalledTimes(1);

    fireEvent.blur(anchor);
    expect(onBlur).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(anchor);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});

describe('prop: color', () => {
  (
    ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'dark'] as const
  ).forEach((color) => {
    it(`${color} color가 적용됩니다.`, () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="anchor" color={color}>
          Hello World
        </Link>,
      );

      expect(
        getByTestId('anchor').classList.contains(
          classes[`color${capitalize(color)}` as keyof LinkClasses],
        ),
      ).toBeTruthy();
    });
  });
});

describe('prop: underline', () => {
  (['none', 'always', 'hover'] as const).forEach((underline) => {
    it(`${underline} underline 적용됩니다.`, () => {
      const { getByTestId } = render(
        <Link href="/" data-testid="anchor" underline={underline}>
          Hello World
        </Link>,
      );

      expect(
        getByTestId('anchor').classList.contains(
          classes[`underline${capitalize(underline)}` as keyof LinkClasses],
        ),
      ).toBeTruthy();
    });
  });
});
