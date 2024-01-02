import { generatePrefixClasses } from '@modules/utils';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import { spyOn } from '@vitest/spy';
import { describe, expect, it, vi } from 'vitest';

import { Switch, switchClasses } from './index';

const classes = generatePrefixClasses(switchClasses, 'switch');
const onClickTest = () => {
  console.log('@on click test');
};

describe('<Switch />', () => {
  it('렌더링 체크', () => {
    const { container } = render(<Switch />);

    const switchTest = container.querySelector('.switch');
    expect(switchTest?.classList.contains('switch-wrapper')).toBeTruthy();
  });

  it('type에 따른 형태 변경 체크', () => {
    const { rerender, container } = render(<Switch switchType={'inside'} />);

    const childInside = container.querySelector('.switch-inside');
    expect(childInside?.classList.contains('switch-inside')).toBeTruthy();

    rerender(<Switch switchType="outside" />);
    const childOutside = container.querySelector('.switch-outside');
    expect(childOutside?.classList.contains('switch-outside')).toBeTruthy();
  });

  it('size에 따른 형태 변경 체크', () => {
    const { rerender, container } = render(<Switch switchSize="sm" />);

    const childSm = container.querySelector('.switch-sm');
    expect(childSm?.classList.contains(classes.sizeSmall)).toBeTruthy();

    rerender(<Switch switchSize="md" />);
    const childMd = container.querySelector('.switch-md');
    expect(childMd?.classList.contains(classes.sizeMedium)).toBeTruthy();

    rerender(<Switch switchSize="lg" />);
    const childLg = container.querySelector('.switch-lg');
    expect(childLg?.classList.contains(classes.sizeLarge)).toBeTruthy();

    rerender(<Switch switchSize="xl" />);
    const childXl = container.querySelector('.switch-xl');
    expect(childXl?.classList.contains(classes.sizeXLarge)).toBeTruthy();
  });

  it('color에 따른 형태 변경 체크', () => {
    const { rerender, container } = render(<Switch color="blue" />);
    const childBlue = container.querySelector('.switch-blue');
    expect(childBlue?.classList.contains(classes.blue)).toBeTruthy();

    rerender(<Switch color="green" />);
    const childGreen = container.querySelector('.switch-green');
    expect(childGreen?.classList.contains(classes.green)).toBeTruthy();
  });
});

describe('스위치 클릭 이벤트', () => {
  it('스위치 클릭 시 이벤트 함수 실행', () => {
    // const spy = vi.spyOn(messages, 'onClickTest');
    const onClickMock = vi.fn();

    const { getByTestId } = render(
      <Switch data-testid={'switch'} onClick={onClickMock} />,
    );

    const switchTest = getByTestId('switch');

    fireEvent.click(switchTest);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('스위치 클릭 아닐 시 이벤트 함수', () => {
    const onClickMock = vi.fn();

    const { getByTestId } = render(
      <Switch data-testid={'switch'} onClick={onClickMock} />,
    );

    const switchTest = getByTestId('switch');

    expect(onClickMock).not.toHaveBeenCalled();
  });
});
