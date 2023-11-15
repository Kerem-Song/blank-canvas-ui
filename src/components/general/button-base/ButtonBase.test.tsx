import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';

import ButtonBase from './ButtonBase';

describe('<ButtonBase />', () => {
  it('기본 type은 button입니다.', () => {
    const { getByText, rerender } = render(<ButtonBase>Hello</ButtonBase>);
    expect(getByText('Hello')).toHaveProperty('type', 'button');

    rerender(<ButtonBase type={undefined}>Hello</ButtonBase>);
    expect(getByText('Hello')).toHaveProperty('type', 'button');
  });

  it('type을 변경할 수 있습니다.', () => {
    const { getByText, rerender } = render(<ButtonBase type="button">Hello</ButtonBase>);
    expect(getByText('Hello')).toHaveProperty('type', 'button');

    rerender(<ButtonBase type="submit">Hello</ButtonBase>);
    expect(getByText('Hello')).toHaveProperty('type', 'submit');

    rerender(<ButtonBase type="reset">Hello</ButtonBase>);
    expect(getByText('Hello')).toHaveProperty('type', 'reset');
  });

  it('비표준 type을 허용합니다.', () => {
    const { getByText } = render(<ButtonBase type="team-type">Hello</ButtonBase>);

    expect(getByText('Hello').getAttribute('type')).toEqual('team-type');
  });

  it('component을 변경하면 웹 접근성의 요구사항을 추가해야합니다.', () => {
    const { getByRole } = render(
      <ButtonBase component="span" role="checkbox" aria-checked={false} />,
    );
    const checkbox = getByRole('checkbox');

    expect(checkbox).toHaveProperty('nodeName', 'SPAN');
    expect(checkbox.getAttribute('tabIndex')).toEqual('0');
  });

  it('type="button인 경우 role="button"을 추가하지 마세요.', () => {
    const { getByText } = render(<ButtonBase type="button">Hello</ButtonBase>);
    expect(getByText('Hello').getAttribute('role')).toBeNull();
  });

  it('href을 설정하면 자동으로 버튼을 앵커로 변경됩니다.', () => {
    const { getByText } = render(
      <ButtonBase href="https://google.com">Hello</ButtonBase>,
    );
    const button = getByText('Hello');

    expect(button).toHaveProperty('nodeName', 'A');
    expect(button.getAttribute('role')).toBeNull();
    expect(button.getAttribute('type')).toBeNull();
    expect(button.getAttribute('href')).toEqual('https://google.com');
  });

  it('href없이 앵커로 설정할 경우 role="button"이 적용됩니다.', () => {
    const { getByText } = render(<ButtonBase component="a">Hello</ButtonBase>);
    const button = getByText('Hello');

    expect(button).toHaveProperty('nodeName', 'A');
    expect(button.getAttribute('type')).toBeNull();
    expect(button.getAttribute('role')).toEqual('button');
  });

  it('커스텀 component와 href가 사용되는 경우 role="button"을 추가하지 마세요.', () => {
    const CustomLink = React.forwardRef(
      (props, ref: React.ForwardedRef<HTMLAnchorElement>) => {
        return <a data-testid="customLink" ref={ref} {...props} />;
      },
    );

    const { getByText } = render(
      <ButtonBase component={CustomLink} href="https://google.com">
        Hello
      </ButtonBase>,
    );
    const button = getByText('Hello');

    expect(button).toHaveProperty('nodeName', 'A');
    expect(button.getAttribute('data-testid')).toEqual('customLink');
    expect(button.getAttribute('href')).toEqual('https://google.com');
    expect(button.getAttribute('role')).not.toEqual('button');
  });

  it('커스텀 component와 to가 사용되는 경우 role="button"을 추가하지 마세요.', () => {
    const CustomLink = React.forwardRef(
      (props: any, ref: React.ForwardedRef<HTMLAnchorElement>) => {
        const { to, ...other } = props;
        return <a data-testid="customLink" ref={ref} href={to} {...other} />;
      },
    );

    const { getByText } = render(
      <ButtonBase<any> component={CustomLink} to="https://google.com">
        Hello
      </ButtonBase>,
    );
    const button = getByText('Hello');

    expect(button).toHaveProperty('nodeName', 'A');
    expect(button.getAttribute('data-testid')).toEqual('customLink');
    expect(button.getAttribute('role')).not.toEqual('button');
  });
});

describe('이벤트 콜백', () => {
  it('이벤트 콜백이 실행되어야 합니다.', () => {
    const onClick = vi.fn();
    const onBlur = vi.fn();
    const onFocus = vi.fn();
    const onKeyUp = vi.fn();
    const onKeyDown = vi.fn();
    const onMouseDown = vi.fn();
    const onMouseLeave = vi.fn();
    const onMouseUp = vi.fn();

    const { getByText } = render(
      <ButtonBase
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
      >
        Hello
      </ButtonBase>,
    );
    const button = getByText('Hello');

    fireEvent.mouseDown(button);
    expect(onMouseDown).toHaveBeenCalledTimes(1);

    fireEvent.mouseUp(button);
    expect(onMouseUp).toHaveBeenCalledTimes(1);

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.focus(button);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(button);
    expect(onKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.keyUp(button);
    expect(onKeyUp).toHaveBeenCalledTimes(1);

    fireEvent.blur(button);
    expect(onBlur).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(button);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});

describe('props: disabled', () => {
  it('disabled이 설정됩니다.', () => {
    const { getByText } = render(<ButtonBase disabled>Hello</ButtonBase>);
    const button = getByText('Hello');

    expect(button).toHaveProperty('nodeName', 'BUTTON');
    expect(button).toHaveProperty('disabled', true);
  });

  it('비활성화되면 포커스는 리셋됩니다.', () => {
    const onFocus = vi.fn();

    const { container, getByText, rerender } = render(
      <ButtonBase onFocus={onFocus}>Hello</ButtonBase>,
    );
    const button = getByText('Hello');

    fireEvent.focus(button);
    expect(onFocus).toHaveBeenCalledTimes(1);

    expect(container.querySelectorAll('.luna-button-base-focus').length).toBe(1);

    rerender(<ButtonBase disabled>Hello</ButtonBase>);

    expect(container.querySelectorAll('.luna-button-base-focus').length).toBe(0);
  });

  it('기본 버튼은 aria-disabled을 추가하지 마세요.', () => {
    const { getByText } = render(<ButtonBase disabled>Hello</ButtonBase>);
    const button = getByText('Hello');

    expect(button).toHaveProperty('disabled', true);
    expect(button.getAttribute('aria-disabled')).toBeNull();
  });

  it('커스텀 component를 설정했다면 aria-disabled가 적용됩니다.', () => {
    const { getByText, rerender } = render(
      <ButtonBase component="span" disabled>
        Hello
      </ButtonBase>,
    );
    const button = getByText('Hello');

    expect(button).not.toHaveProperty('disabled');
    expect(button.getAttribute('aria-disabled')).toEqual('true');

    rerender(<ButtonBase component="span">Hello</ButtonBase>);

    expect(button.getAttribute('aria-disabled')).toBeNull();
  });
});

describe('prop: tabIndex', () => {
  it('tabIndex가 설정됩니다.', () => {
    const { getByText } = render(<ButtonBase tabIndex={3}>Hello</ButtonBase>);

    expect(getByText('Hello')).toHaveProperty('tabIndex', 3);
  });
});

describe('prop: prefixClasses', () => {
  it('prefixClasses가 설정됩니다.', () => {
    const { container } = render(
      <ButtonBase prefixClasses="hello-button-base">Hello</ButtonBase>,
    );

    expect(container.querySelectorAll('.hello-button-base').length).toBe(1);
  });

  it('focus 클래스가 설정됩니다.', () => {
    const { container, getByText } = render(
      <ButtonBase prefixClasses="hello-button-base">Hello</ButtonBase>,
    );
    const button = getByText('Hello');

    act(() => {
      button.focus();
    });

    expect(container.querySelectorAll('.hello-button-base-focus').length).toBe(1);
  });

  it('active 클래스가 설정됩니다.', () => {
    const { container, getByText } = render(
      <ButtonBase prefixClasses="hello-button-base">Hello</ButtonBase>,
    );
    const button = getByText('Hello');

    fireEvent.mouseDown(button);

    expect(container.querySelectorAll('.hello-button-base-active').length).toBe(1);
  });
});
