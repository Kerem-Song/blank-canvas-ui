import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Autocomplete } from './Autocomplete';
import { AutocompleteProps } from './Autocomplete.types';

const meta: Meta = {
  title: 'components/data-entry/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '자동 완성 input',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export default meta;

interface ITest {
  label: string;
  value: string;
}

type Story = StoryObj<AutocompleteProps<ITest>>;

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<ITest>();
    return <Autocomplete {...args} />;
  },
  args: {
    isError: false,
    items: [
      { label: 'label1', value: 'value1' },
      { label: 'label2', value: 'value2' },
      { label: 'label3', value: 'value3' },
      { label: 'asdf', value: 'asdf' },
      { label: '123', value: '123' },
    ],
    displayName: 'label',
    placeholder: 'auto complete',
    prefix: (
      <span style={{ color: '#4478FF' }} className="m-r-5">
        {'{{'}
      </span>
    ),
    suffix: (
      <span style={{ color: '#4478FF' }} className="m-l-5">
        {'}}'}
      </span>
    ),

    onChangeValue: () => {},
    onChange: () => {},
    // create: () => {},
    error: () => {},
    maxLength: 20,
  },
};
