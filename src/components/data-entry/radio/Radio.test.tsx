import { act, fireEvent, render, screen } from '@testing-library/react';

import { Radio } from './Radio';
import { radioClasses } from './RadioClasses';

describe('<Radio />', () => {
  it('렌더링 체크', () => {
    render(<Radio />);
    const radio = screen.getByRole('radio');

    expect(radio?.classList.contains(radioClasses.root)).toBeTruthy();
  });

  it('id를 사용하여 `role="radio"`를 렌더링', () => {
    render(<Radio id="foo" />);

    expect(screen.getByRole('radio').getAttribute('id')).toBe('foo');
  });

  it('name을 사용하여 렌더링 체크', () => {
    render(<Radio name="foo" />);

    expect(screen.getByRole('radio').getAttribute('name')).toBe('foo');
  });

  it('required 속성을 사용하여 `role="radio"`를 렌더링', () => {
    render(<Radio required />);

    expect(screen.getByRole('radio').getAttribute('required')).not.toBeNull();
  });

  it('readOnly 속성을 사용하여 `role="radio"`를 렌더링', () => {
    render(<Radio readOnly />);

    expect(screen.getByRole('radio').getAttribute('readonly')).not.toBeNull();
  });

  it('클릭 후 checked 상태가 변경', () => {
    render(<Radio />);
    // 체크
    act(() => {
      screen.getByRole('radio').click();
    });

    expect(screen.getByRole('radio')).toHaveProperty('checked', true);

    act(() => {
      screen.getByRole('radio').click();
    });

    expect(screen.getByRole('radio')).not.toHaveProperty('checked', false);
  });

  it('disabled 체크', () => {
    const onClick = vi.fn();
    const onChange = vi.fn();

    render(<Radio onClick={onClick} onChange={onChange} />);

    const disabledTest = screen.getByRole('radio');
    fireEvent.change(disabledTest, { target: { disabled: true } });
    expect(disabledTest).toHaveProperty('disabled', true);

    act(() => {
      disabledTest.click();
      fireEvent.keyDown(disabledTest, { key: 'Enter' });
      fireEvent.keyUp(disabledTest, { key: ' ' });
    });

    expect(document.activeElement).not.toEqual(disabledTest);
    expect(onClick).toHaveBeenCalledTimes(0);
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
