import './App.css';

import {
  Button,
  Carousel,
  Flex,
  FloatingActionButton,
  IFloatingActionMenuProps,
  Input,
  InputWithTitleCounter,
  Modal,
  Radio,
  RadioGroup,
  Switch,
  Textarea,
  TextAreaWithTitleCounter,
} from '@components';
import { Table, TableColumn, TableColumnGroup } from '@components/data-display/table';
import { IRadioOption } from '@components/data-entry/radio';
import icImgTest from '@icons/ic_img.svg';
import IcImg2 from '@icons/ic_search.svg?react';
import icImgTest2 from '@icons/ic_search_delete.svg';
import { useState } from 'react';
import { Autocomplete } from 'src';

interface IRow {
  a: string;
  b: string;
  c: string;
}

const tableSource: IRow[] = [
  { a: '111', b: '111', c: '111' },
  { a: '222', b: '222', c: '222' },
  { a: '333', b: '333', c: '333' },
  { a: '411', b: '111', c: '111' },
  { a: '511', b: '111', c: '111' },
  { a: '611', b: '111', c: '111' },
  { a: '711', b: '111', c: '111' },
  { a: '811', b: '111', c: '111' },
];

function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const option: IRadioOption[] = [
    { label: '1', value: '1' },
    { label: '2', value: 2 },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];
  const items = [
    { label: 'label1', value: 'value1' },
    { label: 'label2', value: 'value2' },
    { label: 'label3', value: 'value3' },
    { label: 'asdf', value: 'asdf' },
    { label: '123', value: '123' },
  ];

  const menu: IFloatingActionMenuProps[] = [
    {
      icon: icImgTest,
      callback: () => {
        console.log('@1');
      },
      tooltip: 'test1',
      badge: { count: 1 },
    },
    {
      icon: icImgTest,
      callback: () => {
        console.log('@2');
      },
      tooltip: 'test2',
      badge: { count: 10 },
    },
    {
      icon: icImgTest,
      callback: () => {
        console.log('@3');
      },
      tooltip: 'test3',
      badge: { count: 2 },
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

  const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const handleDeleteButton = (index: number) => {
    console.log('@handle delete btn');
  };

  const handleAddButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('@handle add btn');
  };
  const setCarouselIndex = ({ id, index }: { id: string; index: number }) => {};

  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<IRow>();
  return (
    <>
      <div className="p-5">
        <Table
          wrapClassName="max-h-[600px]"
          bordered
          rounded
          dataSource={tableSource}
          size="small"
          defaultSort={[{ path: 'a', direction: 'descending' }]}
          rowSelection={{
            selectedItem: selected,
            onChange: ({ selectedItem }) => {
              setSelected(selectedItem);
            },
          }}
          pagenation={{
            page,
            perPage: 5,
            total: tableSource.length,
            onChange: (e, page) => {
              setPage(page);
            },
          }}
        >
          <TableColumn title="AAA" path="a" sortable width={100} />
          <TableColumnGroup title="GROUP" titleAlign="left">
            <TableColumn title="AAA" path="a" />
            <TableColumnGroup title="GROUP" titleAlign="center">
              <TableColumn title="AAA" path="a" align="center" />
              <TableColumnGroup title="GROUP" titleAlign="right">
                <TableColumn title="BBB" path="b" render={(v) => `render-${v}`} />
                <TableColumn title="CCC" path="c" align="right" titleAlign="center" />
              </TableColumnGroup>
            </TableColumnGroup>
          </TableColumnGroup>
        </Table>
      </div>
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
      <Flex>
        <Input isSearch={true} disabled={true} />
        <Switch />
      </Flex>
      <FloatingActionButton
        callback={() => {}}
        shape="circle"
        icon={icImgTest}
        right={30}
        bottom={50}
        menu={menu}
        closeIcon={icImgTest2}
        useBadge={true}
        trigger="click"
        description={'한글적용가능한지여부테스트'}
      />
      <Autocomplete items={items} displayName={'label'} placeholder="write" />
      <button onClick={() => setModalOpen(!modalOpen)}>모달테스트</button>
      <Modal
        isOpen={modalOpen}
        message={'모달테스트'}
        description={'상세 설명입니다 진행하시겠습니까?'}
        overalyClassName="bc-modal-overlay"
        confirmButton="확인"
        confirmFunc={() => {
          console.log('@모달 확인');
          setModalOpen(false);
        }}
        cancelFunc={() => setModalOpen(false)}
        customFunc={() => setModalOpen(false)}
        cancelButton="취소"
        customButton="커스텀"
        size="lg"
        children={modalChild}
        shouldCloseOnEsc={true}
        useEscButton={true}
      />
      <div style={{ width: `200px` }}>
        <Carousel
          viewId="viewId"
          // width={1140}
          type="editable"
          index={0}
          limit={10}
          setCarouselIndex={setCarouselIndex}
          addCarousel={handleAddButton}
          deleteCarousel={handleDeleteButton}
          dotsBottom={20}
          arrowBtnMarginTop={100}
        >
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          {/* <div>
            <h3 style={contentStyle}>4</h3>
          </div>
          <div>
            <h3 style={contentStyle}>5</h3>
          </div>
          <div>
            <h3 style={contentStyle}>6</h3>
          </div>
          <div>
            <h3 style={contentStyle}>7</h3>
          </div>
          <div>
            <h3 style={contentStyle}>8</h3>
          </div>
          <div>
            <h3 style={contentStyle}>9</h3>
          </div> */}
        </Carousel>
        <InputWithTitleCounter
          label="titletest"
          direction="top"
          showCount
          maxLength={10}
          // customPrefix={'{{'}
        />
        <Input showCount maxLength={10} />
        <Textarea />
      </div>
    </>
  );
}

export default App;
