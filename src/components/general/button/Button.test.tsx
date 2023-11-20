import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';

import generatePrefixClasses from '@modules/utils/generatePrefixClasses';
import Button, { ButtonClassKey, buttonClasses } from './index';

/** default prefix */
function getDEFPrefix(className: ButtonClassKey) {
  return `luna-btn-${buttonClasses[className]}`;
}

describe('<Button />', () => {
  it('렌더링 됩니다.', () => {
    const { getByTestId } = render(<Button data-testid="button">Button</Button>);
    const button = getByTestId('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
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
});

describe('Props: href', () => {
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

describe('Props: color', () => {
  it('className 적용됩니다.', () => {
    const { getByRole, rerender } = render(<Button />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorPrimary'))).not.toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorSecondary'))).not.toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorSuccess'))).not.toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorError'))).not.toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorInfo'))).not.toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorWarning'))).not.toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorDark'))).not.toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorLight'))).not.toBeTruthy();

    rerender(<Button color="primary" />);
    expect(button.classList.contains(getDEFPrefix('colorPrimary'))).toBeTruthy();
    rerender(<Button color="secondary" />);
    expect(button.classList.contains(getDEFPrefix('colorSecondary'))).toBeTruthy();
    rerender(<Button color="success" />);
    expect(button.classList.contains(getDEFPrefix('colorSuccess'))).toBeTruthy();
    rerender(<Button color="error" />);
    expect(button.classList.contains(getDEFPrefix('colorError'))).toBeTruthy();
    rerender(<Button color="info" />);
    expect(button.classList.contains(getDEFPrefix('colorInfo'))).toBeTruthy();
    rerender(<Button color="warning" />);
    expect(button.classList.contains(getDEFPrefix('colorWarning'))).toBeTruthy();
    rerender(<Button color="dark" />);
    expect(button.classList.contains(getDEFPrefix('colorDark'))).toBeTruthy();
    rerender(<Button color="light" />);
    expect(button.classList.contains(getDEFPrefix('colorLight'))).toBeTruthy();
  });

  it('primary', () => {
    const { getByRole } = render(<Button color="primary" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorPrimary'))).toBeTruthy();
  });

  it('secondary', () => {
    const { getByRole } = render(<Button color="secondary" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorSecondary'))).toBeTruthy();
  });

  it('success', () => {
    const { getByRole } = render(<Button color="success" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorSuccess'))).toBeTruthy();
  });

  it('error', () => {
    const { getByRole } = render(<Button color="error" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorError'))).toBeTruthy();
  });

  it('info', () => {
    const { getByRole } = render(<Button color="info" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorInfo'))).toBeTruthy();
  });

  it('warning', () => {
    const { getByRole } = render(<Button color="warning" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorWarning'))).toBeTruthy();
  });

  it('dark', () => {
    const { getByRole } = render(<Button color="dark" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorDark'))).toBeTruthy();
  });

  it('light', () => {
    const { getByRole } = render(<Button color="light" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('colorLight'))).toBeTruthy();
  });
});

describe('Props: disabled', () => {
  it('disabled 설정됩니다.', () => {
    const { getByRole } = render(<Button disabled />);
    const button = getByRole('button');

    expect(button).toHaveProperty('nodeName', 'BUTTON');
    expect(button).toHaveProperty('disabled', true);
  });

  it('disabled 설정되면 포커스되지 않습니다.', () => {
    const { getByRole } = render(<Button disabled />);

    const button = getByRole('button');

    act(() => {
      button.focus();
    });

    expect(document.activeElement).not.toEqual(button);
  });

  it('disabled 설정되면 사용자 동작에 응답하지 않습니다.', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button disabled onClick={onClick} />);

    const button = getByRole('button');

    act(() => {
      button.click();
      fireEvent.keyDown(button, { key: 'Enter' });
      fireEvent.keyUp(button, { key: ' ' });
    });

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});

describe('Props: shape', () => {
  it('className 적용됩니다.', () => {
    const { getByRole, rerender } = render(<Button />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('shapeCircle'))).not.toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('shapeRound'))).not.toBeTruthy();

    rerender(<Button shape="circle" />);
    expect(button.classList.contains(getDEFPrefix('shapeCircle'))).toBeTruthy();
    rerender(<Button shape="round" />);
    expect(button.classList.contains(getDEFPrefix('shapeRound'))).toBeTruthy();
  });

  it('circle', () => {
    const { getByRole } = render(<Button shape="circle" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('shapeCircle'))).toBeTruthy();
  });

  it('round', () => {
    const { getByRole } = render(<Button shape="round" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('shapeRound'))).toBeTruthy();
  });
});

describe('Props: size', () => {
  it('className 적용됩니다.', () => {
    const { getByRole, rerender } = render(<Button />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('sizeMedium'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('sizeSmall'))).not.toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('sizeLarge'))).not.toBeTruthy();

    rerender(<Button size="small" />);
    expect(button.classList.contains(getDEFPrefix('sizeSmall'))).toBeTruthy();
    rerender(<Button size="medium" />);
    expect(button.classList.contains(getDEFPrefix('sizeMedium'))).toBeTruthy();
    rerender(<Button size="large" />);
    expect(button.classList.contains(getDEFPrefix('sizeLarge'))).toBeTruthy();
  });

  it('small', () => {
    const { getByRole } = render(<Button size="small" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('sizeSmall'))).toBeTruthy();
  });

  it('medium', () => {
    const { getByRole } = render(<Button size="medium" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('sizeMedium'))).toBeTruthy();
  });

  it('large', () => {
    const { getByRole } = render(<Button size="large" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('sizeLarge'))).toBeTruthy();
  });
});

describe('Props: tabIndex', () => {
  it('tabIndex가 설정됩니다.', () => {
    const { getByText } = render(<Button tabIndex={3}>Hello</Button>);

    expect(getByText('Hello')).toHaveProperty('tabIndex', 3);
  });
});

describe('Props: startIcon & endIcon', () => {
  it('startIcon으로 버튼을 렌더링해야 합니다.', () => {
    const { getByRole } = render(
      <Button startIcon={<span>icon</span>}>Hello World</Button>,
    );
    const button = getByRole('button');
    const startIcon = button.querySelector(`.${getDEFPrefix('startIcon')}`);

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(startIcon!.classList.contains(getDEFPrefix('endIcon'))).toBeFalsy();
  });

  it('endIcon으로 버튼을 렌더링해야 합니다.', () => {
    const { getByRole } = render(
      <Button endIcon={<span>icon</span>}>Hello World</Button>,
    );
    const button = getByRole('button');
    const endIcon = button.querySelector(`.${getDEFPrefix('endIcon')}`);

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(endIcon!.classList.contains(getDEFPrefix('startIcon'))).toBeFalsy();
  });
});

describe('Props: slotProps', () => {
  it('슬롯 icon - wrapper className 적용됩니다.', () => {
    const { getByRole } = render(
      <Button
        startIcon={<span>icon</span>}
        endIcon={<span>icon</span>}
        slotProps={{
          iconWrapper: {
            className: 'custom-icon-wrapper',
          },
        }}
      />,
    );
    const button = getByRole('button');
    const startIcon = button.querySelector(`.${getDEFPrefix('startIcon')}`);
    const endIcon = button.querySelector(`.${getDEFPrefix('endIcon')}`);

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(startIcon!.classList.contains('custom-icon-wrapper')).toBeTruthy();
    expect(endIcon!.classList.contains('custom-icon-wrapper')).toBeTruthy();
  });
});

describe('Props: variant', () => {
  it('className 적용됩니다.', () => {
    const { getByRole, rerender } = render(<Button />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('outlined'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('contained'))).not.toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('text'))).not.toBeTruthy();

    rerender(<Button variant="contained" />);
    expect(button.classList.contains(getDEFPrefix('contained'))).toBeTruthy();
    rerender(<Button variant="text" />);
    expect(button.classList.contains(getDEFPrefix('text'))).toBeTruthy();
  });

  it('contained', () => {
    const { getByRole } = render(<Button variant="contained" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('contained'))).toBeTruthy();
  });

  it('outlined', () => {
    const { getByRole } = render(<Button variant="outlined" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('outlined'))).toBeTruthy();
  });

  it('text', () => {
    const { getByRole } = render(<Button variant="text" />);
    const button = getByRole('button');

    expect(button.classList.contains(getDEFPrefix('root'))).toBeTruthy();
    expect(button.classList.contains(getDEFPrefix('text'))).toBeTruthy();
  });
});

describe('Props: prefix', () => {
  it('className 적용됩니다.', () => {
    const { getByRole } = render(<Button prefix="prefix" />);
    const button = getByRole('button');

    const classes = generatePrefixClasses(buttonClasses, 'prefix');

    expect(button.classList.contains(classes.root)).toBeTruthy();
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
