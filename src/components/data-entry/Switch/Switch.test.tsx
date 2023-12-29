import { generatePrefixClasses } from '@modules/utils';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Switch, switchClasses } from '.';

const classes = generatePrefixClasses(switchClasses, 'Switch');

describe('<Switch />', () => {
  it('렌더링 체크', () => {
    const { getByTestId } = render(
      <Switch type={'inside'} switchSize={'sm'} color={'blue'} data-testid={'switch'} />,
    );
    const switchTest = getByTestId('switch');

    expect(switchTest.classList.contains(classes.root)).toBeTruthy();
    expect(switchTest.textContent).toEqual('Switch');
  });

  it('type에 따른 형태 변경 체크', () => {
    const { container, rerender } = render(<Switch type="inside" />);
    expect(container.firstChild).toHaveProperty('type', 'inside');

    rerender(<Switch type="outside" />);
    expect(container.firstChild).toHaveProperty('type', 'outside');
  });

  it('size에 따른 형태 변경 체크', () => {
    const { container, rerender } = render(<Switch switchSize="sm" />);
    expect(container.firstChild).toHaveProperty('switchSize', 'sm');

    rerender(<Switch switchSize="md" />);
    expect(container.firstChild).toHaveProperty('switchSize', 'md');

    rerender(<Switch switchSize="lg" />);
    expect(container.firstChild).toHaveProperty('switchSize', 'lg');

    rerender(<Switch switchSize="xl" />);
    expect(container.firstChild).toHaveProperty('switchSize', 'xl');
  });

  it('color에 따른 형태 변경 체크', () => {
    const { container, rerender } = render(<Switch color="blue" />);
    expect(container.firstChild).toHaveProperty('color', 'blue');

    rerender(<Switch color="green" />);
    expect(container.firstChild).toHaveProperty('color', 'green');
  });
});

describe('스위치 클릭 이벤트', () => {
  it('스위치 클릭 시 이벤트 함수 실행', () => {
    const onClick = vi.fn();

    const { getByText } = render(<Switch onClick={onClick} />);
    const switchTest = getByText('switch');

    fireEvent.click(switchTest);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
