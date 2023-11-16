import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';

import Button, { ButtonClassKey, buttonClasses as classes } from './index';

function getClassName(className: ButtonClassKey) {
  return `luna-btn-${classes[className]}`;
}

describe('<Button />', () => {
  it('렌더링 됩니다.', () => {
    const { getByTestId } = render(<Button data-testid="button">Button</Button>);
    const button = getByTestId('button');

    expect(button.classList.contains(getClassName('root'))).toBeTruthy();
    expect(button.textContent).toEqual('Button');
  });

  it('type을 변경할 수 있습니다.', () => {
    const { container, rerender } = render(<Button type="button">Hello World</Button>);
    expect(container.firstChild).toHaveProperty('type', 'button');

    rerender(<Button type="submit">Hello World</Button>);
    expect(container.firstChild).toHaveProperty('type', 'submit');

    rerender(<Button type="reset">Hello World</Button>);
    expect(container.firstChild).toHaveProperty('type', 'reset');
  });

  it('component을 변경하면 웹 접근성의 요구사항을 추가해야합니다.', () => {
    const { getByRole } = render(
      <Button component="span" role="checkbox" aria-checked={false} />,
    );
    const checkbox = getByRole('checkbox');

    expect(checkbox).toHaveProperty('nodeName', 'SPAN');
    expect(checkbox.getAttribute('tabIndex')).toEqual('0');
  });

  it('type="button인 경우 role="button"을 추가하지 마세요.', () => {
    const { getByText } = render(<Button type="button">Hello</Button>);
    expect(getByText('Hello').getAttribute('role')).toBeNull();
  });

  it('href을 설정하면 자동으로 버튼을 앵커로 변경됩니다.', () => {
    const { getByText } = render(<Button href="https://google.com">Hello</Button>);
    const button = getByText('Hello');

    expect(button).toHaveProperty('nodeName', 'A');
    expect(button.getAttribute('role')).toBeNull();
    expect(button.getAttribute('type')).toBeNull();
    expect(button.getAttribute('href')).toEqual('https://google.com');
  });

  it('href없이 앵커로 설정할 경우 role="button"이 적용됩니다.', () => {
    const { getByText } = render(<Button component="a">Hello</Button>);
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
      <Button component={CustomLink} href="https://google.com">
        Hello
      </Button>,
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
      <Button<any> component={CustomLink} to="https://google.com">
        Hello
      </Button>,
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
      <Button
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
      </Button>,
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

describe('props: color', () => {
  it('className 적용됩니다.', () => {
    const { getByRole, rerender } = render(<Button />);
    const button = getByRole('button');

    expect(button.classList.contains(getClassName('root'))).toBeTruthy();
    expect(button.classList.contains(getClassName('colorPrimary'))).not.toBeTruthy();
    expect(button.classList.contains(getClassName('colorSecondary'))).not.toBeTruthy();
    expect(button.classList.contains(getClassName('colorSuccess'))).not.toBeTruthy();
    expect(button.classList.contains(getClassName('colorError'))).not.toBeTruthy();
    expect(button.classList.contains(getClassName('colorInfo'))).not.toBeTruthy();
    expect(button.classList.contains(getClassName('colorWarning'))).not.toBeTruthy();
    expect(button.classList.contains(getClassName('colorDark'))).not.toBeTruthy();
    expect(button.classList.contains(getClassName('colorLight'))).not.toBeTruthy();

    rerender(<Button color="primary" />);
    expect(button.classList.contains(getClassName('colorPrimary'))).toBeTruthy();
    rerender(<Button color="secondary" />);
    expect(button.classList.contains(getClassName('colorSecondary'))).toBeTruthy();
    rerender(<Button color="success" />);
    expect(button.classList.contains(getClassName('colorSuccess'))).toBeTruthy();
    rerender(<Button color="error" />);
    expect(button.classList.contains(getClassName('colorError'))).toBeTruthy();
    rerender(<Button color="info" />);
    expect(button.classList.contains(getClassName('colorInfo'))).toBeTruthy();
    rerender(<Button color="warning" />);
    expect(button.classList.contains(getClassName('colorWarning'))).toBeTruthy();
    rerender(<Button color="dark" />);
    expect(button.classList.contains(getClassName('colorDark'))).toBeTruthy();
    rerender(<Button color="light" />);
    expect(button.classList.contains(getClassName('colorLight'))).toBeTruthy();
  });
});

describe('props: disabled', () => {
  it('disabled이 설정됩니다.', () => {
    const { getByText } = render(<Button disabled>Hello</Button>);
    const button = getByText('Hello');

    expect(button).toHaveProperty('nodeName', 'BUTTON');
    expect(button).toHaveProperty('disabled', true);
  });
});

describe('props: shape', () => {
  it('className 적용됩니다.', () => {
    const { getByRole, rerender } = render(<Button />);
    const button = getByRole('button');

    expect(button.classList.contains(getClassName('root'))).toBeTruthy();
    expect(button.classList.contains(getClassName('shapeCircle'))).not.toBeTruthy();
    expect(button.classList.contains(getClassName('shapeRound'))).not.toBeTruthy();

    rerender(<Button shape="circle" />);
    expect(button.classList.contains(getClassName('shapeCircle'))).toBeTruthy();
    rerender(<Button shape="round" />);
    expect(button.classList.contains(getClassName('shapeRound'))).toBeTruthy();
  });
});

describe('props: size', () => {
  it('className 적용됩니다.', () => {
    const { getByRole, rerender } = render(<Button />);
    const button = getByRole('button');

    expect(button.classList.contains(getClassName('root'))).toBeTruthy();
    expect(button.classList.contains(getClassName('sizeMedium'))).toBeTruthy();
    expect(button.classList.contains(getClassName('sizeSmall'))).not.toBeTruthy();
    expect(button.classList.contains(getClassName('sizeLarge'))).not.toBeTruthy();

    rerender(<Button size="small" />);
    expect(button.classList.contains(getClassName('sizeSmall'))).toBeTruthy();
    rerender(<Button size="medium" />);
    expect(button.classList.contains(getClassName('sizeMedium'))).toBeTruthy();
    rerender(<Button size="large" />);
    expect(button.classList.contains(getClassName('sizeLarge'))).toBeTruthy();
  });
});

describe('prop: tabIndex', () => {
  it('tabIndex가 설정됩니다.', () => {
    const { getByText } = render(<Button tabIndex={3}>Hello</Button>);

    expect(getByText('Hello')).toHaveProperty('tabIndex', 3);
  });
});
