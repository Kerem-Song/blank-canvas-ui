import { generatePrefixClasses } from '@modules/utils/generatePrefixClasses';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';
import { buttonClasses as classes } from './buttonClasses';

describe('<Button />', () => {
  it('렌더링 됩니다.', () => {
    const { getByTestId } = render(<Button data-testid="button">Button</Button>);
    const button = getByTestId('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
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

    expect(button.classList.contains(classes.root)).toBeTruthy();

    rerender(<Button color="primary" />);
    expect(button.classList.contains(classes.colorPrimary)).toBeTruthy();
    rerender(<Button color="secondary" />);
    expect(button.classList.contains(classes.colorSecondary)).toBeTruthy();
    rerender(<Button color="success" />);
    expect(button.classList.contains(classes.colorSuccess)).toBeTruthy();
    rerender(<Button color="error" />);
    expect(button.classList.contains(classes.colorError)).toBeTruthy();
    rerender(<Button color="info" />);
    expect(button.classList.contains(classes.colorInfo)).toBeTruthy();
    rerender(<Button color="warning" />);
    expect(button.classList.contains(classes.colorWarning)).toBeTruthy();
  });

  it('primary', () => {
    const { getByRole } = render(<Button color="primary" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.colorPrimary)).toBeTruthy();
  });

  it('secondary', () => {
    const { getByRole } = render(<Button color="secondary" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.colorSecondary)).toBeTruthy();
  });

  it('success', () => {
    const { getByRole } = render(<Button color="success" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.colorSuccess)).toBeTruthy();
  });

  it('error', () => {
    const { getByRole } = render(<Button color="error" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.colorError)).toBeTruthy();
  });

  it('info', () => {
    const { getByRole } = render(<Button color="info" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.colorInfo)).toBeTruthy();
  });

  it('warning', () => {
    const { getByRole } = render(<Button color="warning" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.colorWarning)).toBeTruthy();
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

    expect(button.classList.contains(classes.root)).toBeTruthy();

    rerender(<Button shape="circle" />);
    expect(button.classList.contains(classes.shapeCircle)).toBeTruthy();
    rerender(<Button shape="round" />);
    expect(button.classList.contains(classes.shapeRound)).toBeTruthy();
  });

  it('circle', () => {
    const { getByRole } = render(<Button shape="circle" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.shapeCircle)).toBeTruthy();
  });

  it('round', () => {
    const { getByRole } = render(<Button shape="round" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.shapeRound)).toBeTruthy();
  });
});

describe('Props: size', () => {
  it('className 적용됩니다.', () => {
    const { getByRole, rerender } = render(<Button />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();

    rerender(<Button size="xs" />);
    expect(button.classList.contains(classes.sizeXSmall)).toBeTruthy();
    rerender(<Button size="sm" />);
    expect(button.classList.contains(classes.sizeSmall)).toBeTruthy();
    rerender(<Button size="md" />);
    expect(button.classList.contains(classes.sizeMedium)).toBeTruthy();
    rerender(<Button size="lg" />);
    expect(button.classList.contains(classes.sizeLarge)).toBeTruthy();
  });

  it('xsmall', () => {
    const { getByRole } = render(<Button size="xs" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.sizeXSmall)).toBeTruthy();
  });

  it('small', () => {
    const { getByRole } = render(<Button size="sm" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.sizeSmall)).toBeTruthy();
  });

  it('medium', () => {
    const { getByRole } = render(<Button size="md" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.sizeMedium)).toBeTruthy();
  });

  it('large', () => {
    const { getByRole } = render(<Button size="lg" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.sizeLarge)).toBeTruthy();
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
    const startIcon = button.querySelector(`.${classes.startIcon}`);

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(startIcon!.classList.contains(classes.endIcon)).toBeFalsy();
  });

  it('endIcon으로 버튼을 렌더링해야 합니다.', () => {
    const { getByRole } = render(
      <Button endIcon={<span>icon</span>}>Hello World</Button>,
    );
    const button = getByRole('button');
    const endIcon = button.querySelector(`.${classes.endIcon}`);

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(endIcon!.classList.contains(classes.startIcon)).toBeFalsy();
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
    const startIcon = button.querySelector(`.${classes.startIcon}`);
    const endIcon = button.querySelector(`.${classes.endIcon}`);

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(startIcon!.classList.contains('custom-icon-wrapper')).toBeTruthy();
    expect(endIcon!.classList.contains('custom-icon-wrapper')).toBeTruthy();
  });
});

describe('Props: variant', () => {
  it('className 적용됩니다.', () => {
    const { getByRole, rerender } = render(<Button />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();

    rerender(<Button variant="contained" />);
    expect(button.classList.contains(classes.contained)).toBeTruthy();
    rerender(<Button variant="text" />);
    expect(button.classList.contains(classes.text)).toBeTruthy();
  });

  it('contained', () => {
    const { getByRole } = render(<Button variant="contained" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.contained)).toBeTruthy();
  });

  it('outlined', () => {
    const { getByRole } = render(<Button variant="outlined" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.outlined)).toBeTruthy();
  });

  it('text', () => {
    const { getByRole } = render(<Button variant="text" />);
    const button = getByRole('button');

    expect(button.classList.contains(classes.root)).toBeTruthy();
    expect(button.classList.contains(classes.text)).toBeTruthy();
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
