import { Button, Radio, TextAreaWithTitleCounter, Textarea } from '@components';
import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

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
    </>
  );
}

export default App;
