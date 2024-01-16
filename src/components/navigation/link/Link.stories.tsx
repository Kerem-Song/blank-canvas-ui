import { Card } from '@components/data-display';
import { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';
import { Link as ReactRouterLink, Outlet, useLocation } from 'react-router-dom';
import {
  reactRouterOutlets,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

import { Link, LinkProps } from './index';

const FlexBox = ({
  className,
  children,
}: React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={classNames('flex items-center gap-4 p-2', className)}>{children}</div>
  );
};

const meta: Meta<LinkProps> = {
  title: 'components/navigation/Link',
  component: Link,
  decorators: [withRouter],
  tags: ['autodocs'],
  argTypes: {
    overlay: { control: { type: null } },
  },
};

export default meta;
type Story = StoryObj<LinkProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <FlexBox>
        <Link {...args} />
      </FlexBox>
    );
  },
  argTypes: {
    color: {
      control: 'select',
    },
    size: {
      control: 'select',
    },
  },
  args: {
    component: 'a',
    href: '#basics',
    disabled: false,
    underline: 'always',
    children: 'Link',
    color: 'primary',
    size: 'md',
    prefix: 'bc',
  },
};

export const Size: Story = {
  render: () => {
    return (
      <FlexBox>
        <Link href="#size" size="xs">
          Tiny
        </Link>
        <Link href="#size" size="sm">
          Small
        </Link>
        <Link href="#size" size="md">
          Medium
        </Link>
        <Link href="#size" size="lg">
          Large
        </Link>
      </FlexBox>
    );
  },
};

export const Color: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Link href="#color" color="default">
            Default
          </Link>
          <Link href="#color" color="primary">
            Primary
          </Link>
          <Link href="#color" color="secondary">
            Secondary
          </Link>
          <Link href="#color" color="success">
            Success
          </Link>
          <Link href="#color" color="error">
            Error
          </Link>
          <Link href="#color" color="info">
            Info
          </Link>
          <Link href="#color" color="dark">
            Dark
          </Link>
        </FlexBox>
        <FlexBox>
          <Link href="#color" color="default" underline="hover">
            Default
          </Link>
          <Link href="#color" color="primary" underline="hover">
            Primary
          </Link>
          <Link href="#color" color="secondary" underline="hover">
            Secondary
          </Link>
          <Link href="#color" color="success" underline="hover">
            Success
          </Link>
          <Link href="#color" color="error" underline="hover">
            Error
          </Link>
          <Link href="#color" color="info" underline="hover">
            Info
          </Link>
          <Link href="#color" color="dark" underline="hover">
            Dark
          </Link>
        </FlexBox>
        <FlexBox>
          <Link href="#color" color="default" underline="none">
            Default
          </Link>
          <Link href="#color" color="primary" underline="none">
            Primary
          </Link>
          <Link href="#color" color="secondary" underline="none">
            Secondary
          </Link>
          <Link href="#color" color="success" underline="none">
            Success
          </Link>
          <Link href="#color" color="error" underline="none">
            Error
          </Link>
          <Link href="#color" color="info" underline="none">
            Info
          </Link>
          <Link href="#color" color="dark" underline="none">
            Dark
          </Link>
        </FlexBox>
      </>
    );
  },
};

/**
 * Link 컴포넌트에서 밑줄이 동작하는 방식을 제어하려면 `underline` 속성을 사용하세요.<br>
 * `hover`, `Always`, `None`의 세 가지 값이 제공됩니다.
 */
export const Underline: Story = {
  render: () => {
    return (
      <FlexBox>
        <Link href="#underline" underline="always">
          Always
        </Link>
        <Link href="#underline" underline="hover">
          Hover
        </Link>
        <Link href="#underline" underline="none">
          None
        </Link>
      </FlexBox>
    );
  },
};

/**
 * 비활성화하려면 `disabled` 속성을 사용하세요.
 */
export const Disabled: Story = {
  render: () => {
    return (
      <FlexBox>
        <Link href="#disabled" disabled>
          Disabled
        </Link>
      </FlexBox>
    );
  },
};

/**
 * 전체 구성 요소를 링크로 클릭할 수 있도록 하려면 `overlay 속성을 사용하세요.<br>
 * 데모에서는 카드 구성 요소와 함께 이를 사용하여 적절한 접근성을 보장하는 방법을 보여줍니다.
 */
export const Overlay: Story = {
  render: () => {
    return (
      <FlexBox>
        <Card rounded>
          <div className="relative m-[-0.75rem] flex flex-col gap-4 p-2">
            <img
              src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="web design"
            />
            <Link
              href="#introduction"
              underline="none"
              className="flex flex-col items-start"
              overlay
            >
              <div>
                <h1>Luna Design</h1>
              </div>
              <div>
                <p>Components UI</p>
              </div>
            </Link>
          </div>
        </Card>
      </FlexBox>
    );
  },
};

/**
 * `target="_blank"`다른 사이트의 페이지에 대한 링크와 함께 사용할 경우 Google Chrome 개발자 문서에서는 잠재적인 보안 문제를 방지하기위해 `rel="noopener"` or `rel="noreferrer"`을 추가하는 것을 권장합니다.
 * - `rel="noopener"` 새 페이지가 window.opener 속성을 액세스할 수 없도록 방지하고 별도의 프로세스에서 실행되도록 합니다. 이것이 없으면 대상 페이지가 잠재적으로 페이지를 악성 URL로 리디렉션할 수 있습니다.
 * - `rel="noreferrer"` 동일한 효과가 있지만 Referer 헤더가 새 페이지로 전송되는 것을 방지합니다. 리퍼러 헤더를 제거하면 분석에 영향을 미칩니다.
 */
export const Security: Story = {
  render: () => {
    return (
      <FlexBox>
        <Link href="https://google.com" target="_blank" rel="noopener noreferrer">
          Security
        </Link>
      </FlexBox>
    );
  },
};

/**
 * Link 구성 요소를 버튼으로 사용하려면 `component` 속성에 button에 값을 할당하세요.<br>
 * 이는 다음 두 가지 상황에서 유용할 수 있습니다.
 *
 * - 링크에 의미 있는 href가 없습니다.
 * - 디자인은 링크라기보다는 버튼에 가깝습니다.
 */
export const PolymorphicComponent: Story = {
  name: 'As a button',
  render: () => {
    return (
      <FlexBox>
        <Link component="button" onClick={() => alert('link')}>
          Do something
        </Link>
      </FlexBox>
    );
  },
};

/**
 * 다음은 React Router의 Link 구성 요소를 사용한 예입니다 .
 */
export const ThirdPartyReactRouting: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();

    return (
      <>
        <div>
          <p>React-Router: {location.pathname}</p>
        </div>
        <div>
          <Outlet />
        </div>
        <FlexBox>
          <Link component={ReactRouterLink} to="/">
            Go to Page Index
          </Link>
          <Link component={ReactRouterLink} to="/account">
            Go to page Account
          </Link>
        </FlexBox>
      </>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlets([
        {
          path: '',
          element: <p>index</p>,
        },
        {
          path: 'account',
          element: <p>account</p>,
        },
      ]),
    }),
  },
};
