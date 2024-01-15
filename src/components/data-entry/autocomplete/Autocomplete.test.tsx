import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { inputClasses } from '../input/InputClasses';
import { Autocomplete } from '.';
import { autoCompleteClasses } from './AutocompleteClasses';

const items = [
  { label: 'label1', value: 'value1' },
  { label: 'label2', value: 'value2' },
  { label: 'label3', value: 'value3' },
  { label: 'asdf', value: 'asdf' },
  { label: '123', value: '123' },
];

describe('<Autocomplete />', () => {
  it('렌더링 체크', () => {
    render(<Autocomplete items={items} displayName={'label'} placeholder="write" />);
    const autocomplete = screen.getByRole('textbox');
    expect(autocomplete.classList.contains(autoCompleteClasses.input)).toBeTruthy();
  });

  it('placeholder 체크', () => {
    render(<Autocomplete placeholder="test" items={items} displayName={'label'} />);

    expect(screen.getByPlaceholderText('test')).toBeTruthy();
  });

  it('input value 일치 여부', async () => {
    render(<Autocomplete items={items} displayName={'label'} placeholder="write" />);

    await waitFor(() => {
      const input: HTMLInputElement = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test1' } });
      expect(input.value).toBe('test1');
    });
  });

  it('max length 체크', async () => {
    render(<Autocomplete items={items} displayName={'label'} placeholder="write" />);
    await waitFor(() => {
      const maxLengthTest: HTMLInputElement = screen.getByRole('textbox');
      fireEvent.change(maxLengthTest, { target: { value: '1234567890' } });
      expect(maxLengthTest.value.length >= 10).toBeTruthy();
    });
  });

  it('readonly 체크', () => {
    render(
      <Autocomplete items={items} displayName={'label'} placeholder="write" readOnly />,
    );
    expect(screen.getByRole('textbox').getAttribute('readonly')).not.toBeNull();
  });

  it('disabled 체크', async () => {
    const onChangeValue = vi.fn();
    const onChange = vi.fn();
    render(
      <Autocomplete
        items={items}
        displayName={'label'}
        placeholder="write"
        onChange={onChange}
        onChangeValue={onChangeValue}
      />,
    );

    await waitFor(() => {
      const disabledTest = screen.getByRole('textbox');
      fireEvent.change(disabledTest, { target: { disabled: true } });
      expect(disabledTest).toHaveProperty('disabled', true);

      disabledTest.click();
      fireEvent.keyDown(disabledTest, { key: 'Enter' });
      fireEvent.keyUp(disabledTest, { key: ' ' });

      expect(document.activeElement).not.toEqual(disabledTest);
    });

    expect(onChangeValue).toHaveBeenCalledTimes(0);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('prefix 체크', () => {
    const { container } = render(
      <Autocomplete
        items={items}
        displayName={'label'}
        placeholder="write"
        prefix={'a'}
      />,
    );

    const prefix = container.querySelector(`.${inputClasses.prefixWrapper}`);
    expect(prefix?.textContent).toBe('a');
  });

  it('suffix 체크', () => {
    const { container } = render(
      <Autocomplete
        items={items}
        displayName={'label'}
        placeholder="write"
        suffix={'a'}
      />,
    );

    const suffix = container.querySelector(`.${inputClasses.suffixWrapper}`);
    expect(suffix?.textContent).toBe('a');
  });

  it('input 클릭 시 list목록 출력 체크', () => {
    const { container } = render(
      <Autocomplete items={items} displayName={'label'} placeholder="write" />,
    );

    const input = container.querySelector('.bc-autocomplete') as HTMLDivElement;
    fireEvent.click(input);
    expect(input.lastChild?.firstChild).toHaveProperty(
      'className',
      autoCompleteClasses.list.root,
    );
  });

  it('auto complete 작동 여부 체크', async () => {
    const { container } = render(
      <Autocomplete items={items} displayName={'label'} placeholder="write" />,
    );

    await waitFor(() => {
      const input: HTMLInputElement = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'asdf' } });
      expect(input.value).toBe('asdf');
    });

    const list = container.querySelector(`.${autoCompleteClasses.root}`)?.lastChild
      ?.firstChild;
    expect(list?.textContent).toBe('asdf');
  });
});
