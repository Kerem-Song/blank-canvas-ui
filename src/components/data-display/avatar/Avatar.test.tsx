import { fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Avatar } from './Avatar';
import { AvatarClasses, avatarClasses as classes } from './avatarClasses';
import * as useLoadedHook from './useLoaded';

describe('<Avatar />', () => {
  it('렌더링 됩니다.', () => {
    const { container } = render(
      <Avatar
        src="/fake.png"
        alt="Hello World!"
        className="my-avatar"
        data-my-prop="woofAvatar"
      />,
    );
    const avatar = container.firstChild as HTMLElement;

    expect(avatar).toHaveProperty('nodeName', 'DIV');
    expect(avatar.classList.contains(classes.root)).toBeTruthy();
    expect(avatar.classList.contains('my-avatar')).toBeTruthy();
    expect(avatar.getAttribute('data-my-prop')).toBe('woofAvatar');
  });
});

describe('아바타 이미지를 로드하는 중에 오류가 발생했을때 대체 이미지로 대체되는가?', () => {
  beforeEach(() => {
    const useLoadedSpy = vi.spyOn(useLoadedHook, 'useLoaded');
    useLoadedSpy.mockReturnValue('error');
  });

  it('`children` 속성', () => {
    const { container } = render(
      <Avatar src="/fake.png" alt="Hello World!">
        WE
      </Avatar>,
    );
    const avatar = container.firstChild as HTMLElement;

    expect(avatar).toHaveProperty('nodeName', 'DIV');
    expect(avatar.classList.contains(classes.root)).toBeTruthy();
    expect(avatar.innerHTML).toBe('WE');
  });

  it('대체 텍스트의 첫 글자', () => {
    const { container } = render(<Avatar src="/fake.png" alt="Hello World!" />);
    const avatar = container.firstChild as HTMLElement;

    expect(avatar).toHaveProperty('nodeName', 'DIV');
    expect(avatar.classList.contains(classes.root)).toBeTruthy();
    expect(avatar.innerHTML).toBe('H');
  });

  it('일반 아바타 아이콘', () => {
    const { container } = render(<Avatar src="/fake.png" />);
    const avatar = container.firstChild as HTMLElement;

    expect(avatar).toHaveProperty('nodeName', 'DIV');
    expect(avatar.classList.contains(classes.root)).toBeTruthy();
    expect(
      (avatar.firstChild as HTMLElement).classList.contains(classes.fallback),
    ).toBeTruthy();
  });
});

describe('이벤트 콜백', () => {
  it('이벤트 콜백을 실행됩니다.', () => {
    const onClick = vi.fn();
    const onBlur = vi.fn();
    const onFocus = vi.fn();
    const onKeyUp = vi.fn();
    const onKeyDown = vi.fn();
    const onMouseDown = vi.fn();
    const onMouseLeave = vi.fn();
    const onMouseUp = vi.fn();

    const { container } = render(
      <Avatar
        src="/fake.png"
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
      />,
    );
    const avatar = container.firstChild as HTMLElement;

    fireEvent.mouseDown(avatar);
    expect(onMouseDown).toHaveBeenCalledTimes(1);

    fireEvent.mouseUp(avatar);
    expect(onMouseUp).toHaveBeenCalledTimes(1);

    fireEvent.click(avatar);
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.focus(avatar);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(avatar);
    expect(onKeyDown).toHaveBeenCalledTimes(1);

    fireEvent.keyUp(avatar);
    expect(onKeyUp).toHaveBeenCalledTimes(1);

    fireEvent.blur(avatar);
    expect(onBlur).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(avatar);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});

describe('icon 아바타', () => {
  it('아이콘이 포함된 div를 렌더링해야 합니다.', () => {
    const { container } = render(
      <Avatar>
        <span className="my-icon">icon</span>
      </Avatar>,
    );
    const avatar = container.firstChild as HTMLElement;
    const icon = avatar.firstChild as HTMLElement;

    expect(avatar).toHaveProperty('nodeName', 'DIV');
    expect(icon).toHaveProperty('nodeName', 'SPAN');
    expect(icon.classList.contains('my-icon')).toBeTruthy();
    expect(icon.innerHTML).toBe('icon');
  });

  it('`colorDefault` className이 적용됩니다.', () => {
    const { container } = render(
      <Avatar>
        <span>icon</span>
      </Avatar>,
    );
    const avatar = container.firstChild as HTMLElement;

    expect(avatar.classList.contains(classes.colorDefault)).toBeTruthy();
  });
});

describe('text 아바타', () => {
  it('텍스트가 포함된 div를 렌더링해야 합니다.', () => {
    const { container } = render(<Avatar>OT</Avatar>);
    const avatar = container.firstChild as HTMLElement;

    expect(avatar).toHaveProperty('nodeName', 'DIV');
    expect(avatar.innerHTML).toBe('OT');
  });

  it('`colorDefault` className이 적용됩니다.', () => {
    const { container } = render(<Avatar>OT</Avatar>);
    const avatar = container.firstChild as HTMLElement;

    expect(avatar.classList.contains(classes.colorDefault)).toBeTruthy();
  });
});

describe('props: imgProps', () => {
  it('이미지에 속성을 추가할 수 있습니다.', () => {
    const onError = vi.fn();
    const { container } = render(<Avatar src="/fake.png" imgProps={{ onError }} />);
    const img = container.querySelector('img') as HTMLImageElement;

    fireEvent.error(img);
    expect(onError).toBeCalledTimes(1);
  });
});

describe('prop: variant', () => {
  (['circular', 'rounded', 'square'] as const).forEach((variant) => {
    it(`${variant} variant 적용됩니다.`, () => {
      const { container } = render(<Avatar src="/fake.png" variant={variant} />);

      expect(
        (container.firstChild as HTMLElement).classList.contains(
          classes[variant as keyof AvatarClasses],
        ),
      ).toBeTruthy();
    });
  });
});
