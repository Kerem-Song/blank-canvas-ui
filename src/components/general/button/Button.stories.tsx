import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps } from '@components/general/button';

// TODO: storybook-addon-react-router-v6 설치하기

const meta: Meta<ButtonProps> = {
  title: 'components/general/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <Button {...args}>{args.children}</Button>
      </div>
    );
  },
  args: {
    children: 'Button',
  },
};

export const PolymorphicComponent: Story = {
  render: (args) => {
    return (
      <div>
        <Button {...args}>{args.children}</Button>
      </div>
    );
  },
  args: {
    component: 'div',
    children: 'Polymorphic Component',
  },
};

export const WrapperComponent: Story = {
  render: (args) => {
    return (
      <>
        <div>
          1.:&nbsp;
          <Button {...args} component="span" tabIndex={-1} role={undefined}>
            <input autoFocus disabled={args.disabled} defaultValue="" />
          </Button>
        </div>
        <div>
          2.:&nbsp;
          <label>
            <Button {...args} component="span" tabIndex={-1} role={undefined}>
              <input type="checkbox" disabled={args.disabled} defaultValue="" />
            </Button>
            A
          </label>
          <label>
            <Button {...args} component="span" tabIndex={-1} role={undefined}>
              <input type="checkbox" disabled={args.disabled} defaultValue="" />
            </Button>
            B
          </label>
        </div>
        <div>
          3.:&nbsp;
          <label>
            <Button {...args} component="span" tabIndex={-1} role={undefined}>
              <input
                type="radio"
                name="radio-value"
                disabled={args.disabled}
                defaultValue=""
                checked
              />
            </Button>
            A
          </label>
          <label>
            <Button {...args} component="span" tabIndex={-1} role={undefined}>
              <input
                type="radio"
                name="radio-value"
                disabled={args.disabled}
                defaultValue=""
              />
            </Button>
            B
          </label>
        </div>
      </>
    );
  },
  argTypes: {
    component: { control: { type: null } },
    children: { control: { type: null } },
  },
  args: {
    component: 'span',
    children: 'Polymorphic Component',
  },
};

export const LinkWithHrefProp: Story = {
  render: (args) => {
    const CustomLink = React.forwardRef(
      (
        props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
        ref: React.ForwardedRef<HTMLAnchorElement>,
      ) => {
        return <a ref={ref} href={props.href} {...props} />;
      },
    );

    return (
      <div>
        <Button
          {...args}
          component={CustomLink}
          href={args.href}
          target="_blank"
          referrerPolicy="no-referrer"
        >
          [href] Prop Link
        </Button>
      </div>
    );
  },
  args: {
    href: 'https://lunasoft.co.kr',
  },
};

export const LinkWithToProp: Story = {
  render: (args) => {
    const CustomLink = React.forwardRef(
      (props: any, ref: React.ForwardedRef<HTMLAnchorElement>) => {
        const { to, ...other } = props;
        return <a ref={ref} href={to} {...other} />;
      },
    );

    return (
      <div>
        <Button {...args} component={CustomLink} to={args.to}>
          [to] Prop Link
        </Button>
      </div>
    );
  },
  args: {
    to: '/dashboard',
  },
};
