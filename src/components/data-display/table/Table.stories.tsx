import { useState } from 'react';
import { AnyObject } from '@models';
import { Meta, StoryObj } from '@storybook/react';

import { Tag } from '..';

import { ITableProps } from './Table.types';
import { Table } from '.';

const meta: Meta<ITableProps<AnyObject>> = {
  title: 'components/data-display/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ITableProps<AnyObject>>;

const tableSource = [
  {
    gender: 'male',
    name: 'Iván Blanco',
    email: 'ivan.blanco@example.com',
    phone: '921-123-877',
  },
  {
    gender: 'female',
    name: 'Ava Green',
    email: 'ava.green@example.com',
    phone: '(468)-269-6992',
  },
  {
    gender: 'female',
    name: 'Juliete Sales',
    email: 'juliete.sales@example.com',
    phone: '(39) 6303-8956',
  },
  {
    gender: 'male',
    name: 'Elliot French',
    email: 'elliot.french@example.com',
    phone: 'R88 O03-3059',
  },
  {
    gender: 'female',
    name: 'Neeti Dsouza',
    email: 'neeti.dsouza@example.com',
    phone: '7964341468',
  },
  {
    gender: 'male',
    name: 'Heldemaro Rodrigues',
    email: 'heldemaro.rodrigues@example.com',
    phone: '(82) 8167-1474',
  },
  {
    gender: 'male',
    name: 'Anthony Singh',
    email: 'anthony.singh@example.com',
    phone: 'M50 T48-0771',
  },
  {
    gender: 'male',
    name: 'Bryan Scott',
    email: 'bryan.scott@example.com',
    phone: '04-0610-1382',
  },
  {
    gender: 'male',
    name: 'Davor Ivanić',
    email: 'davor.ivanic@example.com',
    phone: '013-4189-328',
  },
  {
    gender: 'male',
    name: 'Valentin Jaimes',
    email: 'valentin.jaimes@example.com',
    phone: '(690) 802 9806',
  },
  {
    gender: 'male',
    name: 'Guillermo Portillo',
    email: 'guillermo.portillo@example.com',
    phone: '(635) 904 3984',
  },
  {
    gender: 'female',
    name: 'Finette Goedegebuur',
    email: 'finette.goedegebuur@example.com',
    phone: '(0460) 145634',
  },
  {
    gender: 'female',
    name: 'Bruni Kindermann',
    email: 'bruni.kindermann@example.com',
    phone: '0095-0299246',
  },
  {
    gender: 'male',
    name: 'Phil Ross',
    email: 'phil.ross@example.com',
    phone: '0191 540 1498',
  },
  {
    gender: 'male',
    name: 'Callum Wagner',
    email: 'callum.wagner@example.com',
    phone: '017683 27459',
  },
];

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <Table {...args}></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      { title: '성별', path: 'gender' },
      {
        title: '이름',
        path: 'name',
      },
      {
        title: '전화번호',
        path: 'phone',
      },
      {
        title: '이메일',
        path: 'email',
      },
    ],
    dataSource: tableSource,
    rounded: false,
    bordered: false,
    size: 'normal',
  },
};

export const SmallSize: Story = {
  render: (args) => {
    return (
      <>
        <Table {...args}></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      { title: '성별', path: 'gender' },
      {
        title: '이름',
        path: 'name',
      },
      {
        title: '전화번호',
        path: 'phone',
      },
      {
        title: '이메일',
        path: 'email',
      },
    ],
    dataSource: tableSource,
    rounded: false,
    bordered: false,
    size: 'small',
  },
};

export const Bordered: Story = {
  render: (args) => {
    return (
      <>
        <Table {...args}></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      { title: '성별', path: 'gender' },
      {
        title: '이름',
        path: 'name',
      },
      {
        title: '전화번호',
        path: 'phone',
      },
      {
        title: '이메일',
        path: 'email',
      },
    ],
    dataSource: tableSource,
    rounded: false,
    bordered: true,
    size: 'small',
  },
};

export const Rounded: Story = {
  render: (args) => {
    return (
      <>
        <Table {...args}></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      { title: '성별', path: 'gender' },
      {
        title: '이름',
        path: 'name',
      },
      {
        title: '전화번호',
        path: 'phone',
      },
      {
        title: '이메일',
        path: 'email',
      },
    ],
    dataSource: tableSource,
    rounded: true,
    bordered: true,
    size: 'small',
  },
};

export const Height: Story = {
  render: (args) => {
    return (
      <>
        <Table wrapClassName="max-h-[200px]" {...args}></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      { title: '성별', path: 'gender' },
      {
        title: '이름',
        path: 'name',
      },
      {
        title: '전화번호',
        path: 'phone',
      },
      {
        title: '이메일',
        path: 'email',
      },
    ],
    dataSource: tableSource,
    rounded: true,
    bordered: false,
    size: 'small',
  },
};

export const Render: Story = {
  render: (args) => {
    return (
      <>
        <Table wrapClassName="max-h-[200px]" {...args}></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      {
        title: '성별',
        path: 'gender',
        render: (v) => <Tag className="uppercase">{v}</Tag>,
      },
      {
        title: '이름',
        path: 'name',
      },
      {
        title: '전화번호',
        path: 'phone',
      },
      {
        title: '이메일',
        path: 'email',
      },
    ],
    dataSource: tableSource,
    rounded: true,
    bordered: false,
    size: 'small',
  },
};

export const Align: Story = {
  render: (args) => {
    return (
      <>
        <Table wrapClassName="max-h-[200px]" {...args}></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      {
        title: '성별',
        path: 'gender',
        align: 'center',
        render: (v) => <Tag className="uppercase">{v}</Tag>,
      },
      {
        title: '이름',
        path: 'name',
      },
      {
        title: '전화번호',
        path: 'phone',
      },
      {
        title: '이메일',
        path: 'email',
        align: 'right',
        titleAlign: 'center',
      },
    ],
    dataSource: tableSource,
    rounded: true,
    bordered: false,
    size: 'small',
  },
};

export const Sortable: Story = {
  render: (args) => {
    return (
      <>
        <Table wrapClassName="max-h-[200px]" {...args}></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      {
        title: '성별',
        path: 'gender',
        render: (v) => <Tag className="uppercase">{v}</Tag>,
        sortable: true,
      },
      {
        title: '이름',
        path: 'name',
        sortable: true,
      },
      {
        title: '전화번호',
        path: 'phone',
        sortable: true,
      },
      {
        title: '이메일',
        path: 'email',
        sortable: true,
      },
    ],
    dataSource: tableSource,
    rounded: true,
    bordered: false,
    size: 'small',
  },
};

export const Paging: Story = {
  render: function Render(args) {
    const [page, setPage] = useState(1);
    return (
      <>
        <Table
          {...args}
          pagenation={{
            page: page,
            perPage: 10,
            total: tableSource.length,
            onChange: (e, page) => setPage(page),
          }}
        ></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      {
        title: '성별',
        path: 'gender',
        render: (v) => <Tag className="uppercase">{v}</Tag>,
        sortable: true,
      },
      {
        title: '이름',
        path: 'name',
        sortable: true,
      },
      {
        title: '전화번호',
        path: 'phone',
        sortable: true,
      },
      {
        title: '이메일',
        path: 'email',
        sortable: true,
      },
    ],
    dataSource: tableSource,
    rounded: true,
    bordered: false,
    size: 'small',
  },
};

export const RowSelection: Story = {
  render: function Render(args) {
    const [selectedItem, setSelectedItem] = useState<AnyObject>();
    return (
      <>
        <Table
          {...args}
          rowSelection={{
            selectedClass: 'font-bold',
            selectedCell: ({ selected }) => {
              return <span>{selected && '√'}</span>;
            },
            selectedItem,
            onChange: ({ selectedItem }) => setSelectedItem(selectedItem),
          }}
        ></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      { title: '성별', path: 'gender' },
      {
        title: '이름',
        path: 'name',
      },
      {
        title: '전화번호',
        path: 'phone',
      },
      {
        title: '이메일',
        path: 'email',
      },
    ],
    dataSource: tableSource,
    rounded: true,
    bordered: true,
    size: 'small',
  },
};

export const Empty: Story = {
  render: (args) => {
    return (
      <>
        <Table {...args}></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      { title: '성별', path: 'gender' },
      {
        title: '이름',
        path: 'name',
      },
      {
        title: '전화번호',
        path: 'phone',
      },
      {
        title: '이메일',
        path: 'email',
      },
    ],
    rounded: false,
    bordered: false,
    size: 'normal',
  },
};

export const Loading: Story = {
  render: (args) => {
    return (
      <>
        <Table {...args}></Table>
      </>
    );
  },
  argTypes: {},
  args: {
    columns: [
      { title: '성별', path: 'gender' },
      {
        title: '이름',
        path: 'name',
      },
      {
        title: '전화번호',
        path: 'phone',
      },
      {
        title: '이메일',
        path: 'email',
      },
    ],
    dataSource: tableSource,
    rounded: false,
    bordered: false,
    size: 'normal',
    loading: true,
  },
};
