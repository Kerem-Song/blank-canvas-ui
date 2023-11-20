import * as React from 'react';
import {
  withRouter,
  reactRouterParameters,
  reactRouterOutlets,
} from 'storybook-addon-react-router-v6';
import { Meta, StoryObj } from '@storybook/react';
import { useLocation, Link as ReactRouterLink, Outlet } from 'react-router-dom';

import Button, { ButtonProps } from '@components/general/button';

const meta: Meta<ButtonProps> = {
  title: 'components/general/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [withRouter],
};

export default meta;
type Story = StoryObj<ButtonProps>;

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
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </>
    );
  },
};

export const TextButton: Story = {
  render: () => {
    return (
      <div>
        <Button>Primary</Button>
        <Button disabled>Disabled</Button>
        <Button href="#text-buttons">Link</Button>
      </div>
    );
  },
};

export const ContainedButton: Story = {
  render: () => {
    return (
      <>
        <Button variant="contained">Contained</Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="contained" href="#contained-buttons">
          Link
        </Button>
      </>
    );
  },
};

export const OutlinedButton: Story = {
  render: () => {
    return (
      <>
        <Button variant="outlined">Primary</Button>
        <Button variant="outlined" disabled>
          Disabled
        </Button>
        <Button variant="outlined" href="#outlined-buttons">
          Link
        </Button>
      </>
    );
  },
};

export const Color: Story = {
  render: () => {
    return (
      <>
        <Button color="primary">Primary</Button>
        <Button variant="text" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" color="success">
          Success
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
      </>
    );
  },
};

export const Size: Story = {
  render: () => {
    return (
      <>
        <div>
          <Button variant="text" size="small">
            Small
          </Button>
          <Button variant="text" size="medium">
            Medium
          </Button>
          <Button variant="text" size="large">
            Large
          </Button>
        </div>
        <div>
          <Button variant="outlined" size="small">
            Small
          </Button>
          <Button variant="outlined" size="medium">
            Medium
          </Button>
          <Button variant="outlined" size="large">
            Large
          </Button>
        </div>
        <div>
          <Button variant="contained" size="small">
            Small
          </Button>
          <Button variant="contained" size="medium">
            Medium
          </Button>
          <Button variant="contained" size="large">
            Large
          </Button>
        </div>
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
        <Button variant="outlined" startIcon={<MapIcon />}>
          Map
        </Button>
        <Button variant="contained" endIcon={<SearchIcon />}>
          Search
        </Button>
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

    return (
      <>
        <Button size="small" aria-label="delete">
          <DeleteIcon />
        </Button>
        <Button size="medium" aria-label="delete">
          <DeleteIcon />
        </Button>
        <Button size="large" aria-label="delete">
          <DeleteIcon />
        </Button>
        <Button color="error" aria-label="error print page">
          <PrintIcon />
        </Button>
        <Button color="success" aria-label="success print page">
          <PrintIcon />
        </Button>
      </>
    );
  },
};

export const PolymorphicComponent: Story = {
  render: () => {
    return (
      <>
        <div>
          <Button component="button">Button Component</Button>
        </div>
        <div>
          <Button component="span">Span Component</Button>
        </div>
        <div>
          <Button component="label">Label Component</Button>
        </div>
        <div>
          <Button component="a">Anchor Component</Button>
        </div>
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
        <Button
          component={AnchorLink}
          href="https://google.com"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          Anchor Target Link
        </Button>
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
          <Button component={ReactRouterLink} to="/">
            /index
          </Button>
          <Button component={ReactRouterLink} to="/dashboard">
            /dashboard
          </Button>
        </div>
        <div>
          <p>React-Router: {location.pathname}</p>
        </div>
        <div>
          <Outlet />
        </div>
      </>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlets([
        {
          path: '',
          element: <p>Index Page</p>,
        },
        {
          path: 'dashboard',
          element: <p>Dashboard Page</p>,
        },
      ]),
    }),
  },
};
