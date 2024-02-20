import { act, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';
import { checkboxClasses as classes } from './checkboxClasses';

describe('<Checkbox />', () => {
  it('렌더링 됩니다.', () => {
    const { container } = render(<Checkbox />);

    expect(
      (container.firstChild as HTMLElement).classList.contains(classes.root),
    ).toBeTruthy();
  });

  it('id를 사용하여 `role="checkbox"`를 렌더링합니다.', () => {
    const { getByRole } = render(<Checkbox id="foo" />);

    expect(getByRole('checkbox').getAttribute('id')).toBe('foo');
  });

  it('name을 사용하여 `role="checkbox"`를 렌더링합니다.', () => {
    const { getByRole } = render(<Checkbox name="foo" />);

    expect(getByRole('checkbox').getAttribute('name')).toBe('foo');
  });

  it('required 속성을 사용하여 `role="checkbox"`를 렌더링합니다.', () => {
    const { getByRole } = render(<Checkbox required />);

    expect(getByRole('checkbox').getAttribute('required')).not.toBeNull();
  });

  it('readOnly 속성을 사용하여 `role="checkbox"`를 렌더링합니다.', () => {
    const { getByRole } = render(<Checkbox readOnly />);

    expect(getByRole('checkbox').getAttribute('readonly')).not.toBeNull();
  });

  it('기본적으로 unchecked 상태로 렌더링됩니다.', () => {
    const { getByRole } = render(<Checkbox />);

    expect(getByRole('checkbox')).toHaveProperty('checked', false);
  });

  it('설정한 checked 상태로 렌더링됩니다.', () => {
    const { getByRole } = render(<Checkbox defaultChecked />);

    expect(getByRole('checkbox')).toHaveProperty('checked', true);
  });

  it('이벤트 실행 후 checked 상태가 변경됩니다.', () => {
    const { getByRole } = render(<Checkbox defaultChecked />);

    act(() => {
      getByRole('checkbox').click();
    });

    expect(getByRole('checkbox')).toHaveProperty('checked', false);
  });
});

describe('prop: disabled', () => {
  it('className이 적용됩니다.', () => {
    const { getByRole } = render(<Checkbox disabled />);

    expect(getByRole('checkbox')).toHaveProperty('disabled', true);
  });

  it('disabled 설정되면 포커스되지 않습니다.', () => {
    const { getByRole } = render(<Checkbox disabled />);
    const checkbox = getByRole('checkbox');

    act(() => {
      checkbox.focus();
    });

    expect(document.activeElement).not.toEqual(checkbox);
  });

  it('disabled 설정되면 사용자 동작에 응답하지 않습니다.', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Checkbox disabled onClick={onClick} />);

    const checkbox = getByRole('checkbox');

    act(() => {
      checkbox.click();
    });

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});

describe('prop: label', () => {
  it('label이 출력됩니다.', () => {
    const { container } = render(<Checkbox label="foo" />);

    expect(container.getElementsByClassName(classes.label)[0].innerHTML).toBe('foo');
  });

  it('label을 선택했을때 checked 상태가 변경됩니다.', () => {
    const { container } = render(<Checkbox label="foo" />);

    expect(
      (container.firstChild as HTMLElement).classList.contains(classes.checked),
    ).not.toBeTruthy();

    act(() => {
      (container.getElementsByClassName(classes.label)[0] as HTMLElement).click();
    });

    expect(
      (container.firstChild as HTMLElement).classList.contains(classes.checked),
    ).toBeTruthy();
  });
});

// describe('prop: size', () => {
//   it('className이 적용됩니다.', () => {
//     const { container, rerender } = render(<Checkbox size="sm" />);

//     expect(
//       (container.firstChild as HTMLElement).classList.contains(classes.sizeSmall),
//     ).toBeTruthy();

//     rerender(<Checkbox size="lg" />);
//     expect(
//       (container.firstChild as HTMLElement).classList.contains(classes.sizeLarge),
//     ).toBeTruthy();
//   });
// });

describe('prop: color', () => {
  it('className이 적용됩니다.', () => {
    const { container, rerender } = render(<Checkbox color="primary" />);

    expect(
      (container.firstChild as HTMLElement).classList.contains(classes.colorPrimary),
    ).toBeTruthy();

    rerender(<Checkbox color="success" />);
    expect(
      (container.firstChild as HTMLElement).classList.contains(classes.colorSuccess),
    ).toBeTruthy();
  });
});

describe('prop: indeterminate', () => {
  it('aria-checked="mixed"가 있어야 합니다.', () => {
    const { getByRole } = render(<Checkbox indeterminate />);

    expect(getByRole('checkbox').getAttribute('aria-checked')).toBe('mixed');
  });
});
