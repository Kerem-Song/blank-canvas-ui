import { act, fireEvent, render } from '@testing-library/react';

import { radioClasses } from './RadioClasses';
import { RadioGroup } from './RadioGroup';
import { IRadioOption } from './RadioGroup.types';

describe('<RadioGroup />', () => {
  const options: IRadioOption[] = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3', disabled: true },
  ];

  it('렌더링 체크', () => {
    const { getAllByRole } = render(<RadioGroup options={options} />);
    const radioGroup = getAllByRole('radio');

    radioGroup.forEach((radio) => {
      expect(radio?.classList.contains(radioClasses.root)).toBeTruthy();
    });
  });

  it('클릭 후 checked 상태가 변경', () => {
    const onClick = vi.fn();
    const onChange = vi.fn();

    const { getAllByRole } = render(
      <RadioGroup options={options} onClick={onClick} onChange={onChange} />,
    );

    // 체크
    const radioGroup = getAllByRole('radio');

    fireEvent.click(radioGroup[0]);

    expect(radioGroup[0]).toHaveProperty('checked', true);
    expect(radioGroup[1]).toHaveProperty('checked', false);
    expect(radioGroup[2]).toHaveProperty('checked', false);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('disabled 체크', () => {
    const onClick = vi.fn();
    const onChange = vi.fn();

    const { getAllByRole } = render(
      <RadioGroup options={options} onClick={onClick} onChange={onChange} />,
    );

    const radioGroup = getAllByRole('radio');

    fireEvent.click(radioGroup[2]);

    act(() => {
      radioGroup[2].click();
      fireEvent.keyDown(radioGroup[2], { key: 'Enter' });
      fireEvent.keyUp(radioGroup[2], { key: ' ' });
    });

    expect(document.activeElement).not.toEqual(radioGroup);
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
