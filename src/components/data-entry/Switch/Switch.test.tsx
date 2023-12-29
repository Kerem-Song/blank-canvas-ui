import { generatePrefixClasses } from '@modules/utils';
import { getByTestId, render } from '@testing-library/react';
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
