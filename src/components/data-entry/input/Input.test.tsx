import { act, fireEvent, render, screen } from '@testing-library/react';

import { Input } from './Input';

describe('<Input />', () => {
  it('렌더링 체크', () => {
    render(<Input name="test" />);
    const input = screen.getByRole('textbox');
    expect(input.classList.contains('luna-input-normal')).toBeTruthy();
  });

  it('placeholder 체크', () => {
    render(<Input name="test" placeholder="test" />);

    expect(screen.getByPlaceholderText('test')).toBeTruthy();
  });

  it('input value 일치 여부', () => {
    render(<Input />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test1' } });
    expect(input.value).toBe('test1');
  });

  it('max length 체크', () => {
    render(<Input />);
    const maxLengthTest: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(maxLengthTest, { target: { value: '1234567890' } });
    expect(maxLengthTest.value.length >= 10).toBeTruthy();
  });

  it('disabled 체크', () => {
    const onClick = vi.fn();
    const onChange = vi.fn();

    render(<Input onClick={onClick} onChange={onChange} />);

    const disabledTest = screen.getByRole('textbox');
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

  it('카운터 숫자 체크', () => {
    const { container } = render(<Input showCount={true} maxLength={10} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test1' } });
    const counter = container.querySelector('.count')?.firstChild?.textContent;
    expect(counter === input.value.length.toString()).toBeTruthy();
  });

  it('clear 버튼 체크', () => {
    const onClear = vi.fn();
    render(<Input isClearable={true} onClear={onClear} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test1' } });

    // 클리어 버튼 클릭
    const clearBtn = screen.getByRole('button');
    fireEvent.click(clearBtn);
    expect(input.value.length).toBe(0);
    expect(onClear).toBeCalledTimes(1);
  });

  it('search 버튼 체크', () => {
    const onSearch = vi.fn();
    render(<Input isSearch={true} onSearch={onSearch} />);

    // 버튼 렌더링 확인
    const searchBtn = screen.getByRole('button').firstChild as HTMLDivElement;
    expect(searchBtn.classList.contains('search')).toBeTruthy();

    // 버튼 클릭
    fireEvent.click(searchBtn);
    expect(onSearch).toBeCalledTimes(1);
  });

  it('onPressEnter 함수 실행 확인', () => {
    const onPressEnter = vi.fn();
    render(<Input onPressEnter={onPressEnter} />);

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onPressEnter).toBeCalledTimes(1);
  });

  it('onPressEsc 함수 실행 확인', () => {
    const onPressEsc = vi.fn();
    render(<Input onPressEsc={onPressEsc} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    expect(onPressEsc).toBeCalledTimes(1);
  });

  it('custom prefix 체크', () => {
    const { container } = render(<Input customPrefix={'a'} />);

    const prefix = container.querySelector('.prefixWrapper');
    expect(prefix?.textContent).toBe('a');
  });

  it('suffix 체크', () => {
    const { container } = render(<Input suffix={'a'} />);

    const suffix = container.querySelector('.suffixWrapper');
    expect(suffix?.textContent).toBe('a');
  });
});
