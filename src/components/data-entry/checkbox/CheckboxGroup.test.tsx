import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { checkboxClasses } from './checkboxClasses';
import { CheckboxGroup } from './CheckboxGroup';
import { checkboxGroupClasses } from './checkboxGroupClasses';

describe('<Checkbox.Group />', () => {
  it('렌더링 됩니다.', () => {
    const { container } = render(<CheckboxGroup />);

    expect(
      (container.firstChild as HTMLElement).classList.contains(checkboxGroupClasses.root),
    ).toBeTruthy();
  });

  it(`구성 요소는 오류 없이 업데이트되고 마운트 해제될 수 있습니다.`, () => {
    const { unmount, rerender } = render(<CheckboxGroup />);
    expect(() => {
      rerender(<CheckboxGroup />);
      unmount();
    }).not.toThrow();
  });

  it('하위 Checkbox을 선택했을때, 선택값이 체크됩니다.', () => {
    const onChange = vi.fn();
    const { container } = render(
      <CheckboxGroup options={['Apple', 'Pear', 'Orange']} onChange={onChange} />,
    );

    fireEvent.click(container.getElementsByClassName(checkboxClasses.input)[0]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(onChange.mock.calls[0][2]).toEqual(['Apple']);
    fireEvent.click(container.getElementsByClassName(checkboxClasses.input)[1]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(onChange.mock.calls[1][2]).toEqual(['Apple', 'Pear']);
    fireEvent.click(container.getElementsByClassName(checkboxClasses.input)[2]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(onChange.mock.calls[2][2]).toEqual(['Apple', 'Pear', 'Orange']);
    fireEvent.click(container.getElementsByClassName(checkboxClasses.input)[1]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(onChange.mock.calls[3][2]).toEqual(['Apple', 'Orange']);
  });
});

describe('props: disabled', () => {
  it('CheckboxGroup가 비활성화된 경우 Checkbox와 CheckboxGroup 모두의 onChange 콜백을 트리거하지 않습니다.', () => {
    const onChangeGroup = vi.fn();
    const onChangeItem = vi.fn();
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear', onChange: onChangeItem },
    ];

    const { container } = render(
      <CheckboxGroup options={options} onChange={onChangeGroup} disabled />,
    );

    fireEvent.click(container.getElementsByClassName(checkboxClasses.input)[0]);
    expect(onChangeGroup).toHaveBeenCalledTimes(0);
    fireEvent.click(container.getElementsByClassName(checkboxClasses.input)[1]);
    expect(onChangeItem).toHaveBeenCalledTimes(0);
  });

  it('CheckboxGroup가 비활성화되지 않은 경우 Checkbox의 onChange 콜백을 방지하지 않습니다.', () => {
    const onChangeGroup = vi.fn();
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange', disabled: true },
    ];

    const { container } = render(
      <CheckboxGroup options={options} onChange={onChangeGroup} />,
    );
    fireEvent.click(container.getElementsByClassName(checkboxClasses.input)[0]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(onChangeGroup.mock.calls[0][2]).toEqual(['Apple']);
    fireEvent.click(container.getElementsByClassName(checkboxClasses.input)[1]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(onChangeGroup.mock.calls[0][2]).toEqual(['Apple']);
  });
});

describe('props: name', () => {
  it('모든 자식에는 이름 속성이 있어야 합니다.', () => {
    const { container } = render(
      <CheckboxGroup name="checkboxgroup" options={['Yes', 'No']} />,
    );

    Array.from(container.getElementsByClassName(checkboxClasses.input)).forEach((el) => {
      expect(el.getAttribute('name')).toEqual('checkboxgroup');
    });
  });
});

describe('props: value', () => {
  it('value로 값을 설정할 수  있습니다.', () => {
    const { container } = render(
      <CheckboxGroup
        value={['Apple']}
        options={[
          { label: 'Apple', value: 'Apple' },
          { label: 'Orange', value: 'Orange' },
        ]}
      />,
    );

    expect(container.getElementsByClassName(checkboxClasses.checked).length).toBe(1);
  });
});
