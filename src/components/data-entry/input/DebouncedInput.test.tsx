import { DebouncedInput } from '@components/data-entry/input/DebouncedInput';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import * as React from 'react';

describe('<DebouncedInput />', () => {
  const handleDebounce = vi.fn();

  it('렌더링 체크', () => {
    render(<DebouncedInput handleDebounce={handleDebounce} debounceTimeout={1} />);
    const input = screen.getByRole('textbox');
    expect(input.classList.contains('bc-input-normal')).toBeTruthy();
  });

  it('placeholder 체크', () => {
    render(
      <DebouncedInput
        placeholder="test"
        handleDebounce={handleDebounce}
        debounceTimeout={1}
      />,
    );

    expect(screen.getByPlaceholderText('test')).toBeTruthy();
  });

  it('input value 일치 여부', () => {
    render(<DebouncedInput handleDebounce={handleDebounce} debounceTimeout={1} />);
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test1' } });
    expect(input.value).toBe('test1');
  });

  it('max length 체크', () => {
    render(<DebouncedInput handleDebounce={handleDebounce} debounceTimeout={1} />);
    const maxLengthTest: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(maxLengthTest, { target: { value: '1234567890' } });
    expect(maxLengthTest.value.length >= 10).toBeTruthy();
  });

  it('disabled 체크', () => {
    const onClick = vi.fn();
    const onChange = vi.fn();

    render(
      <DebouncedInput
        onClick={onClick}
        onChange={onChange}
        handleDebounce={handleDebounce}
        debounceTimeout={1}
      />,
    );

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
    const { container } = render(
      <DebouncedInput
        showCount={true}
        maxLength={10}
        handleDebounce={handleDebounce}
        debounceTimeout={1}
      />,
    );
    const input: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test1' } });
    const counter = container.querySelector('.count')?.firstChild?.textContent;
    expect(counter === input.value.length.toString()).toBeTruthy();
  });

  it('clear 버튼 체크', () => {
    const onClear = vi.fn();
    render(
      <DebouncedInput
        isClearable={true}
        onClear={onClear}
        handleDebounce={handleDebounce}
        debounceTimeout={1}
      />,
    );
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
    render(
      <DebouncedInput
        isSearch={true}
        onSearch={onSearch}
        handleDebounce={handleDebounce}
        debounceTimeout={1}
      />,
    );

    // 버튼 렌더링 확인
    const searchBtn = screen.getByRole('button').firstChild as HTMLDivElement;
    expect(searchBtn.classList.contains('search')).toBeTruthy();

    // 버튼 클릭
    fireEvent.click(searchBtn);
    expect(onSearch).toBeCalledTimes(1);
  });

  it('onPressEnter 함수 실행 확인', () => {
    const onPressEnter = vi.fn();
    render(
      <DebouncedInput
        onPressEnter={onPressEnter}
        handleDebounce={handleDebounce}
        debounceTimeout={1}
      />,
    );

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onPressEnter).toBeCalledTimes(1);
  });

  it('onPressEsc 함수 실행 확인', () => {
    const onPressEsc = vi.fn();
    render(
      <DebouncedInput
        onPressEsc={onPressEsc}
        handleDebounce={handleDebounce}
        debounceTimeout={1}
      />,
    );

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
    const { container } = render(
      <DebouncedInput
        customPrefix={'a'}
        handleDebounce={handleDebounce}
        debounceTimeout={1}
      />,
    );

    const prefix = container.querySelector('.prefixWrapper');
    expect(prefix?.textContent).toBe('a');
  });

  it('suffix 체크', () => {
    const { container } = render(
      <DebouncedInput suffix={'a'} handleDebounce={handleDebounce} debounceTimeout={1} />,
    );

    const suffix = container.querySelector('.suffixWrapper');
    expect(suffix?.textContent).toBe('a');
  });

  it('debounce tiemout 체크', () => {
    interface IMovieRes {
      popularity: string;
      title: string;
    }

    const testData: IMovieRes[] = [
      {
        title: 'hello',
        popularity: '1/5',
      },
      {
        title: 'hi',
        popularity: '2/5',
      },
      {
        title: 'happy',
        popularity: '3/5',
      },
    ];

    const useDebounced = () => {
      const [data, setData] = React.useState<IMovieRes[]>([]);
      const addData = () => setData(testData);

      return { data, addData };
    };

    const { result } = renderHook(() => useDebounced());

    const { container } = render(
      <DebouncedInput handleDebounce={useDebounced} debounceTimeout={1000}>
        {result.current.data?.map((item, i) => (
          <div key={i} className="test-child">
            <span>{item.title}</span>
            <span>{item.popularity}</span>
          </div>
        ))}
      </DebouncedInput>,
    );

    const debouncedTest = screen.getByRole('textbox');

    act(() => {
      fireEvent.change(debouncedTest, { target: { value: 'test1' } });
      result.current.addData();
    });

    expect(result.current.data).toBe(testData);
    expect(container.querySelectorAll('.test-child')).toBeTruthy();
  });
});
