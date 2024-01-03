import { act, fireEvent, render } from '@testing-library/react';

import { Radio } from './Radio';

describe('<Radio />', () => {
  it('렌더링 체크', () => {
    const { getByRole } = render(<Radio />);
    const radio = getByRole('radio');

    expect(radio?.classList.contains('radio')).toBeTruthy();
  });

  it('id를 사용하여 `role="radio"`를 렌더링', () => {
    const { getByRole } = render(<Radio id="foo" />);

    expect(getByRole('radio').getAttribute('id')).toBe('foo');
  });

  it('name을 사용하여 렌더링 체크', () => {
    const { getByRole } = render(<Radio name="foo" />);

    expect(getByRole('radio').getAttribute('name')).toBe('foo');
  });

  it('required 속성을 사용하여 `role="radio"`를 렌더링', () => {
    const { getByRole } = render(<Radio required />);

    expect(getByRole('radio').getAttribute('required')).not.toBeNull();
  });

  it('readOnly 속성을 사용하여 `role="radio"`를 렌더링', () => {
    const { getByRole } = render(<Radio readOnly />);

    expect(getByRole('radio').getAttribute('readonly')).not.toBeNull();
  });

  it('클릭 후 checked 상태가 변경', () => {
    const { getByRole } = render(<Radio />);
    // 체크
    act(() => {
      getByRole('radio').click();
    });

    expect(getByRole('radio')).toHaveProperty('checked', true);

    act(() => {
      getByRole('radio').click();
    });

    expect(getByRole('radio')).not.toHaveProperty('checked', false);
  });

  it('disabled 체크', () => {
    const onClick = vi.fn();
    const onChange = vi.fn();

    const { getByRole } = render(<Radio onClick={onClick} onChange={onChange} />);

    const disabledTest = getByRole('radio') as HTMLInputElement;
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
