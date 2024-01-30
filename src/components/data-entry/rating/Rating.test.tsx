import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Rating } from './Rating';
import { ratingClasses as classes } from './ratingClasses';

describe('<Rating />', () => {
  it('렌더링 되나요?', () => {
    const { container } = render(<Rating />);

    expect(
      (container.firstChild as HTMLElement).classList.contains(classes.root),
    ).toBeTruthy();
  });

  it('값이 제공된 정밀도로 반올림되나요?', () => {
    const { container } = render(
      <Rating name="rating-test" value={3.9} precision={0.2} />,
    );

    expect(container.querySelector('input[name="rating-test"]:checked')).toHaveProperty(
      'value',
      '4',
    );
  });

  it('마우스 hover가 동작하나요?', () => {
    const { container } = render(<Rating size={24} />);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (container.firstChild as any).getBoundingClientRect = vi.fn(() => ({
      left: 0,
      width: 120,
    }));

    fireEvent.mouseMove(container.firstChild!, {
      clientX: 25,
    });
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).toBe(2);

    fireEvent.mouseMove(container.firstChild!, {
      clientX: 100,
    });
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).toBe(5);
  });

  it('rating값이 선택되나요?', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Rating name="rating-test" onChange={handleChange} value={4} />,
    );

    fireEvent.click(container.querySelector('input[name="rating-test"][value="3"]')!);
    expect(handleChange).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(handleChange.mock.calls[0][1]).toBe(3);

    const checked = container.querySelector(
      'input[name="rating-test"]:checked',
    ) as HTMLInputElement;
    expect(checked.value).toBe('4');
  });

  it('`defaultValue`를 지원하나요?', () => {
    const { container } = render(<Rating name="rating-test" defaultValue={3} />);

    expect(
      (container.querySelector('input[name="rating-test"]:checked') as HTMLInputElement)
        .value,
    ).toBe('3');

    fireEvent.click(
      container.querySelector('input[name="rating-test"][value="2"]') as HTMLInputElement,
    );
    expect(
      (container.querySelector('input[name="rating-test"]:checked') as HTMLInputElement)
        .value,
    ).toBe('2');
  });

  it('동일 rating값을 선택했을때 값이 지워지나요?', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <Rating name="rating-test" onChange={handleChange} value={3} />,
    );

    fireEvent.click(
      container.querySelector('input[name="rating-test"][value="3"]') as HTMLInputElement,
      {
        clientX: 1,
      },
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(handleChange.mock.calls[0][1]).toBe(null);
  });

  it('빈 rating값이 선택되나요?', () => {
    const handleChange = vi.fn();
    render(<Rating name="rating-test" onChange={handleChange} value={2} />);

    fireEvent.click(document.querySelector('#rating-test-empty') as HTMLInputElement);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(handleChange.mock.calls[0][1]).toBe(null);
  });

  it('`value`속성값이 null이면, 빈 rating값이 선택되나요?', () => {
    const { container } = render(<Rating name="rating-test" value={null} />);

    const input = container.querySelector('#rating-test-empty') as HTMLInputElement;
    const checked = container.querySelector('input[name="rating-test"]:checked');
    expect(input).toBe(checked);
    expect(input.value).toBe('');
  });

  // 화살표 및 TAB 키에 대한 키보드 탐색이 브라우저에서 처리되도록 보장합니다.
  it('`name`을 속성을 보장하나요?', () => {
    render(<Rating value={null} />);

    const [arbitraryRadio, ...radios] =
      document.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    expect(arbitraryRadio.name).not.toBe('');
    expect(new Set(radios.map((radio) => radio.name))).toHaveLength(1);
  });
});
