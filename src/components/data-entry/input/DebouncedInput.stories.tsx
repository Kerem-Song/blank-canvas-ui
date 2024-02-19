import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { DebouncedInput } from './DebouncedInput';
import { IDebounceProps } from './DebouncedInput.types';

const API_KEY = '74f10d5523eea415cf2a4eb63747800f';

const meta: Meta = {
  title: 'components/data-entry/Input/DebouncedInput',
  component: DebouncedInput,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '디바운스 기능이 있는 입력창',
    docs: {
      source: {
        type: 'code',
      },
    },
    mockData: [
      {
        url: `https://api.themoviedb.org/3/search/movie?query=happy&api_key=${API_KEY}`,
        method: 'GET',
        status: 200,
        response: {
          data: [
            {
              title: 'hello',
              popularity: '1/5',
            },
            {
              title: 'hi',
              popularity: '2/5',
            },
            {
              title: 'happy',
              popularity: '3/5',
            },
          ],
        },
      },
    ],
  },
};

export default meta;

type Story = StoryObj<IDebounceProps>;

interface IMovieRes {
  popularity: number;
  title: string;
}
interface IMockData {
  url: string;
  method: 'GET' | 'POST';
  status: number;
  response: {
    data: IMovieRes[];
  };
}

export const Default: Story = {
  render: function Render(args) {
    const [state, setState] = useState<IMovieRes[] | null>(null);
    const handleDebounce = () => {
      if (meta.parameters?.mockData) {
        const mockData = meta.parameters?.mockData as IMockData[];

        setState(mockData[0].response.data);
      }
    };

    return (
      <div>
        <DebouncedInput {...args} handleDebounce={handleDebounce} isClearable={true}>
          {state?.map((item, i) => (
            <div key={i}>
              <span>{item.title}</span>
              <span>{item.popularity}</span>
            </div>
          ))}
        </DebouncedInput>
      </div>
    );
  },
  args: {
    debounceTimeout: 1000,
    isClearable: true,
    maxLength: 1000,
    showCount: true,
    isSearch: true,
  },
};
