import * as React from 'react';
import { Link as ReactRouterLink, Outlet, useLocation } from 'react-router-dom';
import { Button, ButtonProps } from '@components/general/button';
import { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';
import {
  reactRouterOutlets,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

import '../../../index.css';

const meta: Meta<ButtonProps> = {
  title: 'components/general/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [withRouter],
};

export default meta;
type Story = StoryObj<ButtonProps>;

const FlexBox = ({
  className,
  children,
}: React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={classNames('flex items-center gap-4 p-2', className)}>{children}</div>
  );
};

export const Default: Story = {
  render: ({ children, ...args }) => {
    return (
      <>
        <Button {...args}>{children}</Button>
      </>
    );
  },
  argTypes: {
    component: {
      description:
        '루트 노드에 사용되는 구성 요소입니다. HTML 요소 또는 구성 요소를 사용하는 문자열입니다.',
    },
    color: {
      control: 'select',
    },
    shape: {
      control: 'select',
    },
    size: {
      control: 'select',
    },
    variant: {
      control: 'select',
    },
    startIcon: { control: { type: null } },
    endIcon: { control: { type: null } },
  },
  args: {
    component: 'button',
    children: 'Default',
  },
};

export const BasicButton: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </FlexBox>
      </>
    );
  },
};

export const TextButton: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Button variant="text">Default</Button>
          <Button variant="text" disabled>
            Disabled
          </Button>
          <Button variant="text" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="text" color="primary">
            Primary
          </Button>
          <Button variant="text" color="primary" disabled>
            Disabled
          </Button>
          <Button variant="text" color="primary" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="text" color="secondary">
            Secondary
          </Button>
          <Button variant="text" color="secondary" disabled>
            Disabled
          </Button>
          <Button variant="text" color="secondary" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="text" color="success">
            Success
          </Button>
          <Button variant="text" color="success" disabled>
            Disabled
          </Button>
          <Button variant="text" color="success" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="text" color="error">
            Error
          </Button>
          <Button variant="text" color="error" disabled>
            Disabled
          </Button>
          <Button variant="text" color="error" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="text" color="warning">
            Warning
          </Button>
          <Button variant="text" color="warning" disabled>
            Disabled
          </Button>
          <Button variant="text" color="warning" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="text" color="dark">
            Dark
          </Button>
          <Button variant="text" color="dark" disabled>
            Disabled
          </Button>
          <Button variant="text" color="dark" href="#">
            Link
          </Button>
        </FlexBox>
      </>
    );
  },
};

export const ContainedButton: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Button variant="contained">Default</Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
          <Button variant="contained" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="contained" color="primary">
            Primary
          </Button>
          <Button variant="contained" color="primary" disabled>
            Disabled
          </Button>
          <Button variant="contained" color="primary" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="contained" color="secondary" disabled>
            Disabled
          </Button>
          <Button variant="contained" color="secondary" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="contained" color="success">
            Success
          </Button>
          <Button variant="contained" color="success" disabled>
            Disabled
          </Button>
          <Button variant="contained" color="success" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="contained" color="error">
            Error
          </Button>
          <Button variant="contained" color="error" disabled>
            Disabled
          </Button>
          <Button variant="contained" color="error" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="contained" color="warning">
            Warning
          </Button>
          <Button variant="contained" color="warning" disabled>
            Disabled
          </Button>
          <Button variant="contained" color="warning" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="contained" color="dark">
            Dark
          </Button>
          <Button variant="contained" color="dark" disabled>
            Disabled
          </Button>
          <Button variant="contained" color="dark" href="#">
            Link
          </Button>
        </FlexBox>
      </>
    );
  },
};

export const OutlinedButton: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Button variant="outlined">Default</Button>
          <Button variant="outlined" disabled>
            Disabled
          </Button>
          <Button variant="outlined" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="outlined" color="primary">
            Primary
          </Button>
          <Button variant="outlined" color="primary" disabled>
            Disabled
          </Button>
          <Button variant="outlined" color="primary" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="outlined" color="secondary">
            Secondary
          </Button>
          <Button variant="outlined" color="secondary" disabled>
            Disabled
          </Button>
          <Button variant="outlined" color="secondary" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="outlined" color="success">
            Success
          </Button>
          <Button variant="outlined" color="success" disabled>
            Disabled
          </Button>
          <Button variant="outlined" color="success" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="outlined" color="error">
            Error
          </Button>
          <Button variant="outlined" color="error" disabled>
            Disabled
          </Button>
          <Button variant="outlined" color="error" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="outlined" color="warning">
            Warning
          </Button>
          <Button variant="outlined" color="warning" disabled>
            Disabled
          </Button>
          <Button variant="outlined" color="warning" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="outlined" color="dark">
            Dark
          </Button>
          <Button variant="outlined" color="dark" disabled>
            Disabled
          </Button>
          <Button variant="outlined" color="dark" href="#">
            Link
          </Button>
        </FlexBox>
      </>
    );
  },
};

export const DashedButton: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Button variant="dashed">Default</Button>
          <Button variant="dashed" disabled>
            Disabled
          </Button>
          <Button variant="dashed" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="dashed" color="primary">
            Primary
          </Button>
          <Button variant="dashed" color="primary" disabled>
            Disabled
          </Button>
          <Button variant="dashed" color="primary" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="dashed" color="secondary">
            Secondary
          </Button>
          <Button variant="dashed" color="secondary" disabled>
            Disabled
          </Button>
          <Button variant="dashed" color="secondary" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="dashed" color="success">
            Success
          </Button>
          <Button variant="dashed" color="success" disabled>
            Disabled
          </Button>
          <Button variant="dashed" color="success" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="dashed" color="error">
            Error
          </Button>
          <Button variant="dashed" color="error" disabled>
            Disabled
          </Button>
          <Button variant="dashed" color="error" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="dashed" color="warning">
            Warning
          </Button>
          <Button variant="dashed" color="warning" disabled>
            Disabled
          </Button>
          <Button variant="dashed" color="warning" href="#">
            Link
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="dashed" color="dark">
            Dark
          </Button>
          <Button variant="dashed" color="dark" disabled>
            Disabled
          </Button>
          <Button variant="dashed" color="dark" href="#">
            Link
          </Button>
        </FlexBox>
      </>
    );
  },
};

export const Color: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Button variant="text">Default</Button>
          <Button variant="text" color="primary">
            Primary
          </Button>
          <Button variant="text" color="secondary">
            Secondary
          </Button>
          <Button variant="text" color="success">
            Success
          </Button>
          <Button variant="text" color="error">
            Error
          </Button>
          <Button variant="text" color="info">
            Info
          </Button>
          <Button variant="text" color="warning">
            Warning
          </Button>
          <Button variant="text" color="dark">
            Dark
          </Button>
        </FlexBox>
        <FlexBox>
          <Button>Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="error">Error</Button>
          <Button color="info">Info</Button>
          <Button color="warning">Warning</Button>
          <Button color="dark">Dark</Button>
        </FlexBox>
        <FlexBox>
          <Button variant="contained">Default</Button>
          <Button variant="contained" color="primary">
            Primary
          </Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="contained" color="success">
            Success
          </Button>
          <Button variant="contained" color="error">
            Error
          </Button>
          <Button variant="contained" color="info">
            Info
          </Button>
          <Button variant="contained" color="warning">
            Warning
          </Button>
          <Button variant="contained" color="dark">
            Dark
          </Button>
        </FlexBox>
      </>
    );
  },
};

export const Block: Story = {
  render: () => {
    return (
      <>
        <FlexBox className="flex-col">
          <Button variant="contained" color="primary" block>
            Primary
          </Button>
          <Button variant="contained" block>
            Default
          </Button>
          <Button variant="outlined" block>
            Outlined
          </Button>
          <Button variant="dashed" block>
            Dashed
          </Button>
          <Button variant="contained" block disabled>
            Disabled
          </Button>
          <Button variant="text" block>
            Text
          </Button>
        </FlexBox>
      </>
    );
  },
};

export const Size: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Button variant="text" size="xs">
            Tiny
          </Button>
          <Button variant="text" size="sm">
            Small
          </Button>
          <Button variant="text" size="md">
            Medium
          </Button>
          <Button variant="text" size="lg">
            Large
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="outlined" size="xs">
            Tiny
          </Button>
          <Button variant="outlined" size="sm">
            Small
          </Button>
          <Button variant="outlined" size="md">
            Medium
          </Button>
          <Button variant="outlined" size="lg">
            Large
          </Button>
        </FlexBox>
        <FlexBox>
          <Button variant="contained" size="xs">
            Tiny
          </Button>
          <Button variant="contained" size="sm">
            Small
          </Button>
          <Button variant="contained" size="md">
            Medium
          </Button>
          <Button variant="contained" size="lg">
            Large
          </Button>
        </FlexBox>
      </>
    );
  },
};

export const ButtonsWithIconsAndLabel: Story = {
  render: () => {
    const MapIcon = React.forwardRef(
      (props: React.SVGProps<SVGSVGElement>, ref: React.ForwardedRef<SVGSVGElement>) => {
        return (
          <svg viewBox="0 0 20 20" ref={ref} {...props}>
            <path
              d="M10.292,4.229c-1.487,0-2.691,1.205-2.691,2.691s1.205,2.691,2.691,2.691s2.69-1.205,2.69-2.691
								S11.779,4.229,10.292,4.229z M10.292,8.535c-0.892,0-1.615-0.723-1.615-1.615S9.4,5.306,10.292,5.306
								c0.891,0,1.614,0.722,1.614,1.614S11.184,8.535,10.292,8.535z M10.292,1C6.725,1,3.834,3.892,3.834,7.458
								c0,3.567,6.458,10.764,6.458,10.764s6.458-7.196,6.458-10.764C16.75,3.892,13.859,1,10.292,1z M4.91,7.525
								c0-3.009,2.41-5.449,5.382-5.449c2.971,0,5.381,2.44,5.381,5.449s-5.381,9.082-5.381,9.082S4.91,10.535,4.91,7.525z"
            ></path>
          </svg>
        );
      },
    );

    const SearchIcon = React.forwardRef(
      (props: React.SVGProps<SVGSVGElement>, ref: React.ForwardedRef<SVGSVGElement>) => {
        return (
          <svg viewBox="0 0 20 20" ref={ref} {...props}>
            <path
              d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
          c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
          c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
          s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"
            ></path>
          </svg>
        );
      },
    );

    return (
      <>
        <FlexBox>
          <Button variant="outlined" color="success" startIcon={<MapIcon />}>
            Map
          </Button>
          <Button variant="contained" color="dark" endIcon={<SearchIcon />}>
            Search
          </Button>
        </FlexBox>
      </>
    );
  },
};

export const IconButton: Story = {
  render: () => {
    const DeleteIcon = React.forwardRef(
      (props: React.SVGProps<SVGSVGElement>, ref: React.ForwardedRef<SVGSVGElement>) => {
        return (
          <svg viewBox="0 0 20 20" ref={ref} {...props}>
            <path
              d="M7.083,8.25H5.917v7h1.167V8.25z M18.75,3h-5.834V1.25c0-0.323-0.262-0.583-0.582-0.583H7.667
								c-0.322,0-0.583,0.261-0.583,0.583V3H1.25C0.928,3,0.667,3.261,0.667,3.583c0,0.323,0.261,0.583,0.583,0.583h1.167v14
								c0,0.644,0.522,1.166,1.167,1.166h12.833c0.645,0,1.168-0.522,1.168-1.166v-14h1.166c0.322,0,0.584-0.261,0.584-0.583
								C19.334,3.261,19.072,3,18.75,3z M8.25,1.833h3.5V3h-3.5V1.833z M16.416,17.584c0,0.322-0.262,0.583-0.582,0.583H4.167
								c-0.322,0-0.583-0.261-0.583-0.583V4.167h12.833V17.584z M14.084,8.25h-1.168v7h1.168V8.25z M10.583,7.083H9.417v8.167h1.167V7.083
								z"
            ></path>
          </svg>
        );
      },
    );

    const PrintIcon = React.forwardRef(
      (props: React.SVGProps<SVGSVGElement>, ref: React.ForwardedRef<SVGSVGElement>) => {
        return (
          <svg viewBox="0 0 20 20" ref={ref} {...props}>
            <path
              d="M6.506,6.98c-0.469,0-0.85,0.381-0.85,0.85s0.381,0.85,0.85,0.85s0.85-0.381,0.85-0.85S6.975,6.98,6.506,6.98z
                M18.684,4.148h-3.398V0.75H5.656v3.398H1.691c-0.313,0-0.566,0.253-0.566,0.566V14.91c0,0.312,0.253,0.566,0.566,0.566h3.965
								v3.398h9.629v-3.398h3.398c0.313,0,0.566-0.254,0.566-0.566V4.714C19.25,4.401,18.997,4.148,18.684,4.148z M6.789,1.882h7.363
								v2.266H6.789V1.882z M14.152,17.742H6.789v-5.664h7.363V17.742z M18.117,13.777c0,0.312-0.254,0.566-0.566,0.566h-2.266v-3.399
								H5.656v3.399H2.824c-0.313,0-0.566-0.254-0.566-0.566v-7.93c0-0.313,0.253-0.566,0.566-0.566h14.727
								c0.312,0,0.566,0.253,0.566,0.566V13.777z M3.674,6.98c-0.469,0-0.85,0.381-0.85,0.85s0.381,0.85,0.85,0.85s0.85-0.381,0.85-0.85
								S4.143,6.98,3.674,6.98z"
            ></path>
          </svg>
        );
      },
    );

    const DownloadIcon = React.forwardRef(
      (props: React.SVGProps<SVGSVGElement>, ref: React.ForwardedRef<SVGSVGElement>) => {
        return (
          <svg viewBox="0 0 20 20" ref={ref} {...props}>
            <path d="M15.608,6.262h-2.338v0.935h2.338c0.516,0,0.934,0.418,0.934,0.935v8.879c0,0.517-0.418,0.935-0.934,0.935H4.392c-0.516,0-0.935-0.418-0.935-0.935V8.131c0-0.516,0.419-0.935,0.935-0.935h2.336V6.262H4.392c-1.032,0-1.869,0.837-1.869,1.869v8.879c0,1.031,0.837,1.869,1.869,1.869h11.216c1.031,0,1.869-0.838,1.869-1.869V8.131C17.478,7.099,16.64,6.262,15.608,6.262z M9.513,11.973c0.017,0.082,0.047,0.162,0.109,0.226c0.104,0.106,0.243,0.143,0.378,0.126c0.135,0.017,0.274-0.02,0.377-0.126c0.064-0.065,0.097-0.147,0.115-0.231l1.708-1.751c0.178-0.183,0.178-0.479,0-0.662c-0.178-0.182-0.467-0.182-0.645,0l-1.101,1.129V1.588c0-0.258-0.204-0.467-0.456-0.467c-0.252,0-0.456,0.209-0.456,0.467v9.094L8.443,9.553c-0.178-0.182-0.467-0.182-0.645,0c-0.178,0.184-0.178,0.479,0,0.662L9.513,11.973z"></path>
          </svg>
        );
      },
    );

    const FacebookIcon = React.forwardRef(
      (props: React.SVGProps<SVGSVGElement>, ref: React.ForwardedRef<SVGSVGElement>) => {
        return (
          <svg viewBox="0 0 20 20" ref={ref} {...props} style={{ fontSize: '30px' }}>
            <path
              fill="#4691f6"
              d="M11.344,5.71c0-0.73,0.074-1.122,1.199-1.122h1.502V1.871h-2.404c-2.886,0-3.903,1.36-3.903,3.646v1.765h-1.8V10h1.8v8.128h3.601V10h2.403l0.32-2.718h-2.724L11.344,5.71z"
            ></path>
          </svg>
        );
      },
    );

    return (
      <>
        <FlexBox>
          <Button
            variant="contained"
            color="error"
            size="md"
            shape="circle"
            className="text-3xl"
            aria-label="delete"
          >
            <DeleteIcon />
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="md"
            shape="circle"
            className="text-3xl"
            aria-label="delete"
          >
            <DeleteIcon />
          </Button>
          <Button
            variant="dashed"
            color="error"
            size="md"
            shape="circle"
            className="text-3xl"
            aria-label="delete"
          >
            <DeleteIcon />
          </Button>
          <Button
            variant="text"
            color="error"
            size="md"
            shape="circle"
            className="text-3xl"
            aria-label="delete"
          >
            <DeleteIcon />
          </Button>
          <Button
            variant="text"
            color="error"
            size="md"
            shape="circle"
            className="text-3xl"
            aria-label="delete"
            disabled
          >
            <DeleteIcon />
          </Button>
        </FlexBox>
        <FlexBox>
          <Button
            variant="text"
            color="success"
            size="md"
            shape="circle"
            className="text-3xl"
            aria-label="print"
          >
            <PrintIcon />
          </Button>
          <Button
            variant="text"
            size="md"
            shape="circle"
            className="text-3xl"
            aria-label="download"
          >
            <DownloadIcon />
          </Button>
          <Button variant="text" size="md" shape="circle" aria-label="facebook">
            <FacebookIcon />
          </Button>
        </FlexBox>
      </>
    );
  },
};

export const PolymorphicComponent: Story = {
  render: () => {
    return (
      <>
        <FlexBox>
          <Button component="button">Button Component</Button>
        </FlexBox>
        <FlexBox>
          <Button component="span">Span Component</Button>
        </FlexBox>
        <FlexBox>
          <Button component="label">Label Component</Button>
        </FlexBox>
        <FlexBox>
          <Button component="a">Anchor Component</Button>
        </FlexBox>
      </>
    );
  },
};

export const Link: Story = {
  render: () => {
    const AnchorLink = React.forwardRef(
      (
        props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
        ref: React.ForwardedRef<HTMLAnchorElement>,
      ) => {
        return <a ref={ref} href={props.href} {...props} />;
      },
    );

    return (
      <>
        <FlexBox>
          <Button
            component={AnchorLink}
            href="https://google.com"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            Anchor Target Link
          </Button>
        </FlexBox>
      </>
    );
  },
};

export const Routing: Story = {
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
          <Button component={ReactRouterLink} to="/">
            🏠 인덱스 페이지 이동
          </Button>
          <Button component={ReactRouterLink} to="/setting">
            ⚙️ 세팅 페이지 이동
          </Button>
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
          path: 'setting',
          element: <p>setting</p>,
        },
      ]),
    }),
  },
};
