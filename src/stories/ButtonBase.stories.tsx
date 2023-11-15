import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ButtonBase, { ButtonBaseProps } from '@components/general/button-base';

const meta: Meta = {
  title: 'components/general/ButtonBase',
  component: ButtonBase,
  tags: ['autodocs'],
  // argTypes: {
  //   disabled: { control: { type: 'boolean' } },
  //   prefixClasses: { control: { type: 'string' } },
  //   onClick: { action: 'onClick' },
  //   onFocus: { action: 'onFocus' },
  //   onBlur: { action: 'onBlur' },
  //   onKeyDown: { action: 'onKeyDown' },
  //   onKeyUp: { action: 'onKeyUp' },
  //   onMouseLeave: { action: 'onMouseLeave' },
  //   onMouseDown: { action: 'onMouseDown' },
  //   onTouchStart: { action: 'onTouchStart' },
  //   onDragEnd: { action: 'onDragEnd' },
  // },
};

export default meta;
type Story = StoryObj<ButtonBaseProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <ButtonBase {...args}>{args.children}</ButtonBase>
      </div>
    );
  },
  args: {
    className: '',
    disabled: false,
    children: 'Button',
  },
};

export const PolymorphicComponent: Story = {
  render: (args) => {
    return (
      <div>
        <ButtonBase {...args}>{args.children}</ButtonBase>
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
          <ButtonBase {...args} component="span" tabIndex={-1} role={undefined}>
            <input autoFocus disabled={args.disabled} defaultValue="" />
          </ButtonBase>
        </div>
        <div>
          2.:&nbsp;
          <label>
            <ButtonBase {...args} component="span" tabIndex={-1} role={undefined}>
              <input type="checkbox" disabled={args.disabled} defaultValue="" />
            </ButtonBase>
            A
          </label>
          <label>
            <ButtonBase {...args} component="span" tabIndex={-1} role={undefined}>
              <input type="checkbox" disabled={args.disabled} defaultValue="" />
            </ButtonBase>
            B
          </label>
        </div>
        <div>
          3.:&nbsp;
          <label>
            <ButtonBase {...args} component="span" tabIndex={-1} role={undefined}>
              <input
                type="radio"
                name="radio-value"
                disabled={args.disabled}
                defaultValue=""
                checked
              />
            </ButtonBase>
            A
          </label>
          <label>
            <ButtonBase {...args} component="span" tabIndex={-1} role={undefined}>
              <input
                type="radio"
                name="radio-value"
                disabled={args.disabled}
                defaultValue=""
              />
            </ButtonBase>
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
        <ButtonBase
          {...args}
          component={CustomLink}
          href={args.href}
          target="_blank"
          referrerPolicy="no-referrer"
        >
          [href] Prop Link
        </ButtonBase>
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
        <ButtonBase {...args} component={CustomLink} to={args.to}>
          [to] Prop Link
        </ButtonBase>
      </div>
    );
  },
  args: {
    to: '/dashboard',
  },
};
