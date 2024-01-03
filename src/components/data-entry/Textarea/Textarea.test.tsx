import { act, fireEvent, render } from '@testing-library/react';

import { Textarea } from './Textarea';

describe('<Textarea />', () => {
  it('렌더링 체크', () => {
    const { getByRole } = render(<Textarea />);
    const textarea = getByRole('textbox');
    expect(textarea?.classList.contains('textarea')).toBeTruthy();
  });

  it('input value 일치 여부', () => {
    const { getByRole } = render(<Textarea />);
    const textarea = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(textarea, { target: { value: 'test1' } });
    expect(textarea.value).toBe('test1');
  });

  it('max length 체크', () => {
    const { getByRole } = render(<Textarea />);
    const maxLengthTest = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(maxLengthTest, { target: { value: '1234567890' } });
    expect(maxLengthTest.value.length >= 10).toBeTruthy();
  });

  it('disabled 체크', () => {
    const onClick = vi.fn();
    const onChange = vi.fn();

    const { getByRole } = render(<Textarea onClick={onClick} onChange={onChange} />);

    const disabledTest = getByRole('textbox') as HTMLInputElement;
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
