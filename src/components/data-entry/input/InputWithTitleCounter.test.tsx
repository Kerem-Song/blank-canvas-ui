import { act, fireEvent, render, screen } from '@testing-library/react';

import { inputClasses } from './InputClasses';
import { InputWithTitleCounter } from './InputWithTitleCounter';

describe('<InputWithTitleCounter />', () => {
  it('렌더링 체크', () => {
    render(<InputWithTitleCounter name="test" />);
    const input = screen.getByRole('textbox');
    expect(input.classList.contains(inputClasses.normal)).toBeTruthy();
  });

  it('placeholder 체크', () => {
    render(<InputWithTitleCounter name="test" placeholder="test" />);

    expect(screen.getByPlaceholderText('test')).toBeTruthy();
  });

  it('input value 일치 여부', () => {
    render(<InputWithTitleCounter />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test1' } });
    expect(input.value).toBe('test1');
  });

  it('max length 체크', () => {
    render(<InputWithTitleCounter />);
    const maxLengthTest: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(maxLengthTest, { target: { value: '1234567890' } });
    expect(maxLengthTest.value.length >= 10).toBeTruthy();
  });

  it('disabled 체크', () => {
    const onClick = vi.fn();
    const onChange = vi.fn();

    render(<InputWithTitleCounter onClick={onClick} onChange={onChange} />);

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
    const { container, rerender } = render(
      <InputWithTitleCounter showCount={true} maxLength={10} direction="top" />,
    );
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test2' } });

    const counter = container.querySelector(`.${inputClasses.counter}`);
    expect(
      counter?.firstChild?.textContent === input.value.length.toString(),
    ).toBeTruthy();

    // direction이 top일 때
    expect(counter?.classList.contains('top')).toBeTruthy();

    // direction이 inside 일 때
    rerender(
      <InputWithTitleCounter showCount={true} maxLength={10} direction="inside" />,
    );
    const insideCounter = container.querySelector(`.${inputClasses.suffixWrapper}`)
      ?.firstChild as HTMLSpanElement;
    expect(insideCounter?.classList.contains(inputClasses.count)).toBeTruthy();

    // direction이 bottom 일 때
    rerender(
      <InputWithTitleCounter showCount={true} maxLength={10} direction="bottom" />,
    );
    const bottomCounter = container.querySelector(`.${inputClasses.counter}`);
    expect(bottomCounter?.classList.contains('bottom')).toBeTruthy();
  });

  it('clear 버튼 체크', () => {
    const onClear = vi.fn();
    render(<InputWithTitleCounter isClearable={true} onClear={onClear} />);
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
    render(<InputWithTitleCounter isSearch={true} onSearch={onSearch} />);

    // 버튼 렌더링 확인
    const searchBtn = screen.getByRole('button').firstChild as HTMLDivElement;
    expect(searchBtn.classList.contains(inputClasses.button.search)).toBeTruthy();

    // 버튼 클릭
    fireEvent.click(searchBtn);
    expect(onSearch).toBeCalledTimes(1);
  });

  it('onPressEnter 함수 실행 확인', () => {
    const onPressEnter = vi.fn();
    render(<InputWithTitleCounter onPressEnter={onPressEnter} />);

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onPressEnter).toBeCalledTimes(1);
  });

  it('onPressEsc 함수 실행 확인', () => {
    const onPressEsc = vi.fn();
    render(<InputWithTitleCounter onPressEsc={onPressEsc} />);

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
    const { container } = render(<InputWithTitleCounter customPrefix={'a'} />);

    const prefix = container.querySelector(`.${inputClasses.prefixWrapper}`);
    console.log('@prefix', prefix);
    expect(prefix?.textContent).toBe('a');
  });

  it('suffix 체크', () => {
    const { container } = render(<InputWithTitleCounter suffix={'a'} />);

    const suffix = container.querySelector(`.${inputClasses.suffixWrapper}`);
    expect(suffix?.textContent).toBe('a');
  });
});
