import './App.css';

import {
  Button,
  Input,
  Radio,
  Switch,
  Textarea,
  TextAreaWithTitleCounter,
  Tooltip,
} from '@components';
import { IRadioOption, RadioGroup } from '@components/data-entry/Radio/RadioGroup';
import { useState } from 'react';

import viteLogo from '/vite.svg';

import reactLogo from './assets/react.svg';

function App() {
  const [count, setCount] = useState(0);
  const option: IRadioOption[] = [
    { label: '1', value: '1' },
    { label: '2', value: 2 },
    { label: '3', value: '3', disabled: true },
  ];
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <Textarea className="" maxLength={12} autoComplete={'true'} />
      <TextAreaWithTitleCounter
        label="label"
        direction={'inside'}
        showCount={true}
        maxLength={20}
      />
      <Button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
        button..
      </Button>
      <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
        ..
      </button>
      <TextAreaWithTitleCounter
        label="top"
        direction="top"
        showCount={true}
        maxLength={20}
      />
      <TextAreaWithTitleCounter
        label="bottom"
        direction="bottom"
        showCount={true}
        maxLength={20}
      />
      <Radio>asdf</Radio>
      <RadioGroup options={option} name="haha" vertical={false} gap={20} />
      <Input isSearch={true} disabled={true} />
      <Switch />
      <Tooltip text="sdklfjldaskf">test</Tooltip>
    </>
  );
}

export default App;
