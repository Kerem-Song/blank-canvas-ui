import '../../../index.css';

import { Flex } from '@components/Layout/Flex';
import { Meta, StoryObj } from '@storybook/react';
import classNames from 'classnames';
import React, { useState } from 'react';

import { Checkbox, CheckboxProps } from './';

const meta: Meta<CheckboxProps> = {
  title: 'components/data-entry/Checkbox',
  component: Checkbox,
  decorators: [
    (Story) => (
      <Flex align="center" className={classNames('gap-4 p-2')}>
        <Story />
      </Flex>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
    slotProps: { control: { type: null } },
  },
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <Checkbox {...args} />
      </>
    );
  },
  argTypes: {
    checked: { control: { type: null } },
    checkedIcon: { control: { type: null } },
    uncheckedIcon: { control: { type: null } },
    indeterminateIcon: { control: { type: null } },
    color: {
      control: 'select',
    },
  },
  args: {
    indeterminate: false,
    label: 'checkbox',
    readOnly: false,
    required: false,
    size: 'sm',
    prefix: '',
  },
};

export const BasicCheckboxes: Story = {
  render: () => {
    return (
      <>
        <Checkbox defaultChecked />
        <Checkbox />
        <Checkbox disabled />
        <Checkbox disabled checked />
      </>
    );
  },
};

export const Label: Story = {
  render: () => {
    return (
      <>
        <Checkbox label="Label" />
        <Checkbox label="Disabled" disabled />
      </>
    );
  },
};

export const Size: Story = {
  render: () => {
    return (
      <>
        <Checkbox defaultChecked size="sm" />
        <Checkbox defaultChecked size="md" />
        <Checkbox defaultChecked size="lg" />
      </>
    );
  },
};

export const Color: Story = {
  render: () => {
    return (
      <>
        <Checkbox defaultChecked color="default" />
        <Checkbox defaultChecked color="primary" />
        <Checkbox defaultChecked color="secondary" />
        <Checkbox defaultChecked color="success" />
        <Checkbox defaultChecked color="error" />
        <Checkbox defaultChecked color="info" />
        <Checkbox defaultChecked color="warning" />
        <Checkbox defaultChecked color="dark" />
      </>
    );
  },
};

export const Icon: Story = {
  render: () => {
    const HeartBorderIcon = React.forwardRef(
      (props: React.SVGProps<SVGSVGElement>, ref: React.ForwardedRef<SVGSVGElement>) => {
        return (
          <svg viewBox="0 0 48 48" ref={ref} {...props}>
            <path d="M0 0h48v48H0z" fill="none" />
            <path d="M33 6c-3.48 0-6.82 1.62-9 4.17C21.82 7.62 18.48 6 15 6 8.83 6 4 10.83 4 17c0 7.55 6.8 13.72 17.1 23.07L24 42.7l2.9-2.63C37.2 30.72 44 24.55 44 17c0-6.17-4.83-11-11-11zm-8.79 31.11l-.21.19-.21-.19C14.28 28.48 8 22.78 8 17c0-3.99 3.01-7 7-7 3.08 0 6.08 1.99 7.13 4.72h3.73C26.92 11.99 29.92 10 33 10c3.99 0 7 3.01 7 7 0 5.78-6.28 11.48-15.79 20.11z" />
          </svg>
        );
      },
    );

    const HeartIcon = React.forwardRef(
      (props: React.SVGProps<SVGSVGElement>, ref: React.ForwardedRef<SVGSVGElement>) => {
        return (
          <svg viewBox="0 0 48 48" ref={ref} {...props}>
            <path d="M0 0h48v48H0z" fill="none" />
            <path d="M24 42.7l-2.9-2.63C10.8 30.72 4 24.55 4 17 4 10.83 8.83 6 15 6c3.48 0 6.82 1.62 9 4.17C26.18 7.62 29.52 6 33 6c6.17 0 11 4.83 11 11 0 7.55-6.8 13.72-17.1 23.07L24 42.7z" />
          </svg>
        );
      },
    );

    const BookmarkBorderIcon = React.forwardRef(
      (props: React.SVGProps<SVGSVGElement>, ref: React.ForwardedRef<SVGSVGElement>) => {
        return (
          <svg viewBox="0 0 48 48" ref={ref} {...props}>
            <path d="M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4zm0 30l-10-4.35L14 36V10h20v26z" />
            <path d="M0 0h48v48H0z" fill="none" />
          </svg>
        );
      },
    );

    const BookmarkIcon = React.forwardRef(
      (props: React.SVGProps<SVGSVGElement>, ref: React.ForwardedRef<SVGSVGElement>) => {
        return (
          <svg viewBox="0 0 48 48" ref={ref} {...props}>
            <path d="M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4z" />
            <path d="M0 0h48v48H0z" fill="none" />
          </svg>
        );
      },
    );

    return (
      <>
        <Checkbox
          size="lg"
          uncheckedIcon={<HeartBorderIcon />}
          checkedIcon={<HeartIcon />}
        />
        <Checkbox
          size="lg"
          uncheckedIcon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
        />
      </>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<boolean>(false);

    const onChange: CheckboxProps['onChange'] = (event) => {
      console.log('parent - onChange: ', event);
      setValue(event.currentTarget.checked);
    };

    return (
      <>
        <Checkbox name="controlled-value" checked={value} onChange={onChange} />
      </>
    );
  },
};

export const Indeterminate: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checkedIndeterminate, setCheckedIndeterminate] = useState([true, false]);

    return (
      <>
        <div>
          <Checkbox
            label="Parent"
            checked={checkedIndeterminate[0] && checkedIndeterminate[1]}
            indeterminate={checkedIndeterminate[0] !== checkedIndeterminate[1]}
            onChange={(e) =>
              setCheckedIndeterminate([e.currentTarget.checked, e.currentTarget.checked])
            }
          />
          <Flex className="ml-4" vertical>
            <Checkbox
              label="Child 1"
              checked={checkedIndeterminate[0]}
              onChange={(e) =>
                setCheckedIndeterminate([
                  e.currentTarget.checked,
                  checkedIndeterminate[1],
                ])
              }
            />
            <Checkbox
              label="Child 2"
              checked={checkedIndeterminate[1]}
              onChange={(e) =>
                setCheckedIndeterminate([
                  checkedIndeterminate[0],
                  e.currentTarget.checked,
                ])
              }
            />
          </Flex>
        </div>
      </>
    );
  },
};
