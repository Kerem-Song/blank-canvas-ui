import { generatePrefixClasses } from '@modules/utils';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './Switch';
import { switchClasses } from './SwitchClasses';

const classes = generatePrefixClasses(switchClasses, 'bc-switch');

describe('<Switch />', () => {
  it('렌더링 체크', () => {
    const { container } = render(<Switch />);

    const switchTest = container.querySelector('.bc-switch');
    expect(switchTest?.classList.contains('bc-switch-wrapper')).toBeTruthy();
  });

  it('type에 따른 형태 변경 체크', () => {
    const { rerender, container } = render(<Switch switchType={'inside'} />);

    const childInside = container.querySelector('.bc-switch-inside');
    expect(childInside?.classList.contains('bc-switch-inside')).toBeTruthy();

    rerender(<Switch switchType="outside" />);
    const childOutside = container.querySelector('.bc-switch-outside');
    expect(childOutside?.classList.contains('bc-switch-outside')).toBeTruthy();
  });

  it('size에 따른 형태 변경 체크', () => {
    const { rerender, container } = render(<Switch switchSize="sm" />);

    const childSm = container.querySelector('.bc-switch-sm');
    expect(childSm?.classList.contains(classes.sizeSmall)).toBeTruthy();

    rerender(<Switch switchSize="md" />);
    const childMd = container.querySelector('.bc-switch-md');
    expect(childMd?.classList.contains(classes.sizeMedium)).toBeTruthy();

    rerender(<Switch switchSize="lg" />);
    const childLg = container.querySelector('.bc-switch-lg');
    expect(childLg?.classList.contains(classes.sizeLarge)).toBeTruthy();

    rerender(<Switch switchSize="xl" />);
    const childXl = container.querySelector('.bc-switch-xl');
    expect(childXl?.classList.contains(classes.sizeXLarge)).toBeTruthy();
  });

  it('color에 따른 형태 변경 체크', () => {
    const { rerender, container } = render(<Switch color="blue" />);
    const childBlue = container.querySelector('.bc-switch-blue');
    expect(childBlue?.classList.contains(classes.blue)).toBeTruthy();

    rerender(<Switch color="green" />);
    const childGreen = container.querySelector('.bc-switch-green');
    expect(childGreen?.classList.contains(classes.green)).toBeTruthy();
  });
});

describe('스위치 클릭 이벤트', () => {
  it('스위치 클릭 시 이벤트 함수 실행', () => {
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
