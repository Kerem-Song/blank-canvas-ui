import './App.css';

import { Tooltip } from '@components';
import { IRadioOption } from '@components/data-entry/Radio/RadioGroup';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const option: IRadioOption[] = [
    { label: '1', value: '1' },
    { label: '2', value: 2 },
    { label: '3', value: '3', disabled: true },
  ];
  return (
    <div style={{ height: '10000000000px' }}>
      <div style={{ background: 'green' }}>
        <Tooltip
          text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus sapiente
          ipsam omnis harum dignissimos eos, unde atque enim necessitatibus aliquid
          perspiciatis nemo natus consequatur incidunt tempore, qui, sint ut nisi!"
          color="pink"
          offset={[0, 0]}
          arrow={true}
          open
          placement="left"
          // color
          // defaultOpen
          // open={false}
          // mouseLeaveDelay={4}
        >
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus sapiente
            ipsam omnis harum dignissimos eos, unde atque enim necessitatibus aliquid
            perspiciatis nemo natus consequatur incidunt tempore, qui, sint ut nisi!
          </div>
          <div>asdlfkjl</div>
          <div>asdlfkjl</div>
          <div>asdlfkjl</div>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
