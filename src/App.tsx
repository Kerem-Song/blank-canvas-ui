import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { TextAreaWithTitleCounter, Textarea } from "@components";

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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="h-96 text-100pxr bg-blue-500">test</p>
      <Textarea
        className="border border-spacing-3 border-r-8 bg-red-400"
        maxLength={12}
        autoComplete={true}
      />
      <TextAreaWithTitleCounter
        label="label"
        direction={"bottom"}
        show={true}
        showCount={true}
        maxLength={20}
      />
    </>
  );
}

export default App;
