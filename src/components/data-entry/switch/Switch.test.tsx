import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './Switch';
import { switchClasses } from './SwitchClasses';

describe('<Switch />', () => {
  it('렌더링 체크', () => {
    const { container } = render(<Switch />);

    const switchTest = container.querySelector(`.${switchClasses.root}`);
    expect(switchTest?.classList.contains(switchClasses.wrapper)).toBeTruthy();
  });

  it('type에 따른 형태 변경 체크', () => {
    const { rerender, container } = render(<Switch switchType={'inside'} />);

    const childInside = container.querySelector(`.${switchClasses.shape.inside}`);
    expect(childInside?.classList.contains(switchClasses.shape.inside)).toBeTruthy();

    rerender(<Switch switchType="outside" />);
    const childOutside = container.querySelector(`.${switchClasses.shape.outside}`);
    expect(childOutside?.classList.contains(switchClasses.shape.outside)).toBeTruthy();
  });

  it('size에 따른 형태 변경 체크', () => {
    const { rerender, container } = render(<Switch switchSize="sm" />);

    const childSm = container.querySelector(`.${switchClasses.size.small}`);
    expect(childSm?.classList.contains(switchClasses.size.small)).toBeTruthy();

    rerender(<Switch switchSize="md" />);
    const childMd = container.querySelector(`.${switchClasses.size.medium}`);
    expect(childMd?.classList.contains(switchClasses.size.medium)).toBeTruthy();

    rerender(<Switch switchSize="lg" />);
    const childLg = container.querySelector(`.${switchClasses.size.large}`);
    expect(childLg?.classList.contains(switchClasses.size.large)).toBeTruthy();

    rerender(<Switch switchSize="xl" />);
    const childXl = container.querySelector(`.${switchClasses.size.xLarge}`);
    expect(childXl?.classList.contains(switchClasses.size.xLarge)).toBeTruthy();
  });

  it('color에 따른 형태 변경 체크', () => {
    const { rerender, container } = render(<Switch color="blue" />);
    const childBlue = container.querySelector(`.${switchClasses.color.blue}`);
    expect(childBlue?.classList.contains(switchClasses.color.blue)).toBeTruthy();

    rerender(<Switch color="green" />);
    const childGreen = container.querySelector(`.${switchClasses.color.green}`);
    expect(childGreen?.classList.contains(switchClasses.color.green)).toBeTruthy();
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
