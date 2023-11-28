import './App.css';

import {
  Button,
  Checkbox,
  Flex,
  Input,
  Radio,
  Switch,
  Textarea,
  TextAreaWithTitleCounter,
} from '@components';
import { IRadioOption, RadioGroup } from '@components/data-entry/Radio/RadioGroup';
import { useEffect, useState } from 'react';

import viteLogo from '/vite.svg';

import reactLogo from './assets/react.svg';

function App() {
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [checkedIndeterminate, setCheckedIndeterminate] = useState([true, false]);

  const option: IRadioOption[] = [
    { label: '1', value: '1' },
    { label: '2', value: 2 },
    { label: '3', value: '3', disabled: true },
  ];

  useEffect(() => {
    console.log('change value: ', checked);
  }, [checked]);

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
      <Flex className="gap-4 border border-solid border-gray-500 p-2 text-left" vertical>
        <strong>
          <h1>Checkbox</h1>
        </strong>
        <div>
          <h3>Uncontrolled</h3>&nbsp;
          <Checkbox color="default" label="checkbox" defaultChecked={true} />
        </div>
        <div>
          <h3>Controlled</h3>&nbsp;
          <Checkbox
            readOnly
            label="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.currentTarget.checked)}
          />
        </div>
        <div>
          <h3>Disabled</h3>&nbsp;
          <Checkbox
            label="checkbox"
            disabled
            checked={false}
            onChange={() => console.log('동작하면 안되겠죠? - false')}
          />
          <Checkbox
            label="checkbox"
            disabled
            checked={true}
            onChange={() => console.log('동작하면 안되겠죠? - true')}
          />
        </div>
        <div>
          <h3>Indeterminate Checkbox</h3>&nbsp;
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
      </Flex>
    </>
  );
}

export default App;
