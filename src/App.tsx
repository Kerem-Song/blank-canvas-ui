import './App.css';

import {
  Button,
  FloatingActionButton,
  IFloatingActionMenuProps,
  Input,
  Modal,
  Radio,
  Switch,
  Textarea,
  TextAreaWithTitleCounter,
  Tooltip,
} from '@components';
import { IRadioOption, RadioGroup } from '@components/data-entry/Radio/RadioGroup';
import IcImg3 from '@icons/ic_collapse_arrow_up.svg?react';
import icImgTest from '@icons/ic_img.svg';
import IcImg from '@icons/ic_img.svg?react';
import IcImg2 from '@icons/ic_search.svg?react';
import { offset } from '@popperjs/core';
import { useState } from 'react';
function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const option: IRadioOption[] = [
    { label: '1', value: '1' },
    { label: '2', value: 2 },
    { label: '3', value: '3', disabled: true },
  ];

  const menu: IFloatingActionMenuProps[] = [
    {
      icon: <IcImg2 />,
      callback: () => {
        console.log('@1');
      },
      tooltip: 'test1',
    },
    {
      icon: <IcImg2 />,
      callback: () => {
        console.log('@2');
      },
      tooltip: 'test2',
    },
    {
      icon: <IcImg2 />,
      callback: () => {
        console.log('@3');
      },
    },
  ];

  const modalChild = (
    <div className="contents">
      {/* <ReactLoading type="spin" color="#4478FF" height={50} width={50} /> */}
      <div className="title">
        <span>title</span>
      </div>
      <div className="text">
        <p>desc</p>
      </div>
      <input type="password" />
      <IcImg2 />
      <img src={icImgTest} alt="" />
    </div>
  );

  return (
    <>
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
      <FloatingActionButton
        callback={() => {}}
        shape="circle"
        icon={<IcImg />}
        right={30}
        bottom={50}
        menu={menu}
        closeIcon={<IcImg3 />}
        useBadge={true}
        trigger="click"
      />
      <button onClick={() => setModalOpen(!modalOpen)}>모달테스트</button>
      <Modal
        isOpen={modalOpen}
        message={'모달테스트'}
        description={'상세 설명입니다 진행하시겠습니까?'}
        overalyClassName="modalOverlay"
        confirmButton="확인"
        callbackFunc={() => {
          console.log('@모달 확인');
        }}
        cancelButton="취소"
        customButton="커스텀"
        size="lg"
        children={modalChild}
      />
    </>
  );
}

export default App;
